import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../api/ClientFunction";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { LucideArrowLeft } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Yup validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    console.log("Login payload:", values);

    const response = await postData("/auth/login", values);
    if (response?.success) {
      setUser(response?.user);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success(response.msg || "User logged in successfully");
      navigate("/");
    } else {
      toast.error(response.msg || "Login failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="backbtn" onClick={() => navigate("/")}>
        <LucideArrowLeft />
      </div>
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="login-container">
        <div className="logo">
          <span>Welcome Back to</span>
          <h1>MS BLOGHUB</h1>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isLoading || isSubmitting}
              >
                <span className={`btn-text ${isLoading ? "hidden" : ""}`}>
                  Login
                </span>
                <div className={`loading ${isLoading ? "show" : ""}`}></div>
              </button>
            </Form>
          )}
        </Formik>

        <div className="forgot-password">
          <a onClick={() => navigate("/register")}>
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
