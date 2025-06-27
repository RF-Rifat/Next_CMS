"use client";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import Media from './media';


interface MetaProps {
  title: string;
  description: string;
  keywords: string[];
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onKeywordsChange?: (value: string[]) => void;
}

const MetaTag: React.FC<MetaProps> = ({ 
  title, 
  description, 
  keywords, 
  onTitleChange, 
  onDescriptionChange, 
  onKeywordsChange 
}) => {
  const [featuredImage, setFeaturedImage] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(keywords);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTags(keywords); // Update tags if keywords prop changes
  }, [keywords]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        onKeywordsChange?.(newTags);
      }
      setInputValue('');
      e.preventDefault();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length) {
      setInputValue(tags[tags.length - 1]);
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onKeywordsChange?.(newTags);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onKeywordsChange?.(newTags);
  };

  return (
    <div className="block space-y-1">
        <h1 className='text-base font-normal w-full'>
            MetaBox
        </h1>
        <div className='w-full bg-white p-2'>
            <div>
                <p>
                    Meta title
                </p>
                <input
                    type="text"
                    defaultValue={title}
                    placeholder="Title 80 characters"
                    className="border p-2 outline-0 border-gray-200 w-full mt-1"
                    onChange={(e) => onTitleChange?.(e.target.value)}
                />
            </div>
            <div>
                <p>
                    Meta description
                </p>
                <textarea
                    defaultValue={description}
                    placeholder="Write AI article 160 characters"
                    className="border p-2 outline-0 border-gray-200 w-full mt-1"
                    onChange={(e) => onDescriptionChange?.(e.target.value)}
                />
            </div>
            <Media
              title="Set Featured image"
              multiple={false}
              images={featuredImage}
              onImagesChange={setFeaturedImage}
            />
            <div>
                <p>
                    Meta keywords
                </p>
                <div className="flex items-center flex-wrap mt-1">
                    {tags.map((tag, index) => (
                    <div key={index} className="flex items-center text-gray-700 border border-gray-200 rounded-full px-3 py-1">
                        <span>{tag}</span>
                        <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => removeTag(index)}
                        >
                        &times;
                        </button>
                    </div>
                    ))}
                    <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a keyword"
                    className="flex-grow border border-gray-200 py-1 px-2 rounded-full outline-none"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default MetaTag;