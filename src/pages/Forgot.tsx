import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // New state for success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // Clear error when user types
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email.');
    } else {
      // Proceed with password reset (send email or call API)
      setSuccess(true); // Set success state to true
      setError(''); // Clear any previous errors
    }
  };

  const inputClass = () =>
    `w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none border ${
      error ? 'border-red-500' : 'border-transparent'
    }`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-black bg-opacity-30 p-16 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!success ? (
            <>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  className={inputClass()}
                />
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
              >
                Send Password Reset Email
              </button>
            </>
          ) : (
            // Success message after email is sent
            <div className="text-center text-white">
              <p className="text-lg mb-4">A password reset link has been sent to your email!</p>
              <p>Please follow the link in your email to set a new password.</p>
            </div>
          )}
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-white hover:text-green-400 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
