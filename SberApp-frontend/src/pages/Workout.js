import { Button, Container, TextField } from "@sberdevices/ui";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ApiQueries from "../ApiQueries";

import { tertiary, primary, accent } from "@sberdevices/plasma-tokens";
import {
  body1,
  Display3,
  Headline3,
  Body1,
  Body3,
  Body2,
} from "@sberdevices/ui/components/Typography";
import { Headline2 } from "@sberdevices/ui/components/Typography";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { IconDone, IconLock } from "@sberdevices/plasma-icons";
import { IconHouse } from "@sberdevices/plasma-icons";

import {
  MarkedList,
  MarkedItem,
  Card,
  CardBody,
  CardMedia,
  CardContent,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBox,
  TextBoxSubTitle,
  CardParagraph1,
  CardHeadline1,
  Spinner,
} from "@sberdevices/ui";
import "./Workout.css";
import { Timer } from "../components/Timer";
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Стоп</div>;
  }

  return (
    <div className="timer">
      {/* <div className="text">Remaining</div> */}
      <div className="value">{remainingTime}</div>
      {/* <div className="text">seconds</div> */}
    </div>
  );
};
var date = new Date();
var options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timezone: "UTC",
};
var longText =
  "Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и «Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость», «Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».";
const Workout = ({
  groupId,
  workoutExercises,
  setWorkoutExercises,
  description,
  name,
}) => {
  const history = useHistory();
  const [workOutStarted, setWorkOutStartet] = useState(false);
  const fetchCategoriesAndSetCategories = async () => {
    const workoutsEx = await ApiQueries.getExircicesfromGroup(groupId);
    setWorkoutExercises(workoutsEx.data);
  };
  useEffect(() => {
    fetchCategoriesAndSetCategories();
    console.log("Workout useeffect");
  }, []);
  const [iter, setIter] = useState(0);
  const [timeCount, tsetTimeCount] = useState();
  return !workOutStarted ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <Headline2>{name}</Headline2>

          {workoutExercises ? (
            <MarkedList>
              {workoutExercises.map(({ _id, name }, i) => (
                <MarkedItem text={name} style={{ color: primary }}>
                  <IconDone size="xs" color={accent} />
                </MarkedItem>
              ))}
            </MarkedList>
          ) : (
            <Spinner />
          )}

          <br />
          <Button
            onClick={() => {
              setWorkOutStartet(true);
            }}
          >
            Начать
          </Button>
        </div>
        <div style={{ flexDirection: "column" }}>
          <Card style={{ width: "20rem" }}>
            <CardBody>
              <CardContent>
                <TextBox>
                  <TextBoxBigTitle>Описание</TextBoxBigTitle>
                  <TextBoxSubTitle>10 минут</TextBoxSubTitle>
                  <CardParagraph1 style={{ marginTop: "0.75rem" }} lines={4}>
                    {description}
                  </CardParagraph1>
                  <TextBoxSubTitle>Подходит для женщин</TextBoxSubTitle>
                </TextBox>
              </CardContent>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  ) : (
    <div>
      {/* <Button
        onClick={() => {
          setWorkOutStartet(false);
        }}
      >
        Закончить
      </Button>
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        На главную
      </Button> */}

      <Card style={{ marginBottom: "3rem" }}>
        <CardBody>
          <CardContent>
            {workoutExercises ? (
              <div>
                {iter == workoutExercises.length ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <TextBoxBigTitle>Тренировка завершена</TextBoxBigTitle>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <CardParagraph1>
                          {date.toLocaleString("ru", options)}{" "}
                        </CardParagraph1>
                        <TextBoxSubTitle>Время выполнения</TextBoxSubTitle>
                      </div>

                      {workoutExercises ? (
                        <MarkedList>
                          {workoutExercises.map(({ _id, name }, i) => (
                            <MarkedItem text={name} style={{ color: primary }}>
                              <IconDone size="xs" color={accent} />
                            </MarkedItem>
                          ))}
                        </MarkedList>
                      ) : (
                        <Spinner />
                      )}
                    </div>
                    <br />
                    <Button
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <IconHouse />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextBoxBigTitle>
                        {workoutExercises[iter].name}
                      </TextBoxBigTitle>
                      <div style={{ marginTop: "0.5rem" }}>
                        <Timer
                          setIter={setIter}
                          timeCount={{ timeCount: workoutExercises[iter].time }}
                          iter={iter}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <div class="wrapper exmp2">
                        <img src={workoutExercises[iter].photo} />
                      </div>
                      {/* <img
                          style={{
                            width: "auto",
                            heigh: "auto",
                            maxWidth: "500px",
                            borderRadius: "25px",
                          }}
                          src="https://chslovo.com/wp-content/uploads/2019/03/21-1.jpg"
                        /> */}

                      <div style={{ flexDirection: "column" }}>
                        <CardParagraph1 lines={5}>
                          {workoutExercises[iter].discription}
                        </CardParagraph1>
                        <Button
                          view="primary"
                          size="s"
                          scaleOnInteraction={false}
                          outlined={false}
                          fullWidth
                          style={{ marginTop: "1em" }}
                          tabIndex={-1}
                          onClick={() => {
                            console.log(workoutExercises);
                            setIter(iter + 1);
                          }}
                        >
                          Следующее
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </CardContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default withRouter(Workout);
