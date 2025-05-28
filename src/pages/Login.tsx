


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 9) {
      newErrors.password = 'Password must be more than 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await fetch('http://pse-eco-sharing-be.final25.psewmad.org/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user.id);      // <-- Add this line
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('jwt', data.jwt);
        navigate('/post');
      }
    } catch (err) {
      setApiError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none border ${
      errors[field] ? 'border-red-500' : 'border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/background.png')" }}>
      <div className="bg-black bg-opacity-30 p-16 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Login</h2>
        {apiError && <p className="text-red-400 text-sm mb-4 text-center">{apiError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className={inputClass('email')} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className={inputClass('password')} />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600" disabled={loading}>
            {loading ? <span className="animate-spin">Loading...</span> : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">


        </div>
        <div className="mt-2 text-center">
          <Link to="/register" className="text-sm text-white hover:text-green-400 underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
