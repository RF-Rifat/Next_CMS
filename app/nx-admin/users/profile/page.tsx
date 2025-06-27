"use client"
import { useState } from "react"
import Text from '@/components/ui/Text';
import Slug from '@/components/ui/Slug';
import Content from '@/components/ui/Content';
import MetaTag from '@/components/ui/MetaTag';
import Submit from '@/components/ui/Submit';
import Email from '@/components/ui/Email';
import Password from '@/components/ui/Password';
import Media from "@/components/ui/media";

const Index: React.FC = () => {
  const [featuredImage, setFeaturedImage] = useState<string[]>([])
  return (
    <div className="container mx-auto my-2 md:px-6 px-2">
      <Media
        title="Set Featured image"
        multiple={false}
        images={featuredImage}
        onImagesChange={setFeaturedImage}
      />
      <Text
        defaultValue=""
        title="Your name"
        sub="Enter your name"
      />
      <Slug
        defaultValue=""
        title="Slug"
        sub="Enter your Slug"
      />
      <Email
        defaultValue=""
        title="Your email"
        sub="Enter your email"
      />
      <Content
        title="Content"
        sub="Enter your content"
      />
      <Password
        defaultValue=""
        title="Your password"
        sub="Enter your password"
      />
      <MetaTag
        title=""
        description=""
        keywords={[]}
      />
      
      <Submit
        defaultValue="Submit"
        title="Published"
        sub="Enter your Submit"
      />
    </div>
  );
};

export default Index;