const fetch = require('node-fetch');
const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('Server Tests', () => {

  let newUsername;
  let newEmail;
  let newPassword;
  let newUser;

  beforeAll(() => {
    newUsername = randomString();
    newEmail = makeEmail();
    newPassword = randomString();
  })

  const makeID = () => {
    return Math.floor(Math.random() * 100000 + 100);
  }

  const makeEmail = () => {
    return randomString() + 'gmail.com';
  }

  const randomString = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    // Length of username will between 10 to 20 characters
    const length = Math.floor(Math.random() * 10) + 10;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const graphQLPost = async (queryString, params = {}) => {

    return await fetch(APP + "api", {
      method: "POST",
      body: JSON.stringify({
        query: queryString,
        variables: params
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
        //console.log('data resp:', data);
        return data;
      })
      .catch((err) => {
        //console.log('ERROR!', err);
        return err;
      });
  }

  describe('Can access database', () => {
    it('Should be able to access listings from database', async () => {
      const resp = await graphQLPost(`query  {
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
      }`, {})
      // resp.data.getAllListings.forEach((listing) => {
      //   console.log(listing);
      // })
      expect(resp.data.getAllListings.length).toBeGreaterThan(0);
    })

    it('Should be able to access users from database', async () => {
      const resp = await graphQLPost(`query  {
        getAllUsers {
            username
        }
      }`, {})
      expect(resp.data.getAllUsers.length).toBeGreaterThan(0);
    })
  })

  describe('Login tests', () => {

    it('Logging in with invalid credentials', async () => {
      expect(await graphQLPost(`mutation login($password: String!, $email: String!) {
        login(password: $password, email: $email) {
          username
        }
      }`, {email : newEmail, password: newPassword})).toEqual("Invalid credentials");
    })

    it('Response for registering a new user', async () => {
      //const {id, username, email, password, orders, listings} = 
      let data = await graphQLPost(`mutation signup($password: String!, $email: String!, $username: String!) {
        signup(password: $password, email: $email, username: $username) {
          id
          username
          email
          password
          oauth
          orders {
            id
            itemName
            itemDesc
            itemPrice
            itemPic
            tags
            purchased
          }
          listings {
            id
            itemName
            itemDesc
            itemPrice
            itemPic
            tags
            purchased
          }
          cart {
            id
            buyerId
            items {
              id
              itemName
              itemDesc
              itemPrice
              itemPic
              tags
              purchased
            }
          }
        }
      }`, 
      {
        email : newEmail, 
        username: newUsername,
        password: newPassword
      });
      newUser = data.data.signup;
      const {id, username, email, password, oauth, orders, listings, cart} = newUser;

      expect(id).toBeTruthy();
      expect(email).toEqual(newEmail);
      expect(username).toEqual(newUsername);
      expect(password).toEqual(newPassword);
      expect(oauth).toEqual(false);
      expect(listings).toEqual([]);
      expect(orders).toEqual(null);
      expect(cart).toEqual(null);
    })

    it('User should be able to log in with their new account', async () => {
      const resp = await graphQLPost(`mutation login($password: String!, $email: String!) {
        login(password: $password, email: $email) {
          username
        }
      }`, {email : newEmail, password: newPassword});
      expect(resp.data.login['username']).toEqual(newUsername);
    })
  })

  describe('Listings', () => {

    let newListing = {
      itemName : 'Sneakers' + makeID(),
      itemDesc : 'Run fast',
      itemPrice : 1,
      itemPic : 'https://www.shoecarnival.com/mens_skechers_cutback_51286_training_sneakers/92358.html?color=177482&queryID=a2233502141c840774cb6ec9e4fa3ea8&objectID=92358-177482',
      tags: ['jump', 'high']
    }

    it('User should be able to create a listing', async () => {
      const resp = await graphQLPost(`mutation createListing($username: String!, $listing: ListingType!) {
        createListing(username: $username, listing: $listing) {
          itemName
        }
      }`, {username : newUsername, listing: newListing});
      expect(resp.data.createListing.itemName).toEqual(newListing.itemName);
    })

    it('User should not be able to buy their own listing', async () => {
      const resp = await graphQLPost(`mutation addToCart($username: String!, $listing: ListingType!) {
        addToCart(username: $username, listing: $ListingType) {
          cart {
            buyerId
            items {
              itemName
            }
          }
        }
      }`, {username : newUsername, cart: null});
      console.log('adding own item to cart:', resp);
      //expect(resp.data.addToCart.itemName).toEqual(newListing.itemName);
    })
  })
});
