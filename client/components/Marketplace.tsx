import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { theme } from "../themes";
import { AppBar, Button, Typography, Dialog, TextField } from "@mui/material";
import type { RootState } from "../redux/store";
import { addToCart } from "../redux/slices/storageSlice";
import { useDispatch, useSelector } from "react-redux";

function Marketplace({cartUpdate, toggleCartUpdate}: any) {
  const state = useSelector((state: RootState) => state).storageSlice;
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
            sellerId
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
        console.log("data from frontend:", data);
        setListings(data.data.getAllListings);
      })
      .catch((err) => console.log(err));
  };

  //runs on first render
  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        border: "1px solid black",
        margin: '10px',
        padding: '10px',
        backgroundColor: 'rgba(249,205,173, .5)',
        borderRadius: '5px'
      }}
    >
      {listings.map((el: any, i: number) => (
        <ListingDisplay
          cartUpdate={cartUpdate} 
          toggleCartUpdate={toggleCartUpdate}
          itemName={el.itemName}
          itemDesc={el.itemDesc}
          itemPrice={el.itemPrice}
          itemPic={el.itemPic}
          tags={el.tags}
          id={el.id}
          purchased={el.purchased}
          sellerId={el.sellerId}
          key={i}
        />
      ))}
    </div>
  );
}

const ListingDisplay = ({
  itemName,
  itemDesc,
  itemPrice,
  itemPic,
  tags,
  id,
  purchased,
  sellerId,
  cartUpdate,
  toggleCartUpdate
}: ListingDisplayProps) => {

  const [add2cart, toggleAdd2cart] = useState<boolean>(false)
  const state = useSelector((state: RootState) => state.storageSlice);
  const dispatch = useDispatch();

  const handleClick = () => {
    
    const listing = {
      itemName,
      itemDesc,
      itemPrice,
      itemPic,
      tags,
      id,
      purchased,
      sellerId
    };

    dispatch(addToCart(listing));
    
    const variables = {
      username: state.username,
      listing: listing,
    };

    

    const query = `mutation addToCart($username: String!, $listing: ListingType) {
                      addToCart(username: $username, listing: $listing) {
                        id
                        buyerId
                        items {
                          itemName
                          itemDesc
                          itemPrice
                          itemPic
                          tags
                          purchased
                        }
                      }
                    }`;

    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: variables
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
        console.log("data: ", data)
        console.log("response from addToCart: ", data.data.addToCart);
        const cart = data.data.addToCart;
        
        // dispatch(addToCart(cart))
        toggleCartUpdate(cartUpdate + 1)
      })
      .catch((err) => console.log(err));
  };




  return (
    <div
      style={{
        border: "1px solid red",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
        height: "450px",
        padding: "12px",
      }}
    >
      <ItemNameDiv><h2>{itemName}</h2></ItemNameDiv>
      <div style={{ height: "200px" }}>
        <img
          src={itemPic}
          style={{ height: "100%", width: "100%" }}
          alt={itemName}
        />
      </div>
      <ItemDescriptionDiv>
        <span>{itemDesc}</span>
      </ItemDescriptionDiv>
      <p>${itemPrice}</p>
      {/* {!add2cart ? <button onClick={() => addToCart()}>Add to Cart</button> : <button>Added To Cart!</button>} */}
      <Button variant="contained" color="secondary" sx={{border: 1}} onClick={handleClick}> Add to Cart</Button>
    </div>
  );
};

interface ListingDisplayProps {
  itemName: string;
  itemDesc: string;
  itemPrice: number | string;
  itemPic: string;
  tags?: [string?];
  id: number | string;
  purchased: boolean;
  sellerId: string;
  cartUpdate: any,
  toggleCartUpdate: Dispatch<SetStateAction<number>>;
}

const ItemDescriptionDiv = styled("div")(({ theme: any }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0.55, 1.75),
  border: "1px solid black",
  width: "90%",
  maxHeight: '50px',
  minHeight: '50px',
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  borderRadius: "5px",
  fontSmooth: "always",
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
}));


const ItemNameDiv = styled("div")(({ theme: any }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0.55, 1.75),
  border: "1px solid white",
  width: "90%",
  margin: '5px',
  maxHeight: '35px',
  minHeight: '35px',
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  borderRadius: "5px",
  alignItems: 'center',
  fontSmooth: "always",
  boxShadow:
    "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
}));

export default Marketplace;
