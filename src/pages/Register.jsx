import "../styles/Register.css";
import { postData } from "../api/ClientFunction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LucideArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Yup validation schema
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name should be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleRegister = async (values) => {
    setIsLoading(true);
    console.log("Register payload:", values);

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const response = await postData("/auth/register", payload);
    if (response?.success) {
      setUser(response?.user);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success(response?.msg || "User registered successfully");
      navigate("/");
    } else {
      toast.error(response?.msg || "Registration failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <div className="backbtn" onClick={() => navigate("/")}>
        <LucideArrowLeft />
      </div>

      <div className="background-shapes">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`shape shape-${i + 1}`}></div>
        ))}
      </div>

      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="floating-particle"></div>
        ))}
      </div>

      <div className="register-container">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-text">BLOG HUB</span>
          </div>
          <h1>Create Account</h1>
          <p>Join us and start your journey</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="form-section">
              <div className="form-group">
                <div className="input-wrapper">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <div className="input-focus-line"></div>
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <div className="input-focus-line"></div>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <div className="input-focus-line"></div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input"
                    disabled={isLoading}
                  />
                  <div className="input-focus-line"></div>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-text"
                />
              </div>

              <button
                type="submit"
                className="register-btn"
                disabled={isLoading || isSubmitting}
              >
                <span className={`btn-content ${isLoading ? "loading" : ""}`}>
                  <span className="btn-text">Create Account</span>
                  <div className="btn-loader"></div>
                </span>
                <div className="btn-ripple"></div>
              </button>
            </Form>
          )}
        </Formik>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <a onClick={() => navigate("/login")}>Sign In</a>
        </div>
      </div>
    </div>
  );
}
