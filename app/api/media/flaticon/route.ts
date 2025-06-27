import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data for Flaticon
    const mockData = {
      images: [
        {
          id: "flaticon-1",
          url: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          thumbnail: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
          name: "Search icon",
          title: "Search icon",
          tags: ["search", "icon"],
          source: "flaticon",
        },
        {
          id: "flaticon-2",
          url: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
          thumbnail: "https://cdn-icons-png.flaticon.com/128/1077/1077063.png",
          name: "Home icon",
          title: "Home icon",
          tags: ["home", "icon"],
          source: "flaticon",
        },
        {
          id: "flaticon-3",
          url: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
          thumbnail: "https://cdn-icons-png.flaticon.com/128/1077/1077035.png",
          name: "User icon",
          title: "User icon",
          tags: ["user", "icon"],
          source: "flaticon",
        },
        {
          id: "flaticon-4",
          url: "https://cdn-icons-png.flaticon.com/512/1828/1828833.png",
          thumbnail: "https://cdn-icons-png.flaticon.com/128/1828/1828833.png",
          name: "Settings icon",
          title: "Settings icon",
          tags: ["settings", "icon"],
          source: "flaticon",
        },
        {
          id: "flaticon-5",
          url: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
          thumbnail: "https://cdn-icons-png.flaticon.com/128/1828/1828817.png",
          name: "Heart icon",
          title: "Heart icon",
          tags: ["heart", "icon"],
          source: "flaticon",
        },
      ],
      total: 100,
      page: 1,
      hasMore: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Flaticon API error:", error)
    return NextResponse.json(
      {
        images: [],
        total: 0,
        page: 1,
        hasMore: false,
        error: "Failed to fetch images from Flaticon",
      },
      { status: 200 },
    )
  }
}
