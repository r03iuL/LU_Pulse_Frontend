const Profile = () => {
    // Example user data
    const user = {
      fullName: "John Doe",
      id: "123456",
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    };
  
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 border lg:my-10 border-gray-300">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-32 h-32 lg:w-60 lg:h-60 rounded-full border-4 border-gray-300"
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
  