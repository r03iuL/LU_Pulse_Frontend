import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Notice = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample notices data with multiple categories
  const notices = [
    {
      id: 1,
      title: "General Notice: Campus Safety Update",
      category: ["General"],
      description: "Due to recent safety concerns, the campus security has increased patrols around the main buildings. All students and faculty are advised to be vigilant and report any suspicious activity immediately to campus security. Please make sure to lock your vehicles and keep your personal belongings secure. Regular updates will be provided via email.",
      image: "https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg",
      date: "2024-03-15", // Issue date
    },
    {
      id: 2,
      title: "Holiday Notice: Mid-Semester Break",
      category: ["General", "Academic"],
      description: "The university will be observing a mid-semester break from April 10th to April 15th. During this period, all classes will be suspended, and administrative offices will be closed. Students are encouraged to use this time for rest and revision. Any urgent academic matters should be addressed to your department heads before the break begins.",
      image: "",
      date: "2024-03-20", // Issue date
    },
    {
      id: 3,
      title: "Exam Schedule: Spring Semester 2024",
      category: ["Academic"],
      description: "The exam schedule for the Spring Semester 2024 has been released. Exams will commence from May 1st and conclude on May 15th. Students can view their individual exam timetables and locations on the student portal. It is crucial to review the schedule carefully and be punctual for all exams. For any discrepancies, contact the examination office immediately.",
      image: "https://via.placeholder.com/150",
      date: "2024-03-25", // Issue date
    },
    {
      id: 4,
      title: "Bus Timings: New Semester Schedule",
      category: ["Transport"],
      description: "The bus service timings have been updated for the new semester. Buses will now run more frequently during peak hours to accommodate the increased number of students. The updated timetable is available on the university website and at all major bus stops. Please check the new schedule to avoid delays and ensure timely arrival to your classes.",
      image: "https://via.placeholder.com/150",
      date: "2024-03-28", // Issue date
    },
    {
      id: 5,
      title: "Staff Meeting: Policy Updates",
      category: ["Staff"],
      description: "A mandatory staff meeting will be held on May 2nd from 10 AM to 12 PM in the conference hall. The meeting will cover important updates to university policies, including changes to leave entitlements and staff responsibilities. All staff members are required to attend. Refreshments will be provided. Please RSVP to the HR department by April 28th.",
      image: "https://via.placeholder.com/150",
      date: "2024-04-01", // Issue date
    },
    {
      id: 6,
      title: "Academic Workshop: Research Methods",
      category: ["Academic"],
      description: "An academic workshop on advanced research methods will be conducted on April 25th from 9 AM to 4 PM in the seminar room. The workshop will cover various research techniques, data analysis, and academic writing. It is open to all graduate students and faculty members. Please register through the university’s online event portal to secure your spot.",
      image: "https://via.placeholder.com/150",
      date: "2024-04-05", // Issue date
    },
    {
      id: 7,
      title: "Transport Notice: Temporary Route Changes",
      category: ["Transport"],
      description: "Due to ongoing construction work on University Avenue, there will be temporary changes to the bus routes starting April 1st. The affected routes include Buses 3 and 5. Alternative routes and temporary stops have been established. Please check the transport section on the university’s website for detailed information and updates.",
      image: "https://via.placeholder.com/150",
      date: "2024-03-30", // Issue date
    },
  ];
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter notices based on selected category and search query
  const filteredNotices = notices.filter(
    (notice) =>
      (selectedCategory === "all" ||
        notice.category.includes(selectedCategory)) &&
      notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen max-w-[90%] px-20 py-10 mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search notices..."
              className="w-full p-5 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
            />
            <span className="absolute right-7 top-5 text-gray-500">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="flex">
          {/* Left Sidebar for Notice Categories */}
          <div className="w-full md:w-1/4 p-4 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer p-4 rounded-md ${
                  selectedCategory === "all"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange("all")}
              >
                All Notices
              </li>
              <li
                className={`cursor-pointer p-4 rounded-md ${
                  selectedCategory === "General"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange("General")}
              >
                General Notices
              </li>
              <li
                className={`cursor-pointer p-4 rounded-md ${
                  selectedCategory === "Academic"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange("Academic")}
              >
                Academic Notices
              </li>
              <li
                className={`cursor-pointer p-4 rounded-md ${
                  selectedCategory === "Transport"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange("Transport")}
              >
                Transport Notices
              </li>
              <li
                className={`cursor-pointer p-4 rounded-md ${
                  selectedCategory === "Staff"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange("Staff")}
              >
                Staff Notices
              </li>
            </ul>
          </div>

          {/* Notice List */}
          <div className="w-full md:w-3/4 p-6 bg-white ml-6 rounded-xl shadow-lg">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="my-6 p-4 bg-slate-50 shadow-md rounded-lg"
                >
                  <h4 className="text-xl font-bold">
                    {notice.title}{" "}
                    <span className="text-sm font-semibold text-gray-400 px-2">
                      {notice.category.join(", ")}
                    </span>
                  </h4>
                  <p className="text-md font-bold text-gray-600 py-2">
                    Issued on: {new Date(notice.date).toLocaleDateString()}
                  </p>
                  <p>{notice.description}</p>
                  {notice.image && (
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="mt-3 w-72 h-auto max-w-xs rounded-md"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No notices found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
