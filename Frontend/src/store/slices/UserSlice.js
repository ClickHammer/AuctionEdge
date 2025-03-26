import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const UserSlice = createSlice({
    name: "user",
    initialState: {
      loading: false,
      isAuthenticated: false,
      user: {},
      leaderboard: [],
    },
    reducers: {
      registerRequest(state, action) {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = {};
      },
      registerSuccess(state, action) {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      },
      registerFailed(state, action) {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
      },
      loginRequest(state, action) {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = {};
      },
      loginSuccess(state, action) {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      },
      loginFailed(state, action) {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
      },
      fetchUserRequest(state, action) {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = {};
      },
      fetchUserSuccess(state, action) {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      },
      fetchUserFailed(state, action) {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
      },
  
      logoutSuccess(state, action) {
        state.isAuthenticated = false;
        state.user = {};
      },
      logoutFailed(state, action) {
        state.loading = false;
        state.isAuthenticated = state.isAuthenticated;
        state.user = state.user;
      },
      fetchLeaderboardRequest(state, action) {
        state.loading = true;
        state.leaderboard = [];
      },
      fetchLeaderboardSuccess(state, action) {
        state.loading = false;
        state.leaderboard = action.payload;
      },
      fetchLeaderboardFailed(state, action) {
        state.loading = false;
        state.leaderboard = [];
      },
      clearAllErrors(state, action) {
        state.user = state.user;
        state.isAuthenticated = state.isAuthenticated;
        state.leaderboard = state.leaderboard;
        state.loading = false;
      },
    },
});  
export const register = (data) => async (dispatch) => {
  dispatch(UserSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(UserSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(UserSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(UserSlice.actions.clearAllErrors());
  }
};
export const login = (data) => async (dispatch) => {
  dispatch(UserSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(UserSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(UserSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(UserSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(UserSlice.actions.clearAllErrors());
  }
};
export const logout = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      dispatch(UserSlice.actions.logoutSuccess());
      toast.success(response.data.message);
      dispatch(UserSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(UserSlice.actions.logoutFailed());
      toast.error(error.response.data.message);
      dispatch(UserSlice.actions.clearAllErrors());
    }
  };
  export const fetchUser = () => async (dispatch) => {
    dispatch(UserSlice.actions.fetchUserRequest());
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/me", {
        withCredentials: true,
      });
      dispatch(UserSlice.actions.fetchUserSuccess(response.data.user));
      dispatch(UserSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(UserSlice.actions.fetchUserFailed());
      dispatch(UserSlice.actions.clearAllErrors());
      console.error(error);
    }
  };
  export const fetchLeaderboard = () => async (dispatch) => {
    dispatch(UserSlice.actions.fetchLeaderboardRequest());
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/leaderboard",
        {
          withCredentials: true,
        }
      );
      dispatch(
        UserSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
      );
      dispatch(UserSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(UserSlice.actions.fetchLeaderboardFailed());
      dispatch(UserSlice.actions.clearAllErrors());
      console.error(error);
    }
  };
export default UserSlice.reducer;