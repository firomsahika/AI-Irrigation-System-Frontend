import { useUser } from "../../context/userContext";

export default function Profile() {
  const { user, loading, logout } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-lg font-medium text-green-600 animate-pulse">
          Loading profile...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <p className="text-2xl font-semibold mb-4">You're not logged in</p>
        <a
          href="/login"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between gap-6 mb-8 border-b pb-6">
          <div className="w-20 h-20  bg-green-100 rounded-full flex items-center justify-center text-3xl text-green-700 font-bold">
            {user.first_name?.[0] || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={logout}
            className="inline-block px-6 py-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <ProfileItem label="User ID" value={user.id} />
          <ProfileItem label="Username" value={user.username} />
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="First Name" value={user.first_name} />
          <ProfileItem label="Last Name" value={user.last_name} />
          <ProfileItem
            label="Status"
            value={user.is_active ? "✅ Active" : "❌ Inactive"}
          />
          <ProfileItem
            label="Superuser"
            value={user.is_superuser ? "👑 Yes" : "No"}
          />
        </div>

        {/* Action */}
        <div className="mt-10 text-center">
          <button
            onClick={logout}
            className="inline-block px-6 py-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);
