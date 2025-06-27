'use client';
import React, { useState } from 'react';

type Plugin = {
  id: number;
  image: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: boolean; // true = Active
};

type PluginsProps = {
  item: Plugin[];
};

export default function Plugins({ item }: PluginsProps) {
  const [plugins, setPlugins] = useState(item);

  const toggleStatus = (id: number) => {
    setPlugins(prev =>
      prev.map(plugin =>
        plugin.id === id ? { ...plugin, status: !plugin.status } : plugin
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {plugins.map(plugin => (
        <div
          key={plugin.id}
          className="bg-white rounded-2xl shadow-md border p-4 space-y-2"
        >
          <img
            src={plugin.image}
            alt={plugin.name}
            className="w-full h-32 object-cover rounded-xl"
          />
          <h2 className="text-lg font-semibold">{plugin.name}</h2>
          <p className="text-sm text-gray-600">{plugin.description}</p>
          <p className="text-xs text-gray-500">Version: {plugin.version}</p>
          <p className="text-xs text-gray-500">Author: {plugin.author}</p>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-sm font-medium ${
                plugin.status ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {plugin.status ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={() => toggleStatus(plugin.id)}
              className={`relative inline-flex items-center h-6 border rounded-full w-14 transition-colors duration-300 outline-0 ${
                plugin.status ? 'border-blue-500 bg-blue-200' : 'bg-gray-100'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-blue-500 rounded-full transition-transform duration-300 ${
                  plugin.status ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}