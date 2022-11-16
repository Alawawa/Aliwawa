import React, {useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';


function Marketplace() {
  const [listings, setListings] = useState<any>([]);
  
  const getAllListings = () => {
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        query: `query {
          getAllListings {
            id
            itemName
            itemPrice
            itemDesc
            itemPic
            tags
            purchased
            seller {
              username
              email
            }
          }
        }`,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data from frontend:", data)
        setListings(data.data.getAllListings)
      })
      .catch((err) => console.log(err));
  }

  //runs on first render
  useEffect(() => {
    getAllListings();
  }, [])

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', border: '2px solid blue'}}>
      {listings.map((el: any, i: number) => <ListingDisplay itemName={el.itemName} itemDesc={el.itemDesc} itemPrice={el.itemPrice} itemPic={el.itemPic} sellerName={el.seller.username} key={i} />)}
    </div>
  )
}

const ListingDisplay = ({itemName, itemDesc, itemPrice, itemPic, sellerName}: ListingDisplayProps) => {
  return (
    <div style={{border: '1px solid red', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', height: '350px'}}>
      <h2>{itemName}</h2>
      <div style={{height: '200px'}}>
        <img src={itemPic} style={{height: '100%', width: '100%'}} alt={itemName} />
      </div>
      <div style={{border: '1px solid black', width: '90%', display: 'flex', justifyContent: 'center'}}>
        <span>{itemDesc}</span>
      </div>
      <p>${itemPrice}</p>   
    </div>
  )
}

interface ListingDisplayProps {
  itemName: string,
  itemDesc: string,
  itemPrice: number | string,
  itemPic: string,
  sellerName: string
}


// const StyledDiv = styled('div')(({ theme: any}) => ({
//   ...theme.typography.button,
//   backgroundColor: theme.palette.background.paper,
//   padding: theme.spacing(0.55, 1.75),
//   border: '1px solid black',
//   borderRadius: '5px',
//   fontSmooth: 'always',
//   cursor: 'pointer',
//   boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
// }));


export default Marketplace