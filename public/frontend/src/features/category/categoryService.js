import axios from 'axios'


//list of categori3w
const listcategoriesApi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get('/category', config)

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

const categoryService = {
  listcategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
}

export default categoryService