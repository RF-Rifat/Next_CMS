"use client"
import Table from "@/components/ui/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

const USER_ROLES = [
  'Administrator',
  'Editor',
  'Author',
  'Contributor',
  'Subscriber',
];

const Page = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    password: '',
    roles: ['Subscriber'],
    sendNotification: false,
    role: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/users?all=1')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (user: any) => {
    if (user.env) return alert('Cannot delete env admin');
    if (!window.confirm(`Delete user ${user.name}?`)) return;
    setSaving(true);
    const res = await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: user._id })
    });
    if (res.ok) {
      setUsers(users.filter(u => u._id !== user._id));
    } else {
      alert('Delete failed');
    }
    setSaving(false);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setEditForm({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      website: user.website || '',
      password: '',
      roles: user.roles || [user.role] || ['Subscriber'],
      sendNotification: false,
      role: user.role || 'Subscriber',
    });
  };

  const handleEditSave = async () => {
    setSaving(true);
    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: editUser._id, ...editForm })
    });
    if (res.ok) {
      setUsers(users.map(u => u._id === editUser._id ? { ...u, ...editForm, password: undefined } : u));
      setEditUser(null);
    } else {
      alert('Update failed');
    }
    setSaving(false);
  };

  const handleRoleChange = (user: any, role: string) => {
    setEditUser(user);
    setEditForm({ ...editForm, role });
    handleEditSave();
  };

  if (loading) return <div className="p-4">Loading users...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container p-4">
      <Table name="Users" link="/nx-admin/users/add">
        {users.map((user) => (
          <div key={user._id} className="p-2 flex flex-col md:flex-row md:items-center md:justify-between border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <div>
                <b>{user.name}</b> <span className="text-xs text-gray-500">({user.role})</span>
                {user.env && <span className="ml-2 text-xs text-blue-500">env admin</span>}
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <select
                value={user.role}
                disabled={user.env}
                onChange={e => handleRoleChange(user, e.target.value)}
                className="border p-1 rounded"
              >
                {USER_ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button
                className="px-2 py-1 bg-yellow-400 text-white rounded"
                onClick={() => handleEdit(user)}
                disabled={user.env}
              >Edit</button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(user)}
                disabled={user.env || saving}
              >Delete</button>
            </div>
          </div>
        ))}
      </Table>
      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Edit User</h2>
            <div className="mb-2">
              <label>Username</label>
              <input className="border p-1 w-full" value={editForm.username} onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>Email</label>
              <input className="border p-1 w-full" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>First Name</label>
              <input className="border p-1 w-full" value={editForm.firstName} onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>Last Name</label>
              <input className="border p-1 w-full" value={editForm.lastName} onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>Website</label>
              <input className="border p-1 w-full" value={editForm.website} onChange={e => setEditForm(f => ({ ...f, website: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>Password (leave blank to keep unchanged)</label>
              <input className="border p-1 w-full" type="password" value={editForm.password} onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label>Role(s)</label>
              <select className="border p-1 w-full" name="roles" multiple value={editForm.roles} onChange={e => {
                const options = Array.from(e.target.selectedOptions, (option: any) => option.value);
                setEditForm(f => ({ ...f, roles: options }));
              }}>
                {USER_ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>Send User Notification</label>
              <input type="checkbox" checked={editForm.sendNotification} onChange={e => setEditForm(f => ({ ...f, sendNotification: e.target.checked }))} />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleEditSave} disabled={saving}>Save</button>
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;