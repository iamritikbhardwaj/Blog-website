'use client'

import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Page() {
  // This would normally come from a database or API
  const blog = {
    title: "Unlocking the Secrets of Everyday Inspiration",
    content: "In a world buzzing with activity, inspiration often hides in plain sight. This blog delves into the small moments and overlooked details that spark creativity and drive innovation. From morning rituals to unexpected encounters, discover how to find meaning and motivation in the everyday. Perfect for readers eager to see life through a fresh lens, this piece invites you to embrace curiosity and unlock the extraordinary in the ordinary.",
    image: "https://images.unsplash.com/photo-1732452792160-c28abdcd4b64?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    publishDate: new Date().toISOString(),
    tags: ["Inspiration", "Creativity", "Life"]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            component={Link}
            href="/"
            variant="outlined"
            sx={{ 
              color: '#1976d2',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            Back to Blogs
          </Button>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative w-full h-[400px] mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <Typography 
            variant="h2" 
            className="text-3xl font-bold mb-4 text-slate-900"
          >
            {blog.title}
          </Typography>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">{blog.author.name}</p>
                <p className="text-sm text-slate-500">
                  {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <Typography className="text-slate-700 leading-relaxed">
            {blog.content}
          </Typography>
        </article>
      </div>
    </div>
  )
}
