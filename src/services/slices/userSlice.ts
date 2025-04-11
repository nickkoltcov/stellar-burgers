import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAuthChecked: false
};

export const registration = createAsyncThunk(
  'user/registration',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const res = await registerUserApi(userData);
    if (!res.success) {
      return rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logIn = createAsyncThunk(
  'user/logIn',
  async (userData: TLoginData, { rejectWithValue }) => {
    const res = await loginUserApi(userData);
    if (!res.success) {
      return rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    const res = await updateUserApi(userData);
    if (!res.success) {
      return rejectWithValue(res);
    }
    return res.user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const res = await logoutApi();
    if (!res.success) {
      return rejectWithValue(res);
    }
    deleteCookie('accessToken');
    localStorage.clear();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userDataSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    authenticatedSelector: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  userDataSelector,
  isAuthCheckedSelector,
  authenticatedSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
