import axios from 'axios'


//list of todo
const listTodosApi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get('/todo', config)

  return response.data
}


//show todo
const showTodoApi = async ({ id }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`/todo/${id}`, config)

  return response.data
}

//add todo
const addTodoApi = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post('/todo', params, config)

  return response.data
}

//update todo
const updateTodoApi = async ({ data, id }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`/todo/${id}`, data, config)

  return response.data
}

//delete todo
const deleteTodoApi = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`/todo/${todoId}`, config)

  return response.data
}

const todoService = {
  listTodosApi,
  showTodoApi,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
}

export default todoService