import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  //Checks the amount of ingredients to see if the burger is purchasable or not
  updatePurchase = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };
    //Create an array of the keys and map through it
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      //reduce the new array into the total amount of ingredients
      .reduce((newSum, currentEl) => {
        return currentEl + newSum;
      }, 0);
    return sum > 0;
  };

  //Executes when clicking on the backdrop, returns to main screen
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //Executes when clicking the "ORDER NOW" button
  purchaseContinueHandler = async () => {
    this.props.onInitPurchased();
    //Forwards page to /checkout
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    //Condition to see if received ingredients data from the database or if there are errors
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            purchasable={this.updatePurchase(this.props.ingredients)}
            purchasing={this.purchaseHandler}
            buttonsInfo={disabledInfo}
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => {
      dispatch(actions.addIngredient(ingredient));
    },
    removeIngredient: (ingredient) => {
      dispatch(actions.removeIngredient(ingredient));
    },
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
