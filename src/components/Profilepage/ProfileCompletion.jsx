const ProfileCompletion = () => (
  <div className="stat-card gradient-bg rounded-2xl shadow-xl p-6 text-white">
    <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span>Overall Progress</span>
        <span className="font-semibold">85%</span>
      </div>
      <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
        <div
          className="bg-white h-2 rounded-full"
          style={{ width: "85%" }}
        ></div>
      </div>
      <p className="text-sm opacity-90">
        Add more details to complete your profile and increase visibility!
      </p>
    </div>
  </div>
);

export default ProfileCompletion;
