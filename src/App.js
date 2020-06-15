import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutContainer from './containers/Checkout/Checkout';
import Logout from './containers/auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* If no route matches above redirect home */}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/Checkout" component={CheckoutContainer} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

//App won't recieve Routes because it's wrapped with connect
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
