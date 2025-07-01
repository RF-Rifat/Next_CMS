"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const USER_ROLES = [
  'Administrator',
  'Editor',
  'Author',
  'Contributor',
  'Subscriber',
];

const AddUserPage: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    password: '',
    roles: ['Subscriber'],
    sendNotification: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name === 'roles') {
      const options = Array.from(e.target.selectedOptions, (option: any) => option.value);
      setForm(f => ({ ...f, roles: options }));
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (!form.username || !form.email || !form.password) {
      setError('Username, Email, and Password are required');
      setLoading(false);
      return;
    }
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add',
        username: form.username,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        website: form.website,
        password: form.password,
        roles: form.roles,
        sendNotification: form.sendNotification,
      })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSuccess('User created successfully');
      setTimeout(() => router.push('/nx-admin/users'), 1200);
    } else {
      setError(data.error || 'Failed to create user');
    }
  };

  return (
    <div className="container p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Username <span className="text-red-500">*</span></label>
          <input name="username" value={form.username} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Email <span className="text-red-500">*</span></label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block font-semibold">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block font-semibold">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block font-semibold">Website</label>
          <input name="website" value={form.website} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block font-semibold">Password <span className="text-red-500">*</span></label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Send User Notification</label>
          <input name="sendNotification" type="checkbox" checked={form.sendNotification} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-semibold">Role(s)</label>
          <select name="roles" multiple value={form.roles} onChange={handleChange} className="border p-2 w-full">
            {USER_ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Creating...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;