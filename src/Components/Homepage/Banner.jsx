import img from "../../assets/Banner.svg";

function Banner() {
  return (
    <div className="hero min-h-screen max-w-[90%] sm:max-w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-center relative ">
      <div className="ciclePosition w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-amber-400 rounded-full absolute z-0 top-[30%] left-[50%] transform translate-x-[-150%] translate-y-[-90%] blur-[150px] sm:blur-[290px]"></div>
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center justify-center w-full relative z-10">
        <div className="relative max-w-lg lg:max-w-xl mx-5 lg:mx-10 rounded-lg overflow-hidden flex-shrink-0">
          <img src={img} alt="Example" className="w-[600px] h-auto" />
          {/* <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-40 bg-gradient-to-b from-transparent to-white via-white/70"></div> */}
        </div>
        <div className="mx-5 lg:mx-10 text-center lg:text-left mt-5 lg:mt-0 lg:ml-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-sky-500">
            Register to get all university updates!
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-stone-500 py-4 sm:py-6">
            Stay in the loop with all the latest updates from our university,
            right here on this website!
          </p>
          <button className="rounded-lg bg-sky-500 text-white text-lg sm:text-xl px-6 py-2 sm:px-8 sm:py-3">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
