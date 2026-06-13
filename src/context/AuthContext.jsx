import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

const BACKEND_URL = "https://lu-pulse-backend.onrender.com";

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // jwtReady: true only after the JWT cookie is confirmed set on the backend.
  // This prevents useUserData from firing before the cookie exists.
  const [jwtReady, setJwtReady] = useState(false);
  // Tracks whether we are mid-login so onAuthStateChanged knows NOT to set
  // jwtReady = true (cookie doesn't exist yet on a fresh login).
  const isLoggingIn = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        // Logged out
        setJwtReady(false);
      } else if (!isLoggingIn.current) {
        // Page reload / session restore — cookie is already in the browser
        setJwtReady(true);
      }
      // If isLoggingIn.current === true we are mid-login; jwtReady will be
      // set to true only after POST /auth/login succeeds inside login().
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup with email and password
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendEmailVerification(userCredential.user);
    return userCredential;
  };

  // Login: calls Firebase, then immediately calls POST /auth/login to set the
  // JWT cookie, and only THEN sets jwtReady=true so useUserData fires correctly.
  const login = async (email, password) => {
    isLoggingIn.current = true;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        try {
          await axios.post(
            `${BACKEND_URL}/auth/login`,
            {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
            },
            { withCredentials: true },
          );
          setJwtReady(true);
        } catch (backendError) {
          // Backend login failed — roll back Firebase sign-in so the UI stays
          // in a clean logged-out state.
          await signOut(auth);
          throw backendError;
        }
      }

      return userCredential;
    } finally {
      isLoggingIn.current = false;
    }
  };

  // Logout user
  const logout = () => {
    setJwtReady(false);
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const AuthInfo = {
    currentUser,
    jwtReady,
    resetPassword,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
