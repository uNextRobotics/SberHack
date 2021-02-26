import { Button, Container } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { tertiary, primary, accent } from "@sberdevices/plasma-tokens";
import {
  Headline2,
  body1,
  Display3,
  Headline3,
  Body1,
} from "@sberdevices/ui/components/Typography";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
} from "@sberdevices/ui";
import "./Workout.css";
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
const Workout = () => {
  return (
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
          <Button>Начать</Button>
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

        {/* <Card>
          <CardBody>
            <CardContent>
              <TextBoxBigTitle>Таймер</TextBoxBigTitle>

              <div style={{ justifyContent: "space-around" }}>
                <CountdownCircleTimer
                  isPlaying
                  duration={15}
                  colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                  onComplete={() => [true, 1000]}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
              <Button
                text="Label"
                view="primary"
                size="s"
                scaleOnInteraction={false}
                outlined={false}
                fullWidth
                style={{ marginTop: "1em" }}
                tabIndex={-1}
              />
            </CardContent>
          </CardBody>
        </Card> */}
      </div>
    </>
  );
};

export default withRouter(Workout);
