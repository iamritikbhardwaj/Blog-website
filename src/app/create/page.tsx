'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Button, TextField, Toolbar, IconButton } from '@mui/material'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { Blog } from '../page'
import { useRouter } from 'next/navigation'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import HighlightIcon from '@mui/icons-material/Highlight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link'
import { useState, useEffect } from 'react'

const PRESET_BLOG_IMAGES = [
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',  // tech setup
  'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg',  // mountain landscape
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',  // business meeting
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'   // creative office
];

const PRESET_AVATARS = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',     // professional man
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',     // professional woman
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',   // casual man
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'      // casual woman
];

function Page() {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Blog>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'image') {
        setImagePreview(url);
        setValue('image', url);
      } else {
        setAvatarPreview(url);
        setValue('author.avatar', url);
      }
    }
  };

  const handlePresetImage = (url: string, type: 'image' | 'avatar') => {
    if (type === 'image') {
      setImagePreview(url);
      setValue('image', url);
    } else {
      setAvatarPreview(url);
      setValue('author.avatar', url);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Italic,
      Bold
    ],
    content: "Write your blog content here...",
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-2 bg-white rounded-lg'
      }
    },
    onUpdate: ({ editor }) => {
      setValue('description', editor.getText());
    }
  });

  const onSubmit: SubmitHandler<Blog> = async (data) => {
    if (!editor?.getHTML().trim()) {
      return;
    }
    
    console.log('Form submission data:', {
      title: data.title,
      image: data.image,
      author: data.author,
      description: editor.getHTML(),
      rawText: editor.getText()
    });

    return;
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          description: editor?.getHTML() || '',
          author: {
            name: data.author?.name || 'Anonymous',
            avatar: data.author?.avatar || "https://source.unsplash.com/random/100x100/?portrait"
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to post blog');
      
      router.push('/');
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [imagePreview, avatarPreview]);

  return (
    <div className="bg-slate-100">
      <div className="flex justify-between items-center px-10 py-4">
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
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='px-5 py-2 overflow-hidden'>
        <TextField
          {...register('title', { required: 'Title is required' })}
          label="Title"
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          {...register('subtitle')}
          label="Subtitle"
          placeholder="A brief description of your blog"
          fullWidth
          margin="normal"
        />

        <TextField
          {...register('category')}
          label="Category"
          placeholder="e.g. Technology, Travel, Business"
          fullWidth
          margin="normal"
        />

        <TextField
          {...register('tags')}
          label="Tags"
          placeholder="Enter tags separated by commas"
          fullWidth
          margin="normal"
          helperText="e.g. coding, web development, react"
        />

        <TextField
          {...register('readTime')}
          label="Read Time (minutes)"
          type="number"
          placeholder="5"
          fullWidth
          margin="normal"
        />

        <div className="my-4">
          <p className="text-gray-700 mb-2">Choose blog image or upload your own:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {PRESET_BLOG_IMAGES.map((url, index) => (
              <div
                key={index}
                onClick={() => handlePresetImage(url, 'image')}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                  imagePreview === url ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img src={url} alt={`Preset ${index + 1}`} className="w-full h-32 object-cover" />
              </div>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
              className="hidden"
              id="blog-image"
            />
            <label 
              htmlFor="blog-image" 
              className="block mb-2 cursor-pointer bg-white p-4 rounded border border-gray-300 hover:border-blue-500"
            >
              {imagePreview && !PRESET_BLOG_IMAGES.includes(imagePreview) ? (
                <img src={imagePreview} alt="Blog preview" className="max-h-48 mx-auto" />
              ) : (
                <div className="text-center text-gray-500">
                  Click to upload custom blog image
                </div>
              )}
            </label>
          </div>
        </div>

        <TextField
          {...register('author.name')}
          label="Author Name"
          placeholder="Anonymous"
          fullWidth
          margin="normal"
        />

        <div className="my-4">
          <p className="text-gray-700 mb-2">Choose avatar or upload your own:</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-4">
            {PRESET_AVATARS.map((url, index) => (
              <div
                key={index}
                onClick={() => handlePresetImage(url, 'avatar')}
                className={`cursor-pointer rounded-full overflow-hidden border-2 ${
                  avatarPreview === url ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img src={url} alt={`Avatar ${index + 1}`} className="w-16 h-16 object-cover" />
              </div>
            ))}
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'avatar')}
              className="hidden"
              id="author-avatar"
            />
            <label 
              htmlFor="author-avatar" 
              className="block mb-2 cursor-pointer bg-white p-4 rounded border border-gray-300 hover:border-blue-500"
            >
              {avatarPreview && !PRESET_AVATARS.includes(avatarPreview) ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-24 h-24 mx-auto rounded-full object-cover" />
              ) : (
                <div className="text-center text-gray-500">
                  Click to upload custom avatar
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Editor Toolbar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0}}>
          <Toolbar>
            <IconButton onClick={() => editor?.chain().focus().toggleBold().run()} sx={{ color: 'black' }}>
              <FormatBoldIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleItalic().run()} sx={{ color: 'black' }}>
              <FormatItalicIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleUnderline().run()} sx={{ color: 'black' }}>
              <FormatUnderlinedIcon />
            </IconButton>
            <IconButton onClick={() => editor?.chain().focus().toggleHighlight().run()} sx={{ color: 'black' }}>
              <HighlightIcon />
            </IconButton>
          </Toolbar>
        </Box>

        {/* Blog Content Editor */}
        <EditorContent editor={editor} />
        {errors.description && <p className='text-red-500'>{errors.description?.message}</p>}

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Publish Blog
        </Button>
      </form>
    </div>
  );
}

export default Page;
