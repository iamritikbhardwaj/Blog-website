'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'

function page() {

  const editor = useEditor({
    extensions: [
    StarterKit
    ],
    content: "Welcome blogers 👋, write your content here",
  })
  return (
    <div className='p-10 bg-slate-300'>
        <Box sx={{bgcolor: "inherit"}}>
        <TextField
        sx={{mb: 5, color: "white"}}
        variant='outlined'
        label="Title"
        fullWidth
        />
        <EditorContent editor={editor} />
        <Button variant='outlined' sx={{color: "black"}}>Create</Button>
    </Box>
    </div>
  )
}

export default page