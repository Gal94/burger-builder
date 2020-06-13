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

//fetch the orders
export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      let response = await axios.get('/orders.json');
      //convert the response into an array [{ingredients: quantity}]
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (e) {
      dispatch(fetchOrdersFailed(e));
    }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

//if getting the orders was a success
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};
