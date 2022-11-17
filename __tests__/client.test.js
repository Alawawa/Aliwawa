// import React from 'React';
// import { render, screen, waitFor } from '@testing-library/react';

// import App from '../client/components/App';
// import Body from '../client/components/Body';
// import Search from '../client/components/Search';
// import Navbar from '../client/components/Navbar';
// import Login from '../client/components/Login';
// import Register from '../client/components/Register';
// import ShoppingCart from '../client/components/ShoppingCart';
// import Marketplace from '../client/components/Marketplace';

// describe('Client Tests', () => {

//   let app;

//   beforeAll(async () => {
//     // app = await render(
//     //   <App />
//     // )
//   });

//   const graphQLPost = async (queryString, params = {}) => {

//     return await fetch(APP + "api", {
//       method: "POST",
//       body: JSON.stringify({
//         query: queryString,
//         variables: params
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         //console.log('data resp:', data);
//         return data;
//       })
//       .catch((err) => {
//         //console.log('ERROR!', err);
//         return err;
//       });
//   }  

//   describe('Home page'), () => {
//     it('Confirm each database entry is being displayed', async () => {
//       const resp = await graphQLPost(`query  {
//         getAllListings {
//           id
//           itemName
//           itemPrice
//           itemDesc
//           itemPic
//           tags
//           purchased
//           seller {
//             username
//             email
//           }
//         }
//       }`, {});
//       let allEntries = resp.data.getAllListings;
//       for(let i = 0; i < allEntries.length; i++) {
//         console.log(screen.getByText(allEntries[i].itemName));
//       }
//     })
//   }
// });