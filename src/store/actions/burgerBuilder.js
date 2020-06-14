import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
//creates an action to be passed to the reducer
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

//async code
export const initIngredients = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get('/ingredients.json');
      if (response) {
        dispatch(setIngredients(response.data));
      } else {
        dispatch(fetchIngredientsFailed());
      }
    } catch (e) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
