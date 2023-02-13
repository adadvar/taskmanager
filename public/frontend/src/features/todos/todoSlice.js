import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import todoService from './todoService'

const initialState = {
  todos: [],
  todo: null,
  isError: false,
  isSuccess: false,
  isUpdateSuccess: false,
  isLoading: false,
  isUpdateLoading: false,
  message: '',
}

//get todos 
export const listTodos = createAsyncThunk('todo/list', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await todoService.listTodosApi(token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }

})

//show todos 
export const showTodo = createAsyncThunk('todo/show', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await todoService.showTodoApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


//get todos 
export const addTodo = createAsyncThunk('todo/add', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await todoService.addTodoApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//update todos 
export const updateTodo = createAsyncThunk('todo/update', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await todoService.updateTodoApi(params, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//delete todos 
export const deleteTodo = createAsyncThunk('todo/delete', async (todoId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await todoService.deleteTodoApi(todoId, token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(listTodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(listTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(listTodos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(showTodo.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(showTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todo = action.payload
      })
      .addCase(showTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addTodo.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos.push(action.payload)
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTodo.pending, (state) => {
        state.isUpdateLoading = true
        state.isUpdateSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isUpdateLoading = false
        state.isUpdateSuccess = true
        const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id)
        if (todoIndex !== undefined) {
          state.todos[todoIndex] = action.payload
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isUpdateLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
  }
})

export const { reset } = todoSlice.actions

export default todoSlice.reducer