import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import styled, { createGlobalStyle } from "styled-components";
import { sberBox } from "@sberdevices/plasma-tokens/typo";
import { darkJoy } from "@sberdevices/plasma-tokens/themes";
import { text, background, gradient } from "@sberdevices/plasma-tokens";
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
      initPhrase: `Запусти MorningTraining`,
      getState,
    });
  }
  return createAssistant({ getState });
};

function App() {
  var assistant = useRef();
  var state = {
    notes: [],
  };
  const [workoutExercises, setWorkoutExercises] = useState([]);

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
      default:
        break;
    }
  };

  const history = useHistory();
  const ChooseTrain = async (train_name) => {
    if (workoutExercises != undefined) {
      workoutExercises.map(({ _id, name }, i) => {
        if (train_name == name.split(" ")[0]) {
          var tain_id = _id;
          history.push("/fastworkout");
        }
      });
    } else {
      alert("Undef");
    }
  };

  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
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
          console.log("Action: ", action);
          ChooseTrain(action.data);

        default:
          break;
      }
    }
  };

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

    if (assistant.current != null) {
      console.log("Non null, send data");
      //assistant.sendData({ action: { action_id: 'check_answer'}});
    } else {
      console.log("Null");
    }
  }, []);
  const [groupId, setGroupId] = useState();
  return (
    <AppStyled>
      <TypoScale />
      <DocStyles />
      <Theme />
      <Switch>
        <Route path="/choose">
          <Choose setGroupId={setGroupId} />
        </Route>
        <Route path="/fastworkout">
          <Workout
            groupId={groupId}
            workoutExercises={workoutExercises}
            setWorkoutExercises={setWorkoutExercises}
          />
        </Route>
        <Route path="/calendar" exact>
          <SportCalendar />
        </Route>
        <Route path="/">
          <Main setGroupId={setGroupId} />
        </Route>
      </Switch>
    </AppStyled>
  );
}
export default withRouter(App);
