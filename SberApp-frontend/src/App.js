import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { AssistantCharacterType } from "@sberdevices/assistant-client";
import { darkJoy, darkEva, darkSber } from "@sberdevices/plasma-tokens/themes";
import { text, background, gradient } from "@sberdevices/plasma-tokens";
import { Container } from "@sberdevices/ui";

import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { sberBox } from "@sberdevices/plasma-tokens/typo";
import SportCalendar from "./pages/SportCalendar";
import { body1 } from "@sberdevices/ui/components/Typography";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Workout from "./pages/Workout";
import ApiQueries from "./ApiQueries";
import Choose from "./pages/Choose";
import { useHistory, withRouter } from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import { set } from "date-fns";
import { Spinner } from "@sberdevices/ui";

const AppStyled = styled.div`
  padding: 30px;
  ${body1}
`;
const TypoScale = createGlobalStyle(sberBox);
// const DocStyles = createGlobalStyle`
//     /* stylelint-disable-next-line selector-nested-pattern */
//     html {
//         color: ${text};
//         background-color: ${background};
//         background-image: ${gradient};
//         /** необходимо залить градиентом всю подложку */
//         min-height: 100vh;
//     }
// `;
// const Theme = createGlobalStyle(darkJoy);
//const assistant=null;
const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const DocStyles = createGlobalStyle`
  html {
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};
    min-height: 100vh;
  }
`;

