"use client";
import React, { useState, useEffect } from "react";

interface SlugProps {
  defaultValue: string;
  title: string;
  sub: string;
  onChange?: (value: string) => void;
}

const Slug: React.FC<SlugProps> = ({ defaultValue, title, sub, onChange }) => {
  const [slug, setSlug] = useState<string>(generateSlug(defaultValue));

  useEffect(() => {
    setSlug(generateSlug(defaultValue));
  }, [defaultValue]);

  function generateSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/\s+/g, "-") // স্পেস প্রেস করলে "-" বসাবে
      .replace(/,+/g, "-") // কমা থাকলে "-" বসাবে
      .replace(/[^a-z0-9-]/g, "") // শুধুমাত্র a-z, 0-9, এবং "-" থাকবে
      .replace(/-+/g, "-") // একাধিক "-" থাকলে একটিতে পরিণত করবে
      .replace(/^-+|-+$/g, ""); // শুরু বা শেষে "-" থাকলে রিমুভ করবে
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedSlug = generateSlug(inputValue);
    setSlug(formattedSlug);
    onChange?.(formattedSlug);
  };

  return (
    <div className="block space-y-1">
      <h1 className="text-base font-normal w-full">{title}</h1>
      <input
        type="text"
        className="p-2 outline-0 w-full rounded bg-white"
        value={slug}
        onChange={handleChange}
        placeholder={sub}
      />
    </div>
  );
};

export default Slug;