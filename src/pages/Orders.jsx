import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/orderSlice';
import { formatPrice } from '../utils/helpers';
import { ORDER_STATUS } from '../utils/constants';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }
    dispatch(fetchOrders());
  }, [dispatch, isAuthenticated, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-8">Start shopping to create your first order!</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {ORDER_STATUS[order.status]}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="text-gray-900 font-medium hover:text-primary-600"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Footer */}
            <div className="bg-gray-50 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shipping Address */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Shipping Address
                  </h4>
                  <address className="text-sm text-gray-600 not-italic">
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                    <br />
                    PIN: {order.shippingAddress.pincode}
                    <br />
                    Phone: {order.shippingAddress.phone}
                  </address>
                </div>

                {/* Order Summary */}
                <div className="sm:text-right">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Order Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between sm:justify-end sm:space-x-4">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">
                        {formatPrice(order.totalAmount - 50)}
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-end sm:space-x-4">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="text-gray-900">{formatPrice(50)}</span>
                    </div>
                    <div className="flex justify-between sm:justify-end sm:space-x-4 font-medium">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
