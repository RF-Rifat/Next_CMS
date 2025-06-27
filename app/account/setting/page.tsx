'use client';
import React from 'react';
import { useState } from 'react';
import Text from '@/components/ui/Text';
import Submit from '@/components/ui/Submit';
import Select from '@/components/ui/Select';
import Email from '@/components/ui/Email';
import Number from '@/components/ui/Number';
import Password from '@/components/ui/Password';
import Textarea from '@/components/ui/Textarea';
import Media from '@/components/ui/media';

const Index: React.FC = () => {
  const [featuredImage, setFeaturedImage] = React.useState<string[]>([]);
  return (
    <>
      <Text
        defaultValue=""
        title="Your name"
        sub="Enter your name"
      />
      <Media
        title="Set Featured image"
        multiple={false}
        images={featuredImage}
        onImagesChange={setFeaturedImage}
      />
      <Email
        defaultValue=""
        title="Your email"
        sub="Enter your email"
      />
      <Number
        defaultValue=""
        title="Your number"
        sub="Enter your number"
      />
      <Textarea
        defaultValue=""
        title="Your Addresses"
        sub="Enter your addresses"
      />
      <Select
        title="Gender"
        items={['female', 'male']}
      />
      <Password
        defaultValue=""
        title="New password"
        sub="Enter your password"
      />
      <Submit
        defaultValue="Submit"
        title="Published"
        sub="Enter your title"
      />
    </>
  );
};

export default Index;