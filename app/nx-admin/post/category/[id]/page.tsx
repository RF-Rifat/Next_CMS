"use client"
import { useState } from "react"
import Text from '@/components/ui/Text';
import Submit from '@/components/ui/Submit';
import Select from '@/components/ui/Select';
import Slug from '@/components/ui/Slug';
import Content from '@/components/ui/Content';
import MetaTag from '@/components/ui/MetaTag';
import Media from '@/components/ui/media';


const Index: React.FC = () => {
    const [featuredImage, setFeaturedImage] = useState<string[]>([]);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
  return (
    <>
      <div className='container p-4'>
        <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className='w-full md:w-2/3'>
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
                <Content
                    title="Description"
                    sub="Enter your description"
                />
                <MetaTag
                    title=""
                    description=""
                    keywords={[]}
                />
            </div>
            <div className='w-full md:w-1/3'>
                <Submit
                    defaultValue="Add New Category"
                    title="Published"
                    sub="Enter your title"
                />
                <Media
                    title="Set Featured image"
                    multiple={false}
                    images={featuredImage}
                    onImagesChange={setFeaturedImage}
                />
                <Media
                    title="Set Product gallery"
                    multiple={true}
                    images={galleryImages}
                    onImagesChange={setGalleryImages}
                />
                <Select
                    title="layouts Top"
                    items={['layouts 1', 'layouts 2', 'layouts 3']}
                />
                <Select
                    title="layouts Button"
                    items={['layouts 1', 'layouts 2', 'layouts 3']}
                />
            </div>
        </div>
      </div>
    </>
  );
};

export default Index;