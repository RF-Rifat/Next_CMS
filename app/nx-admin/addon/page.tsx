import React from 'react';
import type { Metadata } from 'next'
import Plugins from './Plugins';

export const metadata: Metadata = {
  title: 'Post - Services',
  description: '',
}

const dummyPlugins = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  image: `https://placehold.co/300x200?text=Addon+${i + 1}`,
  name: `Addon ${i + 1}`,
  description: `This is the description for Addon ${i + 1}.`,
  version: `1.${i}`,
  author: `Author ${i + 1}`,
  status: i % 2 === 0,
}));

const Index: React.FC = () => {
  return <Plugins item={dummyPlugins} />;
};

export default Index;