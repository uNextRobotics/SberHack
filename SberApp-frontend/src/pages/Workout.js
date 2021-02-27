import { Button, Container } from "@sberdevices/ui";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ApiQueries from "../ApiQueries";

import { tertiary, primary, accent } from "@sberdevices/plasma-tokens";
import {
  body1,
  Display3,
  Headline3,
  Body1,
} from "@sberdevices/ui/components/Typography";
import { Headline2 } from "@sberdevices/ui/components/Typography";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { IconDone, IconLock } from "@sberdevices/plasma-icons";
import {
  MarkedList,
  MarkedItem,
  Card,
  CardBody,
  CardMedia,
  CardContent,
  TextBoxBigTitle,
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
var longText =
  "Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и «Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость», «Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».";
const Workout = ({ groupId }) => {
  const history = useHistory();
  const [workOutStarted, setWorkOutStartet] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const fetchCategoriesAndSetCategories = async () => {
    const workoutsEx = await ApiQueries.getExircicesfromGroup(groupId);
    setWorkoutExercises(workoutsEx.data);
  };
  useEffect(() => {
    fetchCategoriesAndSetCategories();
  });
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
          <Headline2>Быстрая тренировка</Headline2>
          <MarkedList>
            <MarkedItem text="Выпить стакан воды" style={{ color: primary }}>
              <IconDone size="xs" color={accent} />
            </MarkedItem>
            <MarkedItem text="Сделать растяжку" style={{ color: primary }}>
              <IconDone size="xs" color={accent} />
            </MarkedItem>
            <MarkedItem text="Сделать 20 отжиманий" style={{ color: tertiary }}>
              <IconLock size="xs" color={tertiary} />
            </MarkedItem>
            <MarkedItem text="Упражнения на спину" style={{ color: tertiary }}>
              <IconLock size="xs" color={tertiary} />
            </MarkedItem>
          </MarkedList>
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
                    {longText}
                  </CardParagraph1>
                  <TextBoxSubTitle>ru.wikipedia.org</TextBoxSubTitle>
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
                  <div>
                    <TextBoxBigTitle>
                      Тренировка закончена, молодец!
                    </TextBoxBigTitle>
                  </div>
                ) : (
                  <div>
                    <TextBoxBigTitle>
                      {workoutExercises[iter].name}
                    </TextBoxBigTitle>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        style={{
                          width: "auto",
                          heigh: "auto",
                          maxWidth: "500px",
                          borderRadius: "25px",
                        }}
                        src="https://chslovo.com/wp-content/uploads/2019/03/21-1.jpg"
                      />

                      <div
                        style={{ flexDirection: "column", margin: "0.75rem" }}
                      >
                        <Timer
                          setIter={setIter}
                          timeCount={workoutExercises[iter].time}
                          iter={iter}
                        />
                        <CardParagraph1 lines={4}>
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
