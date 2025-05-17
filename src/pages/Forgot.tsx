import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // **Simulated API request:**
      // Instead of real API, we fake a reset token and delay

      await new Promise((r) => setTimeout(r, 1000)); // wait 1s

      // Fake reset token:
      const fakeResetToken = '123456abcdef';

      // Navigate to reset password page with token in URL
      navigate(`/reset-password?code=${fakeResetToken}`);

    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Password Reset Email'}
          </button>
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
