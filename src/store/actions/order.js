import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
//action creators

//id of the newly created order from the database
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

//
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//executed when clicking on order
export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post('/orders.json', orderData);
      // console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (e) {
      console.log(e);
      dispatch(purchaseBurgerFailed(e));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
