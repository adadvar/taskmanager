import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from './authService'

const auth = JSON.parse(localStorage.getItem('auth'))
const meSt = JSON.parse(localStorage.getItem('me'))

const initialState = {
  auth: auth ? auth : null,
  me: meSt ? meSt : null,
  isError: false,
  isSuccess: false,
  isRegisterSuccess: false,
  isLoading: false,
  message: '',
}

export const loginWithGoogle = createAsyncThunk('auth/google', async (params, thunkAPI) => {
  try {
    const response = await authService.loginWithGoogle(params)

    return response;
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//login user
export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
  try {
    const response = await authService.login(params)

    return response;
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

//Register user
export const register = createAsyncThunk('auth/register', async (params, thunkAPI) => {
  try {
    return await authService.register(params)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Register verify user
export const registerVerify = createAsyncThunk('auth/register-verify', async (params, thunkAPI) => {
  try {
    const response = await authService.registerVerify(params)

    return response
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


//Resend Verify code
export const resendVerificationCode = createAsyncThunk('auth/resend-verification-code', async (params, thunkAPI) => {
  try {
    return await authService.resendVerificationCode(params)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//change email
export const changeEmail = createAsyncThunk('auth/change-email', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await authService.changeEmail(params, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//change password
export const changePassword = createAsyncThunk('auth/change-password', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await authService.changePassword(params, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//change email submit
export const changeEmailSubmit = createAsyncThunk('auth/change-email-submit', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await authService.changeEmailSubmit(params, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get me
export const me = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.access_token
    return await authService.me(token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.auth = payload
      })
      .addCase(loginWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
        state.auth = null
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.auth = payload
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
        state.auth = null
      })

      .addCase(logout.fulfilled, (state) => {
        state.auth = null
        state.me = null
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isRegisterSuccess = true
        state.message = payload
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(registerVerify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerVerify.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.auth = payload
      })
      .addCase(registerVerify.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(resendVerificationCode.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resendVerificationCode.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = payload
      })
      .addCase(resendVerificationCode.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = payload
      })
      .addCase(changeEmail.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = payload
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })

      .addCase(changeEmailSubmit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeEmailSubmit.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = payload
        state.me.email = payload.email
      })
      .addCase(changeEmailSubmit.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
      .addCase(me.pending, (state) => {
        state.isLoading = true
      })
      .addCase(me.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.me = payload
      })
      .addCase(me.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })


  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
