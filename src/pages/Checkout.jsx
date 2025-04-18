import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading: cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading: orderLoading, error: orderError } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
    },
    paymentMethod: 'razorpay',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    // Only fetch cart if we don't have items
    if (!items || items.length === 0) {
      dispatch(fetchCart());
      return;
    }
    
    // If we have items but they're empty, go back to cart
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [dispatch, isAuthenticated, navigate, items?.length]);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
    }
  }, [orderError]);

  const validateForm = () => {
    const errors = {};
    const { shippingAddress } = formData;

    if (!shippingAddress.street.trim()) {
      errors.street = 'Street address is required';
    }
    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
    }
    if (!shippingAddress.state.trim()) {
      errors.state = 'State is required';
    }
    if (!shippingAddress.pincode.trim()) {
      errors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      errors.pincode = 'Invalid PIN code';
    }
    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(shippingAddress.phone)) {
      errors.phone = 'Invalid phone number';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          seller: item.product.seller // Include the seller ID from the product
        })),
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        totalAmount: calculateTotal() + 50, // Including delivery fee
      };
      
      try {
        const result = await dispatch(createOrder(orderData)).unwrap();
        toast.success('Order placed successfully!');
        // Redirect to order details page
        navigate(`/orders`);
      } catch (err) {
        toast.error(err.message || 'Failed to place order');
      }
    } else {
      setFormErrors(errors);
    }
  };

  if (cartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.shippingAddress.street}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                    formErrors.street ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formErrors.street && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.shippingAddress.city}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      formErrors.city ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.shippingAddress.state}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      formErrors.state ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.state && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.shippingAddress.pincode}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      formErrors.pincode ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.pincode && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.pincode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.shippingAddress.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900">{formatPrice(50)}</span>
                    </div>
                    <div className="flex justify-between mt-4 text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal() + 50)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={orderLoading}
                className={`w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  orderLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {orderLoading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
