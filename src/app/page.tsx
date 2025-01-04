'use client'

import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export interface Blog {
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export default function Home() {
  const { handleSubmit } = useForm<Blog>();

  const onSubmit = async (data: Blog) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to post blog');
      }

      // Optionally refresh the page or update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  const blogs: Blog[] = [
    {
      title: "Unlocking the Secrets of Everyday Inspiration",
      description: "<p>In a world buzzing with activity, inspiration often hides in plain sight. This blog delves into the small moments and overlooked details that spark creativity and drive innovation. From morning rituals to unexpected encounters, discover how to find meaning and motivation in the everyday. Perfect for readers eager to see life through a fresh lens, this piece invites you to embrace curiosity and unlock the extraordinary in the ordinary.</p>",
      image: "https://images.unsplash.com/photo-1732452792160-c28abdcd4b64?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Unlocking the Secrets of Everyday Inspiration",
      description: "<p>In a world buzzing with activity, inspiration often hides in plain sight. This blog delves into the small moments and overlooked details that spark creativity and drive innovation. From morning rituals to unexpected encounters, discover how to find meaning and motivation in the everyday. Perfect for readers eager to see life through a fresh lens, this piece invites you to embrace curiosity and unlock the extraordinary in the ordinary.</p>",
      image: "https://images.unsplash.com/photo-1732996909404-970b4cc8d85a?q=80&w=2556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Unlocking the Secrets of Everyday Inspiration",
      description: "<p>In a world buzzing with activity, inspiration often hides in plain sight. This blog delves into the small moments and overlooked details that spark creativity and drive innovation. From morning rituals to unexpected encounters, discover how to find meaning and motivation in the everyday. Perfect for readers eager to see life through a fresh lens, this piece invites you to embrace curiosity and unlock the extraordinary in the ordinary.</p>",
      image: "https://images.unsplash.com/photo-1727201233565-9cc29c58450b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  return (
    <>
      <div className="w-full h-screen px-10 py-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-100 dark:to-slate-200 text-slate-900 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <Typography 
            variant='h4'
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Blogs
          </Typography>
          <IconButton 
            component={Link} 
            href="/create"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 p-3 rounded-full"
          >
            <AddIcon className="text-purpel-300" />
          </IconButton>
        </div>

        <div className="w-6/7 h-[80vh] space-y-6 mt-5 p-5 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-auto scrollbar-hide">
          {blogs.map((blog, index) => (
            <Link 
              key={index}
              href={`/veiw?id=${index}`}
              className="flex justify-between text-slate-900 w-full h-[22vh] bg-white p-4 rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer hover:bg-blue-50"
            >
              <div className="w-1/2 overflow-hidden rounded-lg">
                <Image 
                  src={blog.image} 
                  alt={blog.title}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="ml-5 flex flex-col justify-between w-1/2">
                <div className="overflow-auto scrollbar-hide">
                  <Typography 
                    variant="h4" 
                    className="font-semibold mb-2 hover:text-blue-600 transition-colors duration-300"
                  >
                    {blog.title}
                  </Typography>
                  <Typography 
                    className="text-slate-600 line-clamp-3 hover:line-clamp-none transition-all duration-300"
                  >
                    {blog.description}
                  </Typography>
                </div>
                
                {/* Tags Section */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {blog.tags && blog.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author Section */}
                {blog.author && (
                  <div className="flex items-center gap-2 mt-2">
                    <Image 
                      src={blog.author.avatar} 
                      alt={blog.author.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-slate-600">{blog.author.name}</span>
                    {blog.publishDate && (
                      <span className="text-sm text-slate-400">• {new Date(blog.publishDate).toLocaleDateString()}</span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
