import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function NewRegisterForm({ labels, onCancel, showDropdownButton }) {
  const validationSchema = Yup.object().shape({
    field3: Yup.string()
      .email("Invalid email format")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please Enter Valid Email Only")
      .required(`${labels.field3} is required`),
    field4: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required(`${labels.field4} is required`)
      .max(10),
    field5: Yup.string()
      .required(`${labels.field5} is required`)
      .matches(/^\d+$/, "Please Enter Numbers Only")
      .max(10, "Please Enter The Valid Number")
      .min(10, "Contact Number must be at least 10 digits"),
    ...Object.keys(labels).reduce((schema, key) => {
      if (key !== "field3" && key !== "field4" && key !== "field5") {
        schema[key] = Yup.string()
          .required(`${labels[key]} is required`)
          .min(5, `${labels[key]} Must be 5 Character`);
      }
      return schema;
    }, {}),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    alert("Form submitted successfully!");
    setSubmitting(false);
  };

  return (
    <div className="max-w-full mx-auto p-4 py-8 bg-white rounded-md shadow-md flex flex-col h-screen overflow-y-auto">
      <h2 className="flex justify-center text-2xl font-bold mb-4">
        Add New Entry
      </h2>
      <Formik
        initialValues={Object.fromEntries(Object.keys(labels).map((key) => [key, ""]))}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValidating, isValid, values }) => (
          <Form className="flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(labels).map((key) => (
                <div key={key} className="mb-2">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-600"
                  >
                    {labels[key]}:
                  </label>
                  <Field
                    type="text"
                    id={key}
                    name={key}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name={key}
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ))}
            </div>
            {showDropdownButton && (
              <div className="flex items-center mb-4">
                <label
                  htmlFor="UserRole"
                  className="block text-sm font-medium text-gray-600"
                >
                  User Role:
                </label>
                <div className="ml-2 flex items-center">
                  <Field
                    as="select"
                    name="UserRole"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="ADMIN">Administrator</option>
                    <option value="SUPER_ADMIN">Super Administrator</option>
                  </Field>
                </div>
              </div>
            )}
            <div className="flex justify-end mb-20">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
                  isValidating || !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isValidating || !isValid}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewRegisterForm;
