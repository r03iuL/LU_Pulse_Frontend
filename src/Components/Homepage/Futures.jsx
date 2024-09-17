import img from "../../assets/Futures.png";

function Future() {
  return (
    <div className="hero min-h-screen max-w-[90%] sm:max-w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-center relative">
      <div className="ciclePosition w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-amber-400 rounded-full absolute z-0 top-[30%] left-[50%] transform translate-x-[-150%] translate-y-[-90%] blur-[150px] sm:blur-[290px]"></div>
      <div className="hero-content flex flex-col lg:flex-row items-center justify-center w-full relative z-10">

        <div className="relative max-w-lg lg:max-w-xl mx-5 lg:mx-10 rounded-lg overflow-hidden flex-shrink-0">
          <img src={img} alt="Example" className="w-full h-auto" />
          {/* <div className="absolute bottom-0 left-0 right-0 h-40 lg:h-60 bg-gradient-to-b from-transparent to-white via-white/30"></div> */}
        </div>

        <div className=" my-10 mx-5 lg: mx-0 text-center lg:text-left ">
          <h1 className="text-xl lg:text-[26px] font-bold text-black">
            Browse our university facilities.
          </h1>
          <p className="text-xl lg:text-lg font-semibold text-stone-500 py-6 lg:py-2">
            Our university provides various facilities for the students to
            improve the quality of studies!
          </p>
          <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            {/* Square 1 - Academics */}
            <div className="w-38 h-44 bg-slate-200 rounded-md p-4 lg:mt-10">
              <h1 className="text-center font-bold py-2">Academics</h1>
              <ul className="list-disc list-inside text-sm font-semibold">
                <li>Personalized Tutoring</li>
                <li>Workshops & Seminars</li>
                <li>Study Groups</li>
              </ul>
            </div>

            {/* Square 2 - Library */}
            <div className="w-38 h-44 bg-slate-300 rounded-md p-4 ">
              <h1 className="text-center font-bold py-2">Library</h1>
              <ul className="list-disc list-inside text-sm font-semibold">
                <li>Digital Resources</li>
                <li>Quiet Study Rooms</li>
                <li>Extended Hours</li>
              </ul>
            </div>

            {/* Square 3 - Sports Complex */}
            <div className="w-38 h-44 bg-slate-100 rounded-md px-8 py-4 lg:mt-10">
              <h1 className="text-center font-bold py-2">Sports Complex</h1>
              <ul className="list-disc list-inside text-sm font-semibold">
                <li>Gym Facilities</li>
                <li>Indoor Courts</li>
                <li>Swimming Pool</li>
              </ul>
            </div>

            {/* Square 4 - Student Center */}
            <div className="w-38 h-44 bg-slate-200 rounded-md px-8 py-4">
              <h1 className="text-center font-bold py-2">Student Center</h1>
              <ul className="list-disc list-inside text-sm font-semibold">
                <li>Recreational Areas</li>
                <li>Food Court</li>
                <li>Study Lounges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Future;
