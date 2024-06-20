import NavBar from "../Components/Navbar/NavBar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
