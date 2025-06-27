"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Form from '../Form'

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

export default function EditPage() {
  const params = useParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchPageData(params.id as string);
    }
  }, [params.id]);

  const fetchPageData = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/page/${id}`);
      const result = await response.json();

      if (result.success) {
        setPageData(result.data);
      } else {
        setError(result.error || 'Failed to fetch page data');
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      setError('Failed to fetch page data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='container p-4'>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading page data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container p-4'>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className='container p-4'>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Page not found</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='container p-4'>
        <Form pageId={params.id as string} initialData={pageData} />
      </div>
    </>
  );
}
