"use client"
import { useState } from 'react';
import Text from '@/components/ui/Text';
import MetaTag from '@/components/ui/MetaTag';
import Select from '@/components/ui/Select';
import Content from '@/components/ui/Content';
import Submit from '@/components/ui/Submit';
import Slug from '@/components/ui/Slug';
import Media from '@/components/ui/media';


const Index: React.FC = () => {
  const [featuredImage, setFeaturedImage] = useState<string[]>([]);
  return (
      <>
        <div className="container p-4">
          <div className="flex flex-col md:flex-row md:gap-4 gap-2">
            <div className="w-full md:w-2/3">
              
            </div>
            <div className="w-full md:w-1/3">
              
            </div>
          </div>
            <div className="flex flex-col md:flex-row md:gap-4 gap-2">
              <div className="w-full md:w-2/3">
                <div>
                  <Text
                    defaultValue=""
                    title="Name"
                    sub="Enter your title"
                  />
                  <Slug
                    defaultValue=""
                    title="Slug"
                    sub="Enter your title"
                  />
                  <Select
                    title="User type"
                    items={['Admin', 'User', 'Staff']}
                  />
                  <Content
                    title="Content"
                    sub="Enter your content"
                  />
                  <MetaTag
                    title=""
                    description=""
                    keywords={[]}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div>
                  <Submit
                    defaultValue="Submit"
                    title="Published"
                    sub="Enter your title"
                  />
                  <Media
                    title="Set Featured image"
                    multiple={false}
                    images={featuredImage}
                    onImagesChange={setFeaturedImage}
                  />
                </div>
              </div>
            </div>
        </div>
      </>
  );
};

export default Index;