import React, { useState } from "react";

const CreatePostForm = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onCreate) {
        await onCreate(formData);
      }
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        status: "draft",
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-2 py-2">
      <div className="max-w-4xl w-full bg-white p-4 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Tagline</label>
              <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              disabled={isLoading}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Select Category</option>
                <option value="React">React</option>
                <option value="Tech">Tech</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Movies">Movies</option>
                <option value="Knowledge">Knowledge</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Jobs">Jobs</option>
                <option value="Govt">Govt.</option>
              </select>
            </div>
            
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Post"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
