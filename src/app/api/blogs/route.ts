import { NextResponse } from 'next/server';
import type { Blog } from '@/app/page';

// This is a mock database. In a real app, you'd use a proper database
let blogs: Blog[] = [];

export async function POST(request: Request) {
  try {
    const blog: Blog = await request.json();
    
    // Add current date
    blog.publishDate = new Date().toISOString();
    
    // Store the blog (in a real app, this would go to a database)
    blogs.push(blog);

    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating blog' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ blogs });
} 