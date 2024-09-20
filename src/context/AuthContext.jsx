import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop the loading state once the user is determined
    });

    return () => unsubscribe();
  }, []);

  // Signup with email and password
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user); // Send verification email
    return userCredential;
  };

  // Login with email and password
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  };

  // Logout user
  const logout = () => signOut(auth);

  // Method to reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Context value to be used throughout the app
  const AuthInfo = {
    currentUser,
    resetPassword,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
