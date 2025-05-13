import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) newErrors.username = 'Username is required.';
    if (!form.email.includes('@')) newErrors.email = 'Enter a valid email.';
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 9) {
      newErrors.password = 'Password must be more than 8 characters.';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:1337/api/auth/local/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate('/login');
        } else {
          setErrors({ general: data.message || 'An error occurred. Please try again.' });
        }
      } catch (error) {
        setErrors({ general: 'Network error. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const inputClass = (field: string) =>
    `px-4 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none border ${
      errors[field] ? 'border-red-500' : 'border-transparent'
    }`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="bg-black bg-opacity-30 p-10 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-4xl font-semibold text-white text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={inputClass('username')}
            />
            {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputClass('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-center md:col-span-2">{errors.general}</p>
          )}

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="w-60 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin">Loading...</span>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
