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
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ1MDY0MzksImV4cCI6MTYxNDU5MjgzOSwidHlwZSI6IkJlYXJlciIsImp0aSI6ImQ1NmIzMjUyLTYyODQtNDJkMy04MDQzLTIxZjlhNjEzMWQ2NyIsInN1YiI6IjdkMTM4N2FhY2RiYjY0ZTMwNTE3ODQ3ZGVhNzgwMDNmMTA4NjE1YmNlZGIzNTlmYjhmNWJiMWVkOGI0OTU3ZmM1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.O67QZgv6jRgPfrX_Cya1LGqgidb0gftwvoUiWHSinSAvJcGsC8bK7iwpWoQZQ-JYcBAtnvd7mGVX5Vteuf4y-_EaaWIBr2w-AkWjyuTxvTof9gFBpS71MVIZGCY6VPDW20Ji2Lg0bD0Rby_FRAqqPgYo_r1xeMg6rHNmSSBHJXS8fwee9VOovraThPIAaDbQua_hp_mVy3vNpdXf4Ug1SCa_vDKxSVGsqcJoFgwTMv7xVqtgzWTNOw5BRQuvs5kZd_4UiWFzfKdFbzrryLHaJiF8zgwTG_yxDGuI73366AYYEWeXnnAgdQHFYZwpmm-KGSzSWGNddlRoWwUOk9n_xYgTLQWJxO1b9i2G7MoUuVnsQGwGuwjyPX6ycz6kKUTtKGJM2jg5ssxeY2CYqw-4f0OmwaUgbqeUFnG-FYVV0yihZL8-xGS8D44yEaUnBlAMl2S5w7ZXoScVeO2tTiOQQp0XRNq4QvelLBgAZLb3Xhe_JvjPhRblVfIkPaeTMPT4Wg_YLlbUHJXT2e7TE22oaXDS0mkSXmI505VfKkFpbwd03ohmIdqH-uxsd4GMUr639OZDVAp83zTYLWX812mQKA8aE3jCFoTIRrDZkTryjaR94bdu06QVETJDdfbhW3XQleai90TWe1ePLFTG2xhR8hNkSiYay0-UY7JfMilEP3Y" ??
        "",
      initPhrase: `Запусти MorningTraining`,
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
          setUserId(event.user_id);
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
          />
        </Route>
        <Route path="/calendar" exact>
          <SportCalendar userId={userId} />
        </Route>
        <Route path="/">
          <Main setGroupId={setGroupId} ToChooseCateg={SendDataToAssistant} />
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
