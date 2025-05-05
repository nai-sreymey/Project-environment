import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on typing
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, with letters and numbers

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.username.trim()) newErrors.username = 'Username is required.';
    if (!form.email.includes('@')) newErrors.email = 'Enter a valid email.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d+$/.test(form.phone)) newErrors.phone = 'Phone number must contain only digits.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain both letters and numbers.';
    }
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Registered successfully!');
      // Submit form data to backend here
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
      <div className="bg-black bg-opacity-30 p-10 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-4xl font-semibold text-white text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass('fullName')}
            />
            {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
          </div>

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
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
              className={inputClass('phone')}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
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

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="w-60 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
