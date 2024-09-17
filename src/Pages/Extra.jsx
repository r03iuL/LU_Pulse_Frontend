{/* Image Container */}
<div className="relative max-w-sm sm:max-w-md mx-5 lg:mx-20 rounded-lg overflow-hidden flex-shrink-0 h-96 lg:h-auto">
<img src={img} alt="Example" className="w-full h-full object-cover" />
<div className="absolute bottom-0 left-0 right-0 h-20 sm:h-40 bg-gradient-to-b from-transparent to-white via-white/70"></div>
</div>

{/* Text and Content Section */}
<div className="mx-5 lg:mx-10 text-center lg:text-left mt-5 lg:mt-0 lg:ml-10 py-20">
<h1 className="text-4xl sm:text-4xl font-bold text-black">
  Browse our university facilities.
</h1>
<p className="text-lg sm:text-xl font-semibold text-stone-500 py-4 sm:py-6">
  Our university provides various facilities for the students to
  improve the quality of studies!
</p>
<div className="grid grid-cols-2 gap-8 my-5">
  {/* Square 1 - Academics */}
  <div className="w-52 h-44 bg-slate-200 rounded-md px-4 py-4">
    <h1 className="text-center font-bold py-2">Academics</h1>
    <ul className="list-disc list-inside text-sm font-semibold">
      <li>Personalized Tutoring</li>
      <li>Workshops & Seminars</li>
      <li>Study Groups</li>
    </ul>
  </div>

  {/* Square 2 - Library */}
  <div className="w-52 h-44 bg-slate-300 rounded-md px-8 py-4">
    <h1 className="text-center font-bold py-2">Library</h1>
    <ul className="list-disc list-inside text-sm font-semibold">
      <li>Digital Resources</li>
      <li>Quiet Study Rooms</li>
      <li>Extended Hours</li>
    </ul>
  </div>

  {/* Square 3 - Sports Complex */}
  <div className="w-52 h-44 bg-slate-100 rounded-md px-8 py-4 mt-10">
    <h1 className="text-center font-bold py-2">Sports Complex</h1>
    <ul className="list-disc list-inside text-sm font-semibold">
      <li>Gym Facilities</li>
      <li>Indoor Courts</li>
      <li>Swimming Pool</li>
    </ul>
  </div>

  {/* Square 4 - Student Center */}
  <div className="w-52 h-44 bg-slate-200 rounded-md px-8 py-4">
    <h1 className="text-center font-bold py-2">Student Center</h1>
    <ul className="list-disc list-inside text-sm font-semibold">
      <li>Recreational Areas</li>
      <li>Food Court</li>
      <li>Study Lounges</li>
    </ul>
  </div>
</div>
</div>