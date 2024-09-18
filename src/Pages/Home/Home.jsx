import Banner from "../../Components/Homepage/Banner";
import Futures from "./../../Components/Homepage/Futures";

function Home() {
  return (
    <>
      <div className="bg-blue-50">
        <Banner></Banner>
        <Futures></Futures>
      </div>
    </>
  );
}

export default Home;