const initializeAssistant = (getState /*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ4NTk3OTgsImV4cCI6MTYxNDk0NjE5OCwidHlwZSI6IkJlYXJlciIsImp0aSI6IjBkYmY5MmI3LTg2MDctNDk2Yi1iZTUyLTExOWI1Mjc1ZjBkZCIsInN1YiI6IjdkMTM4N2FhY2RiYjY0ZTMwNTE3ODQ3ZGVhNzgwMDNmMTA4NjE1YmNlZGIzNTlmYjhmNWJiMWVkOGI0OTU3ZmM1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.mNR5a8AMZFw_6S8sMH3BX3s3OsTt32EC1ARnUgFXbOLemyLWf4R3sOrdtjU8kLSkQjlBLqLN3ljhyVmnnec4UoBQvDSSQLCAJiiKF-yzVZaebMFotO68CeFmW8wVvAAdmoKF1C-UIGjpzMREYTmidguPdaDsXskwTa7G9NiZsdN9QQwdwVoBgpcg3f7q9VmBM6dBS6fcaFC98By4w3x5yQM6T_crRLI82hQjniO_WJNPjiphaia8RunrboEzZANO2h2sClnpbPo5B3ZnD1qexwd89ZUYbBs4bry0EUjfTh5WGwKm8izF4X1yFv7cHF5fXpe_O6DHRXzA0t-aFvgXGan1M8zc0WWYOfdOy4sPBxhoxe1AGjLNP8KhukPVx2dTlPKW_dacWGTde1dFt6kcRP9iayTgbDJBiHLAXP2HhuTlTYm-5ralYIapQoF1zpytq0tTaTsd-H_tlRIn2QYzB3P33OmtFRLqWU84ybq5dOlg9Cx_RbXB41oiLxeVZ7GbkkElMljQCqaJiBJbR8xeRpAkpX8h5_Pfs6X_M59HtdhjwsZZzvWZYJYs5rY5-FYN8owbT0p9DN6Xp7DyHORSvbvdICnoV4kjwkXqrPgZiPuVJszfOpI71NKkVC7PSKNNwRH28g8I2-4qp5UhioFNGh3KVmxyJ-thgvvjy6ZPn84" ??
        "",
      initPhrase: `Запусти Бодрое утро`,
      getState,
    });
  }
  return createAssistant({ getState });
};

function App() {
  const [character, setCharacter] = useState("sber");

  var assistant = useRef();
  var state = {
    notes: [],
  };
  const [workouts, setWorkouts] = useState([]);

  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [userId, setUserId] = useState([]);
  const [workOutStarted, setWorkOutStartet] = useState(false);
  const [iterChanged, setIterChanged] = useState(-1);
  const [digit, setDigit] = useState(-1);
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

  const getData = async (Id) => {
    await ApiQueries.getProverkaUsersByUserId(Id).then((data) =>
      setDigit(data.data)
    );
  };

  const ChangePage = async (page) => {
    switch (page) {
      case "Calendar":
        history.push("/calendar");
        break;
      case "fastworkout":
        history.push("/calendar");
        break;
      case "choose_training":
        history.push("/choose");
        break;
      case "fast_training":
        history.push("/fastworkout");
        break;
      default:
        break;
    }
  };

  const history = useHistory();
  const ChooseTrain = async (train_name) => {
    train_name =
      train_name.charAt(0).toUpperCase() + train_name.slice(1).trim();
    console.log("WK", workouts.data);
    if (workouts.data != undefined) {
      workouts.data.map(({ _id, name, discription }, i) => {
        console.log("name", name);
        console.log("train_name", train_name);
        if (train_name == name.trim()) {
          //setWorkOutStartet(false)
          console.log("i", i);
          console.log("name", name);
          setGroupId(i + 1);
          setName(name);
          setDescription(discription);
          history.push("/fastworkout");
        }
      });
    }
  };

  const startTraining = async () => {
    setWorkOutStartet(true);
    //history.push("/fastworkout");
  };
  const changeExir = async (type) => {
    switch (type) {
      case "next":
        setIterChanged(1);
      case "previous":
        setIterChanged(0);
    }

    setIterChanged(-1);
  };

  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "character":
          setCharacter(action.character.id);
          // 'sber' | 'eva' | 'joy';
          break;
        case "show_calendar":
          ChangePage("Calendar");
          break;
        case "to_fast_training":
          ChangePage("fast_training");
          break;
        case "to_choose_training":
          ChangePage("choose_training");
          break;
        case "choose_train":
          ChooseTrain(action.data);
          break;
        case "start_train":
          startTraining();
          break;

        case "next_exircise":
          changeExir("next");
          break;
        case "previous_exircise":
          changeExir("previous");
          break;
        case "to_main":
          history.push("/");
          break;

        default:
          break;
      }
    }
  };
  const [achieves, setAchieves] = useState([]);
  useEffect(() => {
    if (assistant.current == undefined) {
      assistant.current = initializeAssistant(() => getStateForAssistant());
      assistant.current.on("start", (event) => {
        console.log(`assistant.on(start)`, event);
      });
    }

    assistant.current.on(
      "data",
      (event /*: any*/) => {
        if (event.type == "smart_app_data") {
          console.log("userId", event.user_id);
          if (event.user_id != undefined) {
            setUserId(event.user_id);
            getData(event.user_id);
            ApiQueries.createUser(userId);
          }
          const getUserAchieves = async () => {
            var ach = await ApiQueries.getAchiviesFomUser(event.user_id);
            setAchieves(ach.data);
          };
          getUserAchieves();
        }
        console.log(`assistant.on(data)`, event);
        const { action } = event;
        dispatchAssistantAction(action);
      },
      []
    );

    //assistant.sendData({ action: { action_id: 'done', parameters: { title: 'купить хлеб' } } });

    if (assistant.current != null) {
      console.log("Non null, send data");
      //assistant.sendData({ action: { action_id: 'check_answer'}});
    } else {
      console.log("Null");
    }
  }, [workouts]);
  const [groupId, setGroupId] = useState(2);
  const [description, setDescription] = useState(
    "Облегченный вид утренней тренирровки позволит вам размять тело без особых силовых усилий"
  );
  const [name, setName] = useState("Быстрая тренировка");

  const SendDataToAssistant = async (action) => {
    assistant.current.sendData({
      action: { action_id: action, parameters: { title: "купить хлеб" } },
    });
  };

  return (
    <AppStyled>
      <DocStyles />
      <TypoScale />
      {(() => {
        switch (character) {
          case "sber":
            return <ThemeBackgroundSber />;
          case "eva":
            return <ThemeBackgroundEva />;
          case "joy":
            return <ThemeBackgroundJoy />;
          default:
            return;
        }
      })()}
      {/* {assistant.current ? ( */}
      <Switch>
        <Route path="/choose">
          <Choose
            setGroupId={setGroupId}
            setDescription={setDescription}
            setName={setName}
            workouts={workouts}
            setWorkouts={setWorkouts}
            SendDataToAssistant={SendDataToAssistant}
          />
        </Route>
        <Route path="/fastworkout">
          <Workout
            groupId={groupId}
            description={description}
            workoutExercises={workoutExercises}
            setWorkoutExercises={setWorkoutExercises}
            name={name}
            userId={userId}
            workOutStarted={workOutStarted}
            setWorkOutStartet={setWorkOutStartet}
            iterChanged={iterChanged}
            setAchieves={setAchieves}
          />
        </Route>
        <Route path="/calendar" exact>
          <SportCalendar userId={userId} digit={digit} />
        </Route>
        <Route path="/">
          <Main
            setGroupId={setGroupId}
            ToChooseCateg={SendDataToAssistant}
            achieves={achieves}
          />
        </Route>
      </Switch>
      {/* ) : (
        <Container>
          <Spinner />
        </Container>
      )} */}
    </AppStyled>
  );
}
export default withRouter(App);
