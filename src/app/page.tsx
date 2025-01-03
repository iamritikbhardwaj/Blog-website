import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

export default function Home() {
  const blogs = [
    {
      title: "Blog 1",
      description: "Description 1",
      image: "https://via.placeholder.com/150"
    },
    {
      title: "Blog 2",
      description: "Description 2",
      image: "https://via.placeholder.com/150"
    },
  ]
  return (
   <>
   <div className="w-full h-screen p-10 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white overflow-hidden">
    <div className="flex justify-between">
      <Typography variant='h4'>Blogs</Typography> 
      <IconButton component={Link} href="/create" sx={{color: "white"}}><AddIcon /></IconButton>
</div>
    <div className="w-6/7 h-[70vh] space-y-2 mt-5 p-5 bg-slate-500 overflow-auto">
    {blogs.map((blog, index) => (
      <div key={index} className="bg-slate-200 flex text-slate-800 w-full h-[20vh] overflow-hidden">
        <div><img src={blog.image} className="w-1/3 h-full" /></div>
        <div><Typography variant="h4">{blog.title}</Typography>
        <Typography >{blog.description}</Typography></div>
      </div>
    ))}
    </div>
   </div>
   </>
  );
}
