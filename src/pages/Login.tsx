import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters, include a letter and a number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Logged in successfully!');
      // Proceed to backend call here
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none border ${
      errors[field] ? 'border-red-500' : 'border-transparent'
    }`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-black bg-opacity-30 p-16 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={inputClass('password')}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
        <Link
  to="/forgot-password" // Navigate to forgot password page
  className="text-sm text-white hover:text-green-400 underline"
>
  Forgot Password?
</Link>

        </div>
        <div className="mt-2 text-center">
          <Link
            to="/register" // Use Link to navigate to the Register page
            className="text-sm text-white hover:text-green-400 underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
