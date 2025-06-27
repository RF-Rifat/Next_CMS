"use client"

import { useState } from "react"
import Icons from "@/components/Icons";

export default function Home() {
  const [featuredIcon, setFeaturedIcon] = useState<string[]>([])
  return (
    <>
      <Icons
        title="Set Featured Icon"
        multiple={false}
        icons={featuredIcon}
        onIconsChange={setFeaturedIcon}
      />
    </>
  );
}