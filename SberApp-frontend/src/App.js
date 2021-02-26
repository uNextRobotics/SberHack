import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIHelperCategory from "./APIHelperCategory.js";
import APIHelperQuestion from "./APIHelperQuestion.js";
import styled, { createGlobalStyle } from "styled-components";
import { sberBox } from "@sberdevices/plasma-tokens/typo";
import { darkJoy } from "@sberdevices/plasma-tokens/themes";
import { text, background, gradient } from "@sberdevices/plasma-tokens";
import SportCalendar from "./pages/SportCalendar";
import { body1 } from "@sberdevices/ui/components/Typography";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Workout from "./pages/Workout";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";
const AppStyled = styled.div`
  padding: 30px;
  ${body1}
`;
const TypoScale = createGlobalStyle(sberBox);
const DocStyles = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        /** необходимо залить градиентом всю подложку */
        min-height: 100vh;
    }
`;
const Theme = createGlobalStyle(darkJoy);
//const assistant=null;

const initializeAssistant = (getState /*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQzNTMxNDMsImV4cCI6MTYxNDQzOTU0MywidHlwZSI6IkJlYXJlciIsImp0aSI6ImRkOTY0MzI3LTczOTQtNGMzMy1iNjk2LWUyYThhYzFhNDA3NCIsInN1YiI6IjdkMTM4N2FhY2RiYjY0ZTMwNTE3ODQ3ZGVhNzgwMDNmMTA4NjE1YmNlZGIzNTlmYjhmNWJiMWVkOGI0OTU3ZmM1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.nogJI3-W2AtcQeaMNEOMjNLhOF4R4vbzUE0vrZuaj_omlv64NeQ3hdbuiGeSIRhtELiFO7d8Dvv9xkz9DO7x2maQZoC6sZB76XVK3og-1D_gNhUDSTAsoKn9B2JYcIGmIt50axXPpttHYGRIm8lGZT8olURbqRmdB2J4kGuouRhUiNaBZxp_BGrVnh2o1LYEd0Q6_M-6rDLlE7uMxUfyilNE_wuukP8fdLYICmNL9lhZEdIqFoYdg7PqkRiTn0cmZvbQAzxWex589hdH4SHNO7ai8VXAZ2b6bNbssrHTTUQSjIVGWxAiAZ2APnzrst7L36XO7gKFulYpwLp4sGct04sLJd9bt6uYofbl25iEQwdOA0QeI5DtbG_K-tlB5_9BM8J14b3NrjleOx2p82oPkPhBBBPZO6PW9FykguQsxVLbj4Nif4kD191rlVOjXNw_PcrIyVP_UkVlU5ut9rnx0yhKqgLd7utKV128m9a8fLtxhMI1oKb6NUz3ZJHRwkHq02IfUD5l0-VtPVDDvuJfNRre27ut3k_NqJxBYcuGydBO_TM2gBYxGFuKSRhr-1omvm2x0_o3xNQxH4WoPxPeZS9Q7fZI6rivJirqkfNhR_xufqqlklR3R3h6jDFLwXXZ9azpqNGTqylWb-D1fQhm9pMnBXHTDyND5sfo4qYIamw        " ??
        "",
      initPhrase: `Запусти ToDOAppTest2`,
      getState,
    });
  }
  return createAssistant({ getState });
};

function App() {
  console.log("Render");
  //APIHelperQuestion.deleteQuestion("603098e0d04272015ccccb4f");
  var assistant = useRef();
  var state = {
    notes: [],
  };
  const getStateForAssistant = () => {
    console.log("getStateForAssistant: this.state:", state);
    const state_ = {
      item_selector: {
        items: state.notes.map(({ id, title }, index) => ({
          number: index + 1,
          id,
          title,
        })),
      },
    };
    console.log("getStateForAssistant: state:", state);
    return state_;
  };
  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "choose_category":
          console.log("Choose category");
          console.log(action);
          return chooseCategory(action);
        case "check_answer":
          console.log("Check Answer Voice");
          return checkQuestion(action.note);
        default:
          throw new Error();
      }
    }
  };

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [questions, setQuestions] = useState([]);

  const [currentQuest, setcurrentQuest] = useState("");
  const [currentAns, setCurrentAns] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [Answers, setAnswers] = useState([]);
  const [symbolAnswer, setsymbolAnswer] = useState("");
  const [isGame, setIsGame] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    //APIHelperCategory.createCategory("Случайное");
    //APIHelperCategory.createCategory("Советские фильмы");
    //insertData();
    assistant.current = initializeAssistant(() => getStateForAssistant());
    assistant.current.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

    assistant.current.on("data", (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event;
      dispatchAssistantAction(action);
    });

    //assistant.sendData({ action: { action_id: 'done', parameters: { title: 'купить хлеб' } } });
    console.log("UseEffect");

    const fetchCategoriesAndSetCategories = async () => {
      const categories = await APIHelperCategory.getAllCategories();
      setCategories(categories);
    };

    fetchCategoriesAndSetCategories();
    if (assistant.current != null) {
      console.log("Non null, send data");
      //assistant.sendData({ action: { action_id: 'check_answer'}});
    } else {
      console.log("Null");
    }
  }, [currentAns, symbolAnswer]);

  const chooseCategory = async (title) => {
    if (!title) {
      alert("please enter somrthing");
      return;
    }
    setCategory(title);

    var title_ = null;
    if (title.note != undefined) {
      var title_ = title.note.charAt(0).toUpperCase() + title.note.slice(1);
    } else {
      title_ = title;
    }
    console.log(title_);
    const quest = await APIHelperQuestion.getAllQuestion(title_);

    console.log("Questttt", quest);
    setQuestions(quest);
    randomQuest(quest);
    setIsGame(true);
  };

  //const { showToast } = useToast();
  const checkQuestion = async (answer) => {
    console.log("Correct answer ", currentAns);
    console.log("Correct symbol ans ", symbolAnswer);
    console.log("User answer ", answer);
    let mess = null;
    if (
      answer.toLowerCase() == currentAns.toLowerCase() ||
      answer.toLowerCase() == symbolAnswer.toLocaleLowerCase()
    ) {
      randomQuest(questions);
      setScore(score + 1);
    } else {
      setAttempts(attempts - 1);
    }
    //assistant.current.sendData({ action: { action_id: 'done', parameters: { title: 'купить хлеб' } } });
  };
  const randomQuest = async (quest) => {
    console.log("Quest", quest);
    let quest_count = quest.length;
    let current_number = Math.floor(Math.random() * quest_count);
    if (quest[current_number] != undefined) {
      console.log("Random quest:", quest[current_number]);
      setcurrentQuest(quest[current_number].Question);
      setCurrentAns(quest[current_number].CorrectAnswer);
      setAnswers([
        quest[current_number].Answers[0],
        quest[current_number].Answers[1],
        quest[current_number].Answers[2],
        quest[current_number].Answers[3],
      ]);
      console.log("Первый ответ", quest[current_number][0]);
      let CorrectAnsIndex = quest[current_number].Answers.indexOf(
        quest[current_number].CorrectAnswer
      );
      console.log("Answer index", CorrectAnsIndex);
      switch (CorrectAnsIndex) {
        case 0:
          return setsymbolAnswer("один");
        case 1:
          return setsymbolAnswer("два");
        case 2:
          return setsymbolAnswer("три");
        case 3:
          return setsymbolAnswer("четыре");
        default:
          return setsymbolAnswer("пять");
      }
    } else {
      console.log("Current auestion undefined");
    }
  };

  return (
    <AppStyled>
      <TypoScale />
      <DocStyles />
      <Theme />
      <Router>
        <Switch>
          <Route path="/fastworkout">
            <Workout />
          </Route>
          <Route path="/calendar" exact>
            <SportCalendar />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </AppStyled>
  );
}
export default App;
