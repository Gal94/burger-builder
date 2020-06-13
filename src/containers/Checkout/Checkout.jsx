import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            CheckoutCancelled={this.checkoutCancelledHandler}
            CheckoutContinued={this.checkoutContinuedHandler}
          />
        </div>
      );
    }
    return (
      <div>
        {summary}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   };
// };

export default connect(mapStateToProps)(Checkout);
