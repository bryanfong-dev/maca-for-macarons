import React from "react";
import { state } from '../state';
import Header from '../components/Header';
import Body from '../components/Body';
import Product from '../components/Product';
import Footer from '../components/Footer';
import CartContainer from './CartContainer';
import Images from '../Images';


class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.openCart = this.openCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  openCart() {
    this.setState({ cartView: true })
  }

  closeCart() {
    this.setState({ cartView: false })
  }

  addToCart(key) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.cart[key] += 1;
    this.setState(newState);
  }

  removeFromCart(key) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.cart[key] -= 1;
    this.setState(newState);
  }


  render() {
    const { cart, items, cartView } = this.state;
    const products = [];
    for (let i = 0; i < this.state.items.length; i++) {
      const { name, price, type, text } = this.state.items[i]
      products.push(<Product
        key={i}
        i={i}
        name={name}
        price={price}
        type={type}
        text={text}
        img={Images[i]}
        addToCart={this.addToCart}
      />);
    }

    return (
      <div>
        <Header openCart={this.openCart} />
        <Body products={products} />
        <Footer />
        {cartView && <CartContainer
          images={Images} cart={cart} items={items}
          removeFromCart={this.removeFromCart} closeCart={this.closeCart} />}
      </div >
    )
  }
}

export default MainContainer;