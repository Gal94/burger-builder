import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      let response = await axios.get('/orders.json');
      //convert the response into an array [{}]
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render() {
    let orders;

    this.state.orders.length === 0
      ? (orders = null)
      : (orders = this.state.orders.map((order) => {
          return <Order key={order.id} {...order} />;
        }));

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
