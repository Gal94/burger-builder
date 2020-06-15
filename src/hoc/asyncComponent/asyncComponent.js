import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    async componentDidMount() {
        //same as import <cmp> from '...'
      let cmp = importComponent();
        //loads component on the state
      this.setState({ component: cmp.default });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
