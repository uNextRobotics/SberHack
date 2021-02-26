import axios from "axios";

const API_URL = "http://localhost:3000/questions/";
async function createQuestion(question, answer, category) {
  console.log(question);
  const { data: newQuestion } = await axios.post(API_URL, {
    Question: question,
    Answer: answer,
    Category: category,
  });
  return newQuestion;
}

async function deleteQuestion(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateQuestion(id, payload) {
  const { data: newQuestion } = await axios.put(`${API_URL}${id}`, payload);
  return newQuestion;
}

async function InsterQuestion() {
  var Question="Какого цвета кожа у полярного медведя?";
  var CorrectAnswer="а";
  var Answer1="Черного";
  var Answer2="Белого";
  var Answer3="Серого";
  var Answer4="Коричневого";
  var Category="Животные";
  const { data: newTodo } = await axios.post(API_URL, {
    Question, CorrectAnswer, Answer1, Answer2, Answer3, Answer4, Category}
  );
  return newTodo;
}

async function getAllQuestion(category) {
  const { data: questions } = await axios.get(API_URL, {
    params: {
      Cat: category,
    },
  });
  return questions;
}

export default {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestion,
  InsterQuestion
};
