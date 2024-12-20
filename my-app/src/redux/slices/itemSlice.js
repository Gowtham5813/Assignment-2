import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../components/supabaseClient';

// Fetch items from Supabase
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const { data, error } = await supabase.from('items').select('*');
  if (error) throw error;
  return data;
});

// Update item in Supabase
export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
  const { data, error } = await supabase.from('items').update(item).eq('id', item.id);
  if (error) throw error;
  return data;
});

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default itemSlice.reducer;
