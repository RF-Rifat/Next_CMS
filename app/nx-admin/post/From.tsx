"use client"
import { useState } from "react"
import Checkbox from "@/components/ui/Checkbox";
import Content from "@/components/ui/Content";
import Media from "@/components/ui/media";
import MetaTag from "@/components/ui/MetaTag";
import Select from "@/components/ui/Select";
import Slug from "@/components/ui/Slug";
import Submit from "@/components/ui/Submit";
import Text from "@/components/ui/Text";


const From: React.FC = () => {
    const [featuredImage, setFeaturedImage] = useState<string[]>([])
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    return (
        <div className="flex flex-col md:flex-row md:gap-4 gap-2">
            <div className="w-full md:w-2/3">
                <Text
                    defaultValue=""
                    title="Title"
                    sub="Enter your title"
                />
                <Slug
                    defaultValue=""
                    title="Slug"
                    sub="Enter your title"
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
            <div className="w-full md:w-1/3">
                <Submit
                    defaultValue="Submit"
                    title="Published"
                    sub="Enter your title"
                />
                <Checkbox
                    title="Categories"
                    items={[
                    { title: "Category 1", subItems: [{ title: "SubCategory 1.1" }, { title: "SubCategory 1.2" }] },
                    { title: "Category 2", subItems: [{ title: "SubCategory 2.1", checked: true }] },
                    { title: "Category 3", checked: true },
                    { title: "Category 4" }
                    ]}
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
    );
}
export default From;