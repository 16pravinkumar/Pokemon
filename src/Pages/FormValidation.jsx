
import { useState } from "react";

function FormValidation() {
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setError((prevError) => ({
      ...prevError,
      [name]: ""
    }))

    setUserForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!userForm.firstName.trim()) {
      formErrors.firstName = "First name is required";
    }
    if (!userForm.lastName.trim()) {
      formErrors.lastName = "Last name is required";
    }
    if (!userForm.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!userForm.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(userForm.phoneNumber)) {
      formErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!userForm.password.trim()) {
      formErrors.password = "Password is required";
    } else if (userForm.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setError(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully", userForm);
    } else {
      console.log("Form has errors", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userForm.firstName}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {error.firstName && <p className="text-red-500 text-sm">{error.firstName}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userForm.lastName}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {error.lastName && <p className="text-red-500 text-sm">{error.lastName}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={userForm.phoneNumber}
            onChange={handleOnChange}
            maxLength={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {error.phoneNumber && <p className="text-red-500 text-sm">{error.phoneNumber}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default FormValidation;
