import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data for Pexels
    const mockData = {
      images: [
        {
          id: "pexels-1",
          url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          thumbnail: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400",
          name: "Beautiful landscape",
          title: "Beautiful landscape",
          photographer: "Pexels User",
          source: "pexels",
        },
        {
          id: "pexels-2",
          url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          thumbnail: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=400",
          name: "Forest path",
          title: "Forest path",
          photographer: "Pexels User",
          source: "pexels",
        },
        {
          id: "pexels-3",
          url: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          thumbnail:
            "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400",
          name: "Mountain view",
          title: "Mountain view",
          photographer: "Pexels User",
          source: "pexels",
        },
        {
          id: "pexels-4",
          url: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          thumbnail:
            "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400",
          name: "Ocean waves",
          title: "Ocean waves",
          photographer: "Pexels User",
          source: "pexels",
        },
        {
          id: "pexels-5",
          url: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          thumbnail:
            "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400",
          name: "City skyline",
          title: "City skyline",
          photographer: "Pexels User",
          source: "pexels",
        },
      ],
      total: 50,
      page: 1,
      hasMore: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Pexels API error:", error)
    return NextResponse.json(
      {
        images: [],
        total: 0,
        page: 1,
        hasMore: false,
        error: "Failed to fetch images from Pexels",
      },
      { status: 200 },
    )
  }
}
