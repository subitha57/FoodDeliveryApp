import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContextProvider';
import {useNavigate} from 'react-router-dom';


const Cart = () => {

  const navigate = useNavigate()

const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);

console.log("cartItems:", cartItems);

  return (
    <div className="cart">
     <div className="cart-items">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {food_list.map((item,index)=>{
        console.log("Processing item:", item);
        if(cartItems[item._id]>0)
               { 
                console.log("Rendering item:", item); 
                   return(
            <div key={item._id}>
            <div className='cart-items-title cart-items-item'>
              <img src={item.image} alt=""/>
              <p>{item.name}</p>
              <p>Rs.{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>Rs.{item.price*cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
             
              </div>
              <hr/>
              </div>
          )
        }
        return null;
      })}

     </div>
    <div className='cart-bottom'>
      <div className="cart-total">
        <h2>Cart Total</h2>
        <div>
          <div className='cart-total-details'>
            <p>SubTotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>Rs.{getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <b>Total</b>
            <b>Rs.{getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button onClick={()=>navigate('/PlaceOrder')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If ypu have a promo code,Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Cart
