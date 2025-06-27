import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock data for Unsplash
    const mockData = {
      images: [
        {
          id: "unsplash-1",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          name: "Mountain landscape",
          title: "Mountain landscape",
          photographer: "Unsplash User",
          source: "unsplash",
        },
        {
          id: "unsplash-2",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          name: "Forest trees",
          title: "Forest trees",
          photographer: "Unsplash User",
          source: "unsplash",
        },
        {
          id: "unsplash-3",
          url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          name: "Lake reflection",
          title: "Lake reflection",
          photographer: "Unsplash User",
          source: "unsplash",
        },
        {
          id: "unsplash-4",
          url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          name: "Starry night",
          title: "Starry night",
          photographer: "Unsplash User",
          source: "unsplash",
        },
        {
          id: "unsplash-5",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          thumbnail:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          name: "Sunset view",
          title: "Sunset view",
          photographer: "Unsplash User",
          source: "unsplash",
        },
      ],
      total: 30,
      page: 1,
      hasMore: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Unsplash API error:", error)
    return NextResponse.json(
      {
        images: [],
        total: 0,
        page: 1,
        hasMore: false,
        error: "Failed to fetch images from Unsplash",
      },
      { status: 200 },
    )
  }
}
