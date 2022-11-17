import React, {useState} from 'react'
import {TextField, Button} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [searchInput, setSearch] = useState<string>('')

  return (
    <div style={{marginBottom: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <TextField size="small" sx={{height:"35px",width: '80%'}}onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Search...">
        </TextField>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1, padding: '3px'}}><SearchIcon/></Button>
    </div>
  )
}

export default Search