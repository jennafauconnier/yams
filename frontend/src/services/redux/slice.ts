import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8004/users/signup', { email, password });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response);
      } else if (error.request) {
        return rejectWithValue({ message: 'Network Error' });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
      const response = await axios.post('http://localhost:8004/users/signin', { email, password });
      return response.data;
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(signup.rejected, (state, action) => {

      if (action.payload.status != 409) {
        toast('Une erreur est survenue, réessaie ❌', {
          type: 'error',
        })
      }
      
      if (action?.payload.status === 409) {
        toast('Tu as déjà un compte associé ❌', {
          type: 'error',
        })
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;