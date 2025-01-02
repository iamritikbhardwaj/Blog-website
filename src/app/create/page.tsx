import { Box, Button, TextField } from '@mui/material'
import React from 'react'

function page() {

  return (
    <div className='p-10 bg-slate-300'>
        <Box sx={{bgcolor: "inherit"}}>
        <TextField
        sx={{mb: 5, color: "white"}}
        variant='outlined'
        label="Title"
        fullWidth
        />
        <Button variant='outlined' sx={{color: "black"}}>Create</Button>
    </Box>
    </div>
  )
}

export default page