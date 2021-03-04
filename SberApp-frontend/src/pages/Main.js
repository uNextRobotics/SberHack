import { Button, Container } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  IconCalendar,
  IconAccessibility,
  IconDone,
  IconApps,
  IconCross,
  IconEvent,
  IconHeart,
} from "@sberdevices/plasma-icons";
import { Headline3 } from "@sberdevices/ui/components/Typography";

import {
  Card,
  CardContent,
  TextBox,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  Cell,
  CellDisclosure,
  CellIcon,
  TextBoxTitle,
  MarkedList,
  Badge,
  MarkedItem,
  IconSettings,
} from "@sberdevices/ui";
import { tertiary, primary, accent } from "@sberdevices/plasma-tokens";
const Main = ({ setGroupId, ToChooseCateg, achieves }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "2rem",
      }}
    >
      <Card style={{ width: "20rem" }}>
        <CardContent compact>
          <Cell
            content={<TextBoxBiggerTitle>Главное меню</TextBoxBiggerTitle>}
            right={<span style={{ marginTop: 5 }}></span>}
          />
          <Link
            to="/fastworkout"
            style={{
              textDecoration: "none",
            }}
          >
            <Cell
              onClick={() => {
                setGroupId(2);
              }}
              left={
                <CellIcon>
                  <IconAccessibility />
                </CellIcon>
              }
              content={
                <TextBox>
                  <TextBoxTitle>Быстрая тренировка</TextBoxTitle>
                  <TextBoxSubTitle>10 мин</TextBoxSubTitle>
                </TextBox>
              }
              right={<CellDisclosure />}
            />
          </Link>
          <Link to="/choose" style={{ textDecoration: "none" }}>
            <Cell
              left={
                <CellIcon>
                  <IconApps />
                </CellIcon>
              }
              onClick={() => ToChooseCateg()}
              content={
                <TextBox>
                  <TextBoxTitle>Меню тренировок</TextBoxTitle>
                  <TextBoxSubTitle>На любой вкус</TextBoxSubTitle>
                </TextBox>
              }
              right={<CellDisclosure />}
            />
          </Link>

          <Link
            to="/calendar"
            style={{
              textDecoration: "none",
            }}
          >
            <Cell
              left={
                <CellIcon>
                  <IconCalendar />
                </CellIcon>
              }
              content={
                <TextBox>
                  <TextBoxTitle>Календарь</TextBoxTitle>
                  <TextBoxSubTitle>Ваш прогресс</TextBoxSubTitle>
                </TextBox>
              }
              right={<CellDisclosure />}
            />
          </Link>
        </CardContent>
      </Card>
      <div style={{ flexDirection: "column" }}>
        <br /> <br />
        <Headline3>Ваша статистика</Headline3>
        <MarkedList>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "",
              justifyContent: "center",
            }}
          > */}
          <MarkedItem
            text="дней с тренировками подряд"
            style={{ color: primary }}
          >
            {/* <IconEvent size="xs" color={accent} /> */}
            <Badge text={achieves.dict} size={"l"} view={"secondary"} />
          </MarkedItem>
          {/* </div> */}

          <MarkedItem
            text="всего дней с тренировками"
            style={{ color: primary }}
          >
            {/* <IconDone size="xs" color={accent} /> */}
            <Badge
              text={achieves.count_days_train}
              size={"l"}
              view={"secondary"}
            />
          </MarkedItem>

          <MarkedItem text="общее число тренировок" style={{ color: primary }}>
            {/* <IconHeart size="xs" color={accent} /> */}
            <Badge text={achieves.count_train} size={"l"} view={"secondary"} />
          </MarkedItem>
        </MarkedList>
        <br />
      </div>
    </div>
  );
};

export default withRouter(Main);
