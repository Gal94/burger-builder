import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionsTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  // async componentDidMount() {
  //   try {
  //     let response = await axios.get(
  //       'https://burger-project-9a0f3.firebaseio.com/ingredients.json'
  //     );
  //     console.log(response);
  //     this.setState({ ingredients: response.data });
  //   } catch (e) {
  //     this.setState({ error: true });
  //   }
  // }

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
    this.setState({ purchasable: sum > 0 });
  };

  //Executes when clicking on the backdrop, returns to main screen
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //Executes when clicking the "ORDER NOW" button
  purchaseContinueHandler = async () => {
    //Create the parameters query
    const queryParamas = [];
    for (let i in this.props.ingredients) {
      queryParamas.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParamas.push('price=' + this.props.totalPrice);
    //add & after each element in the array when converting to a string
    const queryString = queryParamas.join('&');

    //Forwards page to /checkout
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
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
    let burger = this.state.error ? (
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
            purchasable={this.state.purchasable}
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

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => {
      dispatch({ type: actionsTypes.ADD_INGREDIENT, ingredient: ingredient });
    },
    removeIngredient: (ingredient) => {
      dispatch({
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredient: ingredient,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
