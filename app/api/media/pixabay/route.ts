import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data for Pixabay
    const mockData = {
      images: [
        {
          id: "pixabay-1",
          url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          thumbnail: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
          name: "Lone tree",
          title: "Lone tree",
          photographer: "Pixabay User",
          source: "pixabay",
        },
        {
          id: "pixabay-2",
          url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
          thumbnail: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
          name: "Beautiful sunset",
          title: "Beautiful sunset",
          photographer: "Pixabay User",
          source: "pixabay",
        },
        {
          id: "pixabay-3",
          url: "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg",
          thumbnail: "https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_640.jpg",
          name: "Fantasy landscape",
          title: "Fantasy landscape",
          photographer: "Pixabay User",
          source: "pixabay",
        },
        {
          id: "pixabay-4",
          url: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
          thumbnail: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg",
          name: "Night sky",
          title: "Night sky",
          photographer: "Pixabay User",
          source: "pixabay",
        },
        {
          id: "pixabay-5",
          url: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg",
          thumbnail: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg",
          name: "Country road",
          title: "Country road",
          photographer: "Pixabay User",
          source: "pixabay",
        },
      ],
      total: 25,
      page: 1,
      hasMore: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Pixabay API error:", error)
    return NextResponse.json(
      {
        images: [],
        total: 0,
        page: 1,
        hasMore: false,
        error: "Failed to fetch images from Pixabay",
      },
      { status: 200 },
    )
  }
}
