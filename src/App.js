import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutContainer from './containers/Checkout/Checkout';
import Logout from './containers/auth/Logout/Logout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/Auth';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/Checkout" component={CheckoutContainer} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
