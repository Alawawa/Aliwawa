import React from 'react'
import Marketplace from '../components/Marketplace'
import Search from '../components/Search'

function Body() {
  return (
    <div style={{marginTop: '70px', display: 'flex', flexDirection: 'column'}}>
        <Search />
        <Marketplace />
    </div>
  )
}

export default Body