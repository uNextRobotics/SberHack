import axios from "axios";

const API_URL = "http://localhost:3000/categories/";
async function createCategory(title) {
  console.log(title);
  const { data: newCategory } = await axios.post(API_URL, {
    title: title,
  });
  console.log(2323);
  return newCategory;
}

async function deleteCategory(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateCategory(id, payload) {
  const { data: newCategory } = await axios.put(`${API_URL}${id}`, payload);
  return newCategory;
}

async function getAllCategories() {
  const { data: categories } = await axios.get(API_URL);
  console.log(categories);
  return categories;
}

export default {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
};
