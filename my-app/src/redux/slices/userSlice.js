import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../components/supabaseClient'; // Import your Supabase client

// Fetch users from Supabase
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
