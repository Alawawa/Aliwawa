import React, { useState } from 'react';
import Navbar from "../components/Navbar"
import Body from "../components/Body"
import Marketplace from '../components/Marketplace'
import Search from '../components/Search'

function App() {
  const [cartUpdate,  toggleCartUpdate] = useState<number>(0);
  
  return (
    <div>
      <Navbar cartUpdate={cartUpdate} toggleCartUpdate={toggleCartUpdate} />
      <div style={{marginTop: '70px', display: 'flex', flexDirection: 'column'}}>
        <Search />
        <Marketplace cartUpdate={cartUpdate} toggleCartUpdate={toggleCartUpdate} />
      </div>
    </div>
  )
}

export default App