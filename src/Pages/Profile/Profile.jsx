const Profile = () => {
    // Example user data
    const user = {
      fullName: "John Doe",
      id: "123456",
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    };
  
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 lg:p-10">
        <div className="card w-full max-w-2xl shadow-2xl bg-white p-8 m-4 lg:m-0">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-32 h-32 lg:w-80 lg:h-80 rounded-full border-4 border-gray-300"
            />
          </div>
          
          {/* Profile Information */}
          <div className="text-left">
            <div className="mb-4">
              <p className="text-lg font-semibold mb-1">Full Name:</p>
              <div className="p-4 border border-gray-300 rounded-md">
                {user.fullName}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-lg font-semibold mb-1">ID:</p>
              <div className="p-4 border border-gray-300 rounded-md">
                {user.id}
              </div>
            </div>
            
            <div>
              <p className="text-lg font-semibold mb-1">Email:</p>
              <div className="p-4 border border-gray-300 rounded-md">
                {user.email}
              </div>
            </div>
          </div>
          
          {/* Edit Button */}
          <div className="flex justify-center mt-6">
            <button
              className="btn btn-primary px-6 py-2 border border-blue-500 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => console.log('Edit profile clicked')}
            >
              Edit Info
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
  