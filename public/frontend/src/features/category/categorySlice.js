import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import categoryService from './categoryService'

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdateLoading: false,
  message: '',
}

//get categorys 
export const listCategories = createAsyncThunk('category/list', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await categoryService.listcategoriesApi(token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }

})


//add categories 
export const addCategory = createAsyncThunk('category/add', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await categoryService.addCategoryApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//update categorys 
export const updateCategory = createAsyncThunk('category/update', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await categoryService.updateCategoryApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//delete categorys 
export const deleteCategory = createAsyncThunk('category/delete', async (categoryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await categoryService.deleteCategoryApi(categoryId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCategories.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(listCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories.push(action.payload)
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCategory.pending, (state) => {
        state.isUpdateLoading = true
        state.isError = false
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        let category = state.categories.find(category => category.id === action.payload.id)
        if (category) {
          category = action.payload
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = state.categories.filter(category => category.id !== action.payload.id)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = categorySlice.actions

export default categorySlice.reducer