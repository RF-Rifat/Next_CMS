'use client';

import { useState } from 'react';
import Notification from './Notification';

export default function Submit({
  defaultValue,
  title,
  sub,
  onChange,
  onSubmit,
  loading = false
}: {
  defaultValue: string;
  title: string;
  sub?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0);
  const [status, setStatus] = useState(defaultValue);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onChange?.(newStatus);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      setShow(true);
      setNotificationKey(prev => prev + 1);
    }
  };

  return (
    <div className="block space-y-2">
      <h1 className="text-base font-normal">{title}</h1>
      {sub && <p className="text-sm text-gray-600">{sub}</p>}
      
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-2 outline-0 w-full rounded bg-white border"
        disabled={loading}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
      
      {show && (
        <Notification 
          key={notificationKey}
          message="Success!" 
          type="success" 
          duration={3000}
          onDismiss={() => setShow(false)}
        />
      )}
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`font-bold rounded p-2 w-full ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-main text-white hover:bg-main-dark'
        }`}
      >
        {loading ? 'Saving...' : 'Save Page'}
      </button>
    </div>
  );
}