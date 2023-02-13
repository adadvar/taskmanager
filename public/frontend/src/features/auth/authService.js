import axios from 'axios'


//Login user with google
const loginWithGoogle = async (params) => {


  const response = await axios.get(`/auth/google/callback${params}`)
  // let userMe;
  if (response.data) {
    // userMe = await me(response.data.access_token)
    localStorage.setItem('auth', JSON.stringify(response.data))
  }
  return response.data
}

//Login user
const login = async (params) => {


  const response = await axios.post('/login', params)
  // let userMe;
  if (response.data) {
    // userMe = await me(response.data.access_token)
    localStorage.setItem('auth', JSON.stringify(response.data))
  }
  return response.data
}

//Logout user
const logout = () => {
  localStorage.removeItem('auth')
  localStorage.removeItem('me')
}

//Register user
const register = async (params) => {
  const response = await axios.post('/register', params)

  return response.data
}

//Register user
const registerVerify = async (params) => {
  const response = await axios.post('/register-verify', params)

  return response.data
}

//Resend verification user
const resendVerificationCode = async (params) => {
  const response = await axios.post('/resend-verification-code', params)

  return response.data
}

//Change email user
const changeEmail = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post('/change-email', params, config)

  return response.data
}

//Change password user
const changePassword = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post('/change-password', params, config)

  return response.data
}

//Change email submit user
const changeEmailSubmit = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post('/change-email-submit', params, config)

  if (response.data) {
    const meSt = JSON.parse(localStorage.getItem('me'))
    const newStorage = { ...meSt, email: response.data.email }
    localStorage.setItem('me', JSON.stringify(newStorage))
  }
  return response.data
}

//get user
const me = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get('/user/me', config)

  if (response.data) {
    localStorage.setItem('me', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  loginWithGoogle,
  login,
  logout,
  register,
  registerVerify,
  resendVerificationCode,
  changeEmail,
  changePassword,
  changeEmailSubmit,
  me,
}

export default authService