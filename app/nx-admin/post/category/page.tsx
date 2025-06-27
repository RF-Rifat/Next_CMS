import React from 'react';
import type { Metadata } from 'next'
import Text from '@/components/ui/Text';
import Submit from '@/components/ui/Submit';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Slug from '@/components/ui/Slug';
import CategoriesTable from './categories-table';

export const metadata: Metadata = {
  title: 'Post - Services',
  description: '',
}

const Index: React.FC = () => {
  return (
    <>
      <div className='container p-4'>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <div className='w-full md:w-1/3'>
            <Text
              defaultValue=""
              title="Name"
              sub="The name is how it appears on your site."
            />
            <Slug
              defaultValue="HeRa Khan "
              title="Slug"
              sub="The name is how it appears on your site."
            />
            <Select
              title="Parent Category"
              items={['Walton', 'Xiaomi', 'Tp-Link']}
            />
            <Textarea
              defaultValue=""
              title="Description"
              sub=""
            />
            <Submit
              defaultValue="Add New Category"
              title="Published"
              sub="Enter your title"
            />
          </div>
          <div className='w-full md:w-2/3'>
            <CategoriesTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;