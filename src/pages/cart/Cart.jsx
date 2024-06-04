import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContextProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ViewPromotions from '../../components/ViewPromotions/ViewPromotions';
import { useTranslation } from 'react-i18next';

const Cart = ({ selectedOrderType }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { cartItems, removeFromCart, getTotalCartAmount, applyOffer } = useContext(StoreContext);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [couponError, setCouponError] = useState('');
    const [showPromotions, setShowPromotions] = useState(false);
    const [discount, setDiscount] = useState(0);

    const handleViewPromotions = () => {
        setShowPromotions(true);
    };

    const applyCoupon = () => {
        // Simulated coupon code validation
        if (couponCode === 'SAVE10') {
            setAppliedCoupon(couponCode);
            setDiscount(10); // Assuming the discount is Rs. 10 for the SAVE10 coupon
            setCouponError('');
        } else {
            setAppliedCoupon('');
            setDiscount(0);
            setCouponError('Invalid coupon code');
        }
    };

    const calculateItemTotal = (item) => {
        return item.price && item.quantity ? item.price * item.quantity : 0;
    };

    const calculateTotalWithDiscount = () => {
        const totalAmount = getTotalCartAmount();
        return totalAmount - discount;
    };

    const handleApplyPromotion = (offer) => {
        // Apply promotion logic here
        const discountAmount = parseFloat(offer.discount.match(/[\d.]+/)[0]);
        setDiscount(discountAmount);
        setShowPromotions(false);
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="selected-order-type">
                    <p>{t("Selected Order Type:")}<span className="order-type">{selectedOrderType}</span></p>
                </div><br /><br />
                <div className="cart-items-title">
                    <p>{t("Items")}</p>
                    <p>{t("Title")}</p>
                    <p>{t("Price")}</p>
                    <p>{t("Quantity")}</p>
                    <p>{t("Total")}</p>
                    <p>{t("Remove")}</p>
                </div>
                <br />
                <hr />
                {Object.keys(cartItems).map((itemId) => {
                    const item = cartItems[itemId];
                    return (
                        <div key={itemId}>
                            <div className='cart-items-title cart-items-item'>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>Rs.{item.price}</p>
                                <p>{item.quantity}</p>
                                <p>Rs.{calculateItemTotal(item)}</p>
                                <p onClick={() => removeFromCart(itemId)} className='cross'>X</p>
                            </div>
                            <hr />
                        </div>
                    );
                })}
            </div>

            <div className='cart-bottom'>
                <div className="cart-total">
                    <h2>{t("Cart Total")}</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>{t("SubTotal")}</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>{t("Discount")}</p>
                            <p>Rs.{discount}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>{t("Delivery Fee")}</p>
                            <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>{t("Total")}</b>
                            <b>Rs.{getTotalCartAmount() === 0 ? 0 : calculateTotalWithDiscount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/PlaceOrder')}>{t("PROCEED TO CHECKOUT")}</button>
                </div>

                <div className="cart-promocode">
                    <div>
                        <div className="terms-and-conditions">
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={
                                        <span>
                                            {t("I agree to the")}{' '}
                                            <Link to="/TermsAndCondition">{t("terms and conditions")}</Link>
                                        </span>
                                    }
                                />
                            </FormGroup>
                        </div>
                        <button onClick={handleViewPromotions}>{t("View Current Promotions")}</button>
                        {showPromotions && <ViewPromotions onClose={() => setShowPromotions(false)} onApplyCoupon={handleApplyPromotion} />}
                        <div className="cart-promocode-input">
                            <input type="text" placeholder={t('Enter coupon code')} value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                            <button onClick={applyCoupon}>{t("Apply")}</button>
                            {couponError && <p className="coupon-error">{couponError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
