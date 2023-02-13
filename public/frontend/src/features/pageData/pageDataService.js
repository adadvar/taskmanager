import axios from 'axios'


//dashboard data
const dashboardApi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get('/dashboard', config)

  return response.data
}

//dashboard data
const updateTodoPageApi = async ({id},token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`/update-todo/${id}`, config)

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

//add category
const addCategoryApi = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post('/category', categoryData, config)

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

//update category
const updateCategoryApi = async ({ data, id }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  // console.log(data, id)
  const response = await axios.put(`/category/${id}`, { data: data }, config)

  return response.data
}



//update category
const deleteCategoryApi = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`/category/${categoryId}`, config)

  return response.data
}


const todoService = {
  dashboardApi,
  updateTodoPageApi,
  showTodoApi,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
}

export default todoService