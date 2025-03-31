import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const payCommissionSlice = createSlice({
  name: "payCommission",
  initialState: {
    loading: false,
    previousPayments: [], 
  },
  reducers: {
    payCommissionRequest(state) {
      state.loading = true;
    },
    payCommissionSuccess(state) {
      state.loading = false;
    },
    payCommissionFailed(state) {
      state.loading = false;
    },
    fetchPreviousPaymentsRequest(state) {
      state.loading = true;
    },
    fetchPreviousPaymentsSuccess(state, action) {
      state.loading = false;
      state.previousPayments = action.payload;
    },
    fetchPreviousPaymentsFailed(state) {
      state.loading = false;
    },
  },
});

export const payCommission = () => async (dispatch) => {
  dispatch(payCommissionSlice.actions.payCommissionRequest());

  try {
    const response = await axios.post(
      "http://localhost:4000/api/payment/order",
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    const { data } = response;

    if (!data.success) {
      throw new Error(data.message);
    }

    const options = {
      key: "rzp_test_qMsZ3nSLQnmel1",
      amount: data.data.amount,
      currency: data.data.currency,
      name: "AuctionEdge",
      description: "Commission Payment",
      order_id: data.data.id,
      handler: async (response) => {
        try {
          const verifyResponse = await axios.post(
            "http://localhost:4000/api/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          toast.success(verifyResponse.data.message);
          dispatch(payCommissionSlice.actions.payCommissionSuccess());

          dispatch(fetchPreviousPayments());
        } catch (error) {
          toast.error(error.response?.data?.message || "Verification Failed");
          dispatch(payCommissionSlice.actions.payCommissionFailed());
        }
      },
      theme: { color: "#5f63b8" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    toast.error(error.response?.data?.message || "Payment Initialization Failed");
    dispatch(payCommissionSlice.actions.payCommissionFailed());
  }
};

// Fetch previous payments action
export const fetchPreviousPayments = () => async (dispatch) => {
  dispatch(payCommissionSlice.actions.fetchPreviousPaymentsRequest());

  try {
    const response = await axios.get("http://localhost:4000/api/payment/previous", {
      withCredentials: true,
    });

    dispatch(payCommissionSlice.actions.fetchPreviousPaymentsSuccess(response.data.payments));
  } catch (error) {
    toast.error("Failed to fetch previous payments");
    dispatch(payCommissionSlice.actions.fetchPreviousPaymentsFailed());
  }
};

export default payCommissionSlice.reducer;
