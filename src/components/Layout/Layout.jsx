import React from 'react';
import classes from './Layout.module.css';

//props.children is the BurgerBuilder component
const Layout = (props) => {
  return (
    <React.Fragment>
      <div>Toolbar, sideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
