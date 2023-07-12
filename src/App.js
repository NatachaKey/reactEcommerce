import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Login,
  Register,
  Logout,
  Orders,
  Reviews,
} from './pages';

function App() {
  return (
    <Router>
      <Navbar />

      <Sidebar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/products/:id" children={<SingleProduct />} />
        {/*  children prop provides ability to render dynamic components based on the matched route and provides access to any route parameters (such as id) within the <SingleProduct/> component */}

        <Route exact path="/orders">
          <Orders />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

//example of creating styled components
//import styled from 'styled-components'; // create reusable styled components with encapsulated styles

// const Button = styled.button`
//   background: green;
//   color: white;
// `;

// const Container = styled.div`
//   background: red;
//   color: white;
//   .hero { //style encapsulated
//     font-size: 8rem;
//   }
// `;

// const Container2 = styled.div`
//   background: red;
//   color: white;
//   .hero { //style encapsulated
//     font-size: 1rem;
//   }
// `;
// function App() {
//   return (
//     <div>
//       <h4>comfy sloth starter</h4>
//       <Button>Click me</Button>
//       <Container>
//         <div>
//           <h3>Hello world</h3>
//         </div>
//         <div className="hero">hero text</div>
//       </Container>
//       <Container2>
//         <div>
//           <h3>Hello world</h3>
//         </div>
//         <div className="hero">hero text</div>
//       </Container2>
//     </div>
//   );
// }
