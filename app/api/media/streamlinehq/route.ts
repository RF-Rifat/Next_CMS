import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data for StreamlineHQ
    const mockData = {
      images: [
        {
          id: "streamline-1",
          url: "https://img.icons8.com/fluency/96/search.png",
          thumbnail: "https://img.icons8.com/fluency/48/search.png",
          name: "Search icon",
          title: "Search icon",
          category: "interface",
          source: "streamlinehq",
        },
        {
          id: "streamline-2",
          url: "https://img.icons8.com/fluency/96/home.png",
          thumbnail: "https://img.icons8.com/fluency/48/home.png",
          name: "Home icon",
          title: "Home icon",
          category: "interface",
          source: "streamlinehq",
        },
        {
          id: "streamline-3",
          url: "https://img.icons8.com/fluency/96/user.png",
          thumbnail: "https://img.icons8.com/fluency/48/user.png",
          name: "User icon",
          title: "User icon",
          category: "people",
          source: "streamlinehq",
        },
        {
          id: "streamline-4",
          url: "https://img.icons8.com/fluency/96/settings.png",
          thumbnail: "https://img.icons8.com/fluency/48/settings.png",
          name: "Settings icon",
          title: "Settings icon",
          category: "interface",
          source: "streamlinehq",
        },
        {
          id: "streamline-5",
          url: "https://img.icons8.com/fluency/96/heart.png",
          thumbnail: "https://img.icons8.com/fluency/48/heart.png",
          name: "Heart icon",
          title: "Heart icon",
          category: "emotions",
          source: "streamlinehq",
        },
      ],
      total: 75,
      page: 1,
      hasMore: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("StreamlineHQ API error:", error)
    return NextResponse.json(
      {
        images: [],
        total: 0,
        page: 1,
        hasMore: false,
        error: "Failed to fetch images from StreamlineHQ",
      },
      { status: 200 },
    )
  }
}
