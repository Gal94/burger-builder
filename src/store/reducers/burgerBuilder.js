import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //example of updateObject
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredient]: state.ingredients[action.ingredient] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        building: true,
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        building: state.totalPrice !== 4,
      };
    //when page first loads
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 4,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      console.log('f');
      return {
        ...state,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

// loading: false,
// error: false
