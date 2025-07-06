const ProfileStats = ({ postsCount, followersCount, followingCount }) => (
  <div className="stat-card bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Blog Posts</span>
        <span className="font-semibold text-indigo-600">{postsCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Followers</span>
        <span className="font-semibold text-indigo-600">{followersCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Following</span>
        <span className="font-semibold text-indigo-600">{followingCount}</span>
      </div>
    </div>
  </div>
);

export default ProfileStats;
