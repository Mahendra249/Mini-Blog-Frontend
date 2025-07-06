import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../api/ClientFunction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Landingpage/Header";

const NewPost = () => {
  const navigate = useNavigate();

  // Yup schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    excerpt: Yup.string()
      .min(10, "Tagline must be at least 10 characters")
      .required("Tagline is required"),
    content: Yup.string()
      .min(50, "Content must be at least 50 characters")
      .required("Content is required"),
    category: Yup.string()
      .oneOf(
        [
          "React",
          "Tech",
          "Entertainment",
          "Movies",
          "Knowledge",
          "Health",
          "Business",
          "Jobs",
          "Govt",
        ],
        "Select a valid category"
      )
      .required("Category is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postData("/posts", values);

    if (response?.success) {
      toast.success(response.message || "Post created successfully");
      navigate("/");
    } else {
      toast.error(response?.message || "Failed to create post");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-8">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Create New Post
          </h2>

          <Formik
            initialValues={{
              title: "",
              excerpt: "",
              content: "",
              category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block mb-1 font-semibold">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Tagline</label>
                  <Field
                    as="textarea"
                    name="excerpt"
                    rows={1}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="excerpt"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Content</label>
                  <Field
                    as="textarea"
                    name="content"
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    disabled={isSubmitting}
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
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NewPost;
