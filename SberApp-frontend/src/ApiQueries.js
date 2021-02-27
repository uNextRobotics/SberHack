import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
async function createSberId(SberId) {
  const { data: newSberId } = await axios.post(`${API_URL}SberId`, {
    SberId,
  });
  return newSberId;
}

async function createUser(SberId, Name, Age, Gender, Active) {
  const { data: newUser } = await axios.post(`${API_URL}User`, {
    SberId,
    Name,
    Age,
    Gender,
    Active,
  });
  return newUser;
}

async function getUsersBySberId(SberId) {
  const users = await axios.get(`${API_URL}User`, {
    params: {
      SberId: SberId,
    },
  });
  return users;
}

async function createCategoryExercises(CategoryName) {
  const { data: newCategory } = await axios.post(`${API_URL}ExCateg`, {
    CategoryName,
  });
  return newCategory;
}

async function getAllCategoriesExirc() {
  const categories = await axios.get(`${API_URL}ExCateg`);
  return categories;
}
async function getCategoryById(CategoryId) {
  const category = await axios.get(`${API_URL}ExCateg`, {
    params: {
      Id: CategoryId,
    },
  });
  return category;
}

async function getAllGroupsExercises() {
  const groups = await axios.get(`${API_URL}AllGroupsExercises`);
  return groups;
}
async function getExircicesfromGroup(GroupId) {
  const exircises = await axios.get(`${API_URL}GroupExir`, {
    params: {
      GroupId: GroupId,
    },
  });
  return exircises;
}

async function createProgressAchieve(UserId, date, Completed) {
  const { data: newProgress } = axios.post(`${API_URL}Progress`, {
    UserId,
    date,
    Completed,
  });
  return newProgress;
}

async function getProgressByUser(UserId) {
  const progress = axios.get(`${API_URL}Progress`, {
    params: {
      UserId: UserId,
    },
  });
  return progress;
}

async function getMotivationalPhrase() {
  const Phrase = axios.get(`${API_URL}Phrase`);
  return Phrase;
}

async function updateQuestion(id, payload) {
  const { data: newQuestion } = await axios.put(`${API_URL}${id}`, payload);
  return newQuestion;
}
export default {
  getAllGroupsExercises,
};
