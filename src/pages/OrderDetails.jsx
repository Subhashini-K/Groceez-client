import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import { getOrderById } from '../store/slices/orderSlice';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (loading || !order) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Details
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Typography>Order ID: {order._id}</Typography>
            <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>
            <Typography>Total Amount: ₹{order.totalAmount}</Typography>
            <Box mt={2}>
              <Chip
                label={order.status.toUpperCase()}
                color={getStatusColor(order.status)}
                variant="outlined"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Typography>{order.shippingAddress.street}</Typography>
            <Typography>{order.shippingAddress.city}, {order.shippingAddress.state}</Typography>
            <Typography>{order.shippingAddress.zipCode}</Typography>
            <Typography>Phone: {order.shippingAddress.phone}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Order Items
        </Typography>

        {order.items.map((item) => (
          <Paper key={item._id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{item.product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Seller: {item.seller.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>Quantity: {item.quantity}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>Price: ₹{item.price}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography>Total: ₹{item.price * item.quantity}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            Total Amount: ₹{order.totalAmount}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderDetails;
