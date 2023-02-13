import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import pageDataService from './pageDataService'

const initialState = {
  pageData: {},
  todo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdateLoading: false,
  isUpdateSuccess: false,
  message: '',
}

//get pageData 
export const getDashboardData = createAsyncThunk('pageData/dashboard', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.dashboardApi(token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }

})


//get pageData 
export const getUpdateTodoPageData = createAsyncThunk('pageData/update-todo-page', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.updateTodoPageApi(params,token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }

})

//add todos 
export const addTodo = createAsyncThunk('pageData/add-todo', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.addTodoApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//add category 
export const addCategory = createAsyncThunk('pageData/add-category', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.addCategoryApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// //update todos 
export const updateTodo = createAsyncThunk('pageData/update-todo', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.updateTodoApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//delete todos 
export const deleteTodo = createAsyncThunk('pageData/delete-todo', async (todoId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await pageDataService.deleteTodoApi(todoId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(getDashboardData.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.pageData = payload.pageData
      })
      .addCase(getDashboardData.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(getUpdateTodoPageData.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(getUpdateTodoPageData.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.pageData = payload.pageData
      })
      .addCase(getUpdateTodoPageData.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(addTodo.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(addTodo.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.pageData.todos.push(payload)
      })
      .addCase(addTodo.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(addCategory.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(addCategory.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.pageData.categories.push(payload)
      })
      .addCase(addCategory.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(updateTodo.pending, (state) => {
        state.isUpdateLoading = true
        state.isSuccess = false
        state.isUpdateSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(updateTodo.fulfilled, (state, {payload}) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        const todoIndex = state.pageData.todos.findIndex(todo => todo.id === payload.id)
        if (todoIndex !== undefined) {
          state.pageData.todos[todoIndex] = payload
        }
      })
      .addCase(updateTodo.rejected, (state, {payload}) => {
        state.isUpdateLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(deleteTodo.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.pageData.todos = state.pageData.todos.filter(todo => todo.id !== payload.id)
      })
      .addCase(deleteTodo.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.message = payload.message
      })
  }
})

export const { reset } = pageDataSlice.actions

export default pageDataSlice.reducer