import React from 'React';
import App from '../client/components/App';
import Body from '../client/components/Body';
import Search from '../client/components/Search';
import Navbar from '../client/components/Navbar';
import Login from '../client/components/Login';
import Register from '../client/components/Register';
import ShoppingCart from '../client/components/ShoppingCart';
import Marketplace from '../client/components/Marketplace';

import { render, screen, waitFor } from '@testing-library/react';

describe('Client Tests', () => {

  let app

  beforeAll(async () => {
    app = await render(
      <App />
    )
  });

  describe('Home page'), () => {
    it('User should be able to log in with their new account', async () => {
      
    })
  }
});