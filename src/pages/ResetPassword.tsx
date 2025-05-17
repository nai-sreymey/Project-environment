import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError('');
    if (name === 'password') setPassword(value);
    else if (name === 'passwordConfirmation') setPasswordConfirmation(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !passwordConfirmation) {
      setError('Please fill in both fields.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000)); // 1s delay

      // Simulate successful password reset
      setSuccess(true);
    } catch (err) {
      setError('Failed to reset password.');
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
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!success ? (
            <>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={password}
                  onChange={handleChange}
                  className={inputClass()}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm New Password"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  className={inputClass() + ' mt-3'}
                />
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
              >
                Reset Password
              </button>
            </>
          ) : (
            <div className="text-center text-white">
              <p className="text-lg mb-4">Your password has been successfully reset!</p>
              <Link
                to="/login"
                className="text-sm text-white hover:text-green-400 underline"
              >
                Go to Login
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
