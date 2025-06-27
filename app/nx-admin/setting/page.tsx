"use client"
import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import Toggle from '@/components/admin/Toggle';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Text from '@/components/ui/Text';
import Color from '@/components/ui/Color';
import Submit from '@/components/ui/Submit';
import Media from '@/components/ui/media';

const Index: React.FC = () => {
  const [featuredImage, setFeaturedImage] = useState<string[]>([])
  return (
    <div className='container mx-auto my-4 md:px-6 px-2'>
      <div className='bg-blue-500 text-white p-2 flex items-center justify-between mb-2 '>
        <h1 className='text-xl md:text-2xl font-semibold'>Script option</h1>
        <button type='button' className='bg-black py-2 px-4 uppercase font-semibold leading-none'>submit</button>
      </div>
      <Tabs
        tabs={[
          {
            id: "1",
            label: "Logo",
            content: (
              <>
                <Toggle title="hello" Switch={true}>
                  <div>This is some hidden information!</div>
                </Toggle>
              </>
            ),
          },
          {
            id: "2",
            label: "Header",
            content: (
              <div>
                <Toggle title="Header Banner" Switch={true}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Media
                      title="Set Featured image"
                      multiple={false}
                      images={featuredImage}
                      onImagesChange={setFeaturedImage}
                    />
                    <Media
                      title="Set Featured image"
                      multiple={false}
                      images={featuredImage}
                      onImagesChange={setFeaturedImage}
                    />
                  </div>
                </Toggle>

                <Toggle title="Header Top" Switch={true}>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <Select
                      title="Top menu left"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Top menu lefts"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Top menu right"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Top menu right"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                  </div>
                </Toggle>

                <Toggle title="Header Logo" Switch={true}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Media
                      title="Set Featured image"
                      multiple={false}
                      images={featuredImage}
                      onImagesChange={setFeaturedImage}
                    />
                    <Media
                      title="Set Featured image"
                      multiple={false}
                      images={featuredImage}
                      onImagesChange={setFeaturedImage}
                    />
                  </div>
                </Toggle>

                <Toggle title="Header Nev" Switch={true}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Select
                      title="Nev left"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Nev right"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                  </div>
                </Toggle>
              </div>
            ),
          },
          {
            id: "3",
            label: "Footer",
            content: (
              <div>
                <Toggle title="Color" Switch={true}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Color
                      defaultValue="#ffffff"
                      title="Background color"
                      sub="Enter your color code"
                    />
                    <Color
                      defaultValue=""
                      title="Text color"
                      sub="Enter your color code"
                    />
                  </div>
                </Toggle>

                <Toggle title="Footer Nev" Switch={true}>
                  <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
                    <Select
                      title="Footer Nev 1"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Footer Nev 2"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Footer Nev 3"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Footer Nev 4"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Footer Nev 5"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                    <Select
                      title="Footer Nev 6"
                      items={['Walton', 'Xiaomi', 'Tp-Link']}
                    />
                  </div>
                </Toggle>

                <Toggle title="Footer Logo" Switch={true}>
                  <div className='grid grid-cols-2 gap-4'>
                    <Media
                      title="Set Featured image"
                      multiple={false}
                      images={featuredImage}
                      onImagesChange={setFeaturedImage}
                    />
                    <Textarea
                      defaultValue=""
                      title="About us"
                      sub="About us"
                    />
                  </div>
                </Toggle>

                <Toggle title="Copyrighted" Switch={true}>
                  <Text
                    defaultValue=""
                    title="Copyrighted"
                    sub="Enter your copyrighted"
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <Color
                      defaultValue="#000000"
                      title="Background color"
                      sub="Enter your color code"
                    />
                    <Color
                      defaultValue="#ffffff"
                      title="Text color"
                      sub="Enter your color code"
                    />
                  </div>
                </Toggle>
              </div>
            ),
          },
          {
            id: "4",
            label: "Input and Export",
            content: (
              <>
                <Toggle title="Input" Switch={true}>
                  <Textarea
                    defaultValue=""
                    title="Input data"
                    sub="Input your json data"
                  />
                  <Submit
                    defaultValue="Submit"
                    title="Input data"
                    sub="Enter your title"
                  />
                </Toggle>
                <Toggle title="Export" Switch={true}>
                  <Submit
                    defaultValue="Export"
                    title="Export data"
                    sub="Enter your title"
                  />
                </Toggle>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Index;