import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const FormikForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    setStatus(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: "Registration successful!" });
        resetForm();
      } else {
        setStatus({ error: "Registration failed." });
      }
    } catch {
      setStatus({ error: "Network error. Try again later." });
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        User Registration (Formik + Yup)
      </h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="w-full border border-gray-300 rounded p-2"
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded p-2"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded p-2"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {status?.success && <p className="text-green-600 text-sm">{status.success}</p>}
            {status?.error && <p className="text-red-500 text-sm">{status.error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
