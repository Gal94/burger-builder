import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    try {
      let response = await axios.get(
        'https://burger-project-9a0f3.firebaseio.com/ingredients.json'
      );
      console.log(response);
      this.setState({ ingredients: response.data });
    } catch (e) {
      this.setState({ error: true });
    }
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
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    //copy the old state into a new object
    const updatedIngredients = { ...this.state.ingredients };
    //update the new object
    updatedIngredients[type] = updatedCount;
    //updates price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchase(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.setState({ loading: true });
    //alert(':)');
    //.json is only used in firebase databases
    const order = {
      ingredients: this.state.ingredients,
      //Price usually is being calculated in the back end
      price: this.state.totalPrice,
      customer: {
        name: 'Gal Y',
        address: {
          street: 'My string13',
          zipCode: '74362',
          country: 'Israel',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    try {
      const response = await axios.post('/orders.json', order);
      this.setState({ loading: false, purchasing: false });
      console.log(response);
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, purchasing: false });
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
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

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
            buttonsInfo={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelOrder={this.purchaseCancelHandler}
          continueOrder={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
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

export default WithErrorHandler(BurgerBuilder, axios);
