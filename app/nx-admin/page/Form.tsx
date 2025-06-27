"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Text from '@/components/ui/Text';
import MetaTag from '@/components/ui/MetaTag';
import Select from '@/components/ui/Select';
import Content from '@/components/ui/Content';
import Submit from '@/components/ui/Submit';
import Slug from '@/components/ui/Slug';
import Media from '@/components/ui/media';

interface PageData {
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  featured_image: string[];
  gallery_images: string[];
  layout_top: string;
  layout_bottom: string;
  status: string;
}

interface FormProps {
  pageId?: string;
  initialData?: PageData;
}

const Form: React.FC<FormProps> = ({ pageId, initialData }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<PageData>({
        title: "",
        slug: "",
        content: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        featured_image: [],
        gallery_images: [],
        layout_top: "",
        layout_bottom: "",
        status: "draft"
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (field: keyof PageData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const url = pageId ? `/api/page/${pageId}` : '/api/page';
            const method = pageId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                router.push('/nx-admin/page');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <>
        <div className="flex flex-col md:flex-row md:gap-4 gap-2">
            <div className="w-full md:w-2/3">
                <Text
                    defaultValue={formData.title}
                    title="Title"
                    sub="Enter your title"
                    onChange={(value) => handleInputChange('title', value)}
                />
                <Slug
                    defaultValue={formData.slug}
                    title="Slug"
                    sub="Enter your slug"
                    onChange={(value) => handleInputChange('slug', value)}
                />
                <Content
                    title="Content"
                    sub="Enter your content"
                    defaultValue={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                />
                <MetaTag
                    title={formData.meta_title}
                    description={formData.meta_description}
                    keywords={formData.meta_keywords}
                    onTitleChange={(value) => handleInputChange('meta_title', value)}
                    onDescriptionChange={(value) => handleInputChange('meta_description', value)}
                    onKeywordsChange={(value) => handleInputChange('meta_keywords', value)}
                />
            </div>
            <div className="w-full md:w-1/3">
                <Submit
                    defaultValue={formData.status}
                    title="Status"
                    sub="Select page status"
                    onChange={(value) => handleInputChange('status', value)}
                    onSubmit={handleSubmit}
                    loading={isLoading}
                />
                <Media
                    title="Set Featured image"
                    multiple={false}
                    images={formData.featured_image}
                    onImagesChange={(value) => handleInputChange('featured_image', value)}
                />
                <Media
                    title="Set Product gallery"
                    multiple={true}
                    images={formData.gallery_images}
                    onImagesChange={(value) => handleInputChange('gallery_images', value)}
                />
                <Select
                    title="Layout Top"
                    items={['Layout 1', 'Layout 2', 'Layout 3']}
                    defaultValue={formData.layout_top}
                    onChange={(value) => handleInputChange('layout_top', value)}
                />
                <Select
                    title="Layout Bottom"
                    items={['Layout 1', 'Layout 2', 'Layout 3']}
                    defaultValue={formData.layout_bottom}
                    onChange={(value) => handleInputChange('layout_bottom', value)}
                />
            </div>
        </div>
    </>
  );
};

export default Form;