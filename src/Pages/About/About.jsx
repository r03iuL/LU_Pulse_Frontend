const About = () => {
  return (
    <div className="bg-slate-100 py-10 px-10">
      <div className="container mx-auto">
        <h1 className="text-3xl my-6 font-bold text-center text-cyan-600">
          About LU Pulse
        </h1>

        <div className="text-justify bg-white p-10 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold my-2 text-orange-600">What is LU Pulse?</h2>
          <p className="text-lg border-t-4 border-slate-300 py-4">
            LU Pulse is a comprehensive and innovative notification system developed specifically for university students, faculty, and administrative staff. It aims to streamline communication across the campus by providing real-time updates on important notices, events, and activities. Whether it&apos;s an academic deadline, a campus event, or administrative announcements, LU Pulse ensures everyone stays informed and connected.
          </p>
          <p className="text-lg">
            Our platform serves as a unified hub for all notices, helping the university community remain organized and up-to-date. Additionally, LU Pulse offers seamless calendar integration, making it easier for users to manage their schedules by syncing upcoming events directly to their personal or university-provided calendars. By centralizing university communications, LU Pulse fosters a well-informed campus environment.
          </p>
        </div>

        {/* New Section: Why LU Pulse? */}
        <div className="mt-10 text-justify bg-white p-10 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold my-2 text-orange-600">Why LU Pulse?</h2>
          <p className="text-lg border-t-4 border-slate-300 py-4">
            Unlike WhatsApp groups or Facebook pages, LU Pulse is tailored specifically for the needs of a university environment. While social media platforms and messaging apps are great for casual communication, they lack the structure and reliability that an official notification system provides.
          </p>
          <ul className="list-disc list-inside text-lg">
            <li><strong>Centralized and Official:</strong> LU Pulse is the official notification platform for the university, ensuring that all notices are accurate and timely. No more digging through long WhatsApp threads or missing important updates in a crowded Facebook feed.</li>
            <li><strong>No Distractions:</strong> Unlike social media groups, LU Pulse is dedicated solely to university notices and events, without the distractions of unrelated conversations and content that fill other platforms.</li>
            <li><strong>Real-Time Updates:</strong> LU Pulse delivers real-time updates that are crucial for academic deadlines, campus events, and administrative announcements. You don’t have to rely on someone to forward or repost the information.</li>
            <li><strong>Calendar Integration:</strong> Automatically sync important dates and events to your calendar with LU Pulse, a feature that social media groups lack, ensuring you never miss any deadlines.</li>
            <li><strong>Privacy and Security:</strong> LU Pulse is designed with privacy and access control in mind, making sure only authorized users (students, faculty, and staff) can access and interact with the information.</li>
          </ul>
        </div>

        {/* Key Features Section */}
        <div className="my-10 text-justify">
          <h2 className="text-3xl font-bold text-center mb-6 text-cyan-600">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 ">
            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                Notice Updates
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Real-time notifications for important announcements</li>
                <li>Centralized noticeboard for academic and administrative updates</li>
                <li>Easy access to notices by all members of the university</li>
              </ul>
            </div>

            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                Access for All
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Accessible for students, faculty, and administrative staff</li>
                <li>Personalized notifications based on role and department</li>
                <li>Secure login and access control for authorized users</li>
              </ul>
            </div>

            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                Calendar Integration
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Sync events and important dates directly to your calendar</li>
                <li>Automatic updates for upcoming campus events and activities</li>
                <li>Never miss a deadline or event with timely reminders</li>
              </ul>
            </div>

            {/* New Features Added */}
            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                Email/Push Notifications
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Receive instant email notifications for critical updates</li>
                <li>Push notifications for urgent and time-sensitive announcements</li>
                <li>Stay connected wherever you are with multi-platform notifications</li>
              </ul>
            </div>

            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                Mobile App
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Available on both Android and iOS</li>
                <li>Access notices and updates directly from your phone</li>
                <li>Sync notices and calendars with your mobile device</li>
              </ul>
            </div>

            <div className="card bg-base-100 shadow-xl p-12">
              <h3 className="text-2xl font-bold mb-3 text-orange-600 text-center">
                AI-Powered Chatbot
              </h3>
              <ul className="list-disc list-inside text-lg">
                <li>Machine learning model to provide instant responses to queries</li>
                <li>Chatbot assists in finding notices and answering questions</li>
                <li>Enhances user experience with 24/7 availability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
