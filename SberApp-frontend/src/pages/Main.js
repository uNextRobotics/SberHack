import { Button, Container } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  IconCalendar,
  IconAccessibility,
  IconDone,
  IconApps,
  IconCross,
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
  MarkedItem,
} from "@sberdevices/ui";
import { tertiary, primary, accent } from "@sberdevices/plasma-tokens";
const Main = ({ setGroupId }) => {
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
        <Headline3>Ваши достижения</Headline3>
        <br />
        <MarkedList>
          <MarkedItem text="Первая тренировка" style={{ color: primary }}>
            <IconDone size="xs" color={accent} />
          </MarkedItem>
          <MarkedItem
            text="Занятия в течение 3х дней"
            style={{ color: primary }}
          >
            <IconDone size="xs" color={accent} />
          </MarkedItem>

          <MarkedItem
            text="Занятия в течение 10 дней"
            style={{ color: tertiary }}
          >
            <IconCross size="xs" color={tertiary} />
          </MarkedItem>
        </MarkedList>
        <br />
      </div>
    </div>
  );
};

export default withRouter(Main);
