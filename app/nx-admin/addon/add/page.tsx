'use client';

import React, { useState } from 'react';

type Plugin = {
  id: number;
  image: string;
  name: string;
  description: string;
  version: string;
  author: string;
  installed: boolean;
};

const dummyPlugins: Plugin[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  image: `https://placehold.co/300x200?text=Addon+${i + 1}`,
  name: `Addon ${i + 1}`,
  description: `Installable plugin for Addon number ${i + 1}.`,
  version: `1.${i}`,
  author: `Author ${i + 1}`,
  installed: false,
}));

export default function PluginAddPage() {
  const [plugins, setPlugins] = useState(dummyPlugins);

  const handleInstall = (id: number) => {
    setPlugins(prev =>
      prev.map(plugin =>
        plugin.id === id ? { ...plugin, installed: true } : plugin
      )
    );
  };

  const installedPlugins = plugins.filter(p => p.installed);

  const reDisplay = () => {
    alert(`Re-displaying: ${installedPlugins.map(p => p.name).join(', ')}`);
  };

  return (
    <div className="p-4 space-y-4">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Addon Management</h1>
        {installedPlugins.length > 0 && (
          <button
            onClick={reDisplay}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Re-Display ({installedPlugins.length})
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {plugins.map(plugin => (
          <div
            key={plugin.id}
            className="bg-white rounded-2xl shadow-md border p-4 space-y-2 relative"
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

            <div className="mt-2">
              {plugin.installed ? (
                <span className="inline-block text-green-600 font-medium text-sm">
                  ✅ Installed
                </span>
              ) : (
                <button
                  onClick={() => handleInstall(plugin.id)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Install
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}