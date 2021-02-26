import { Button } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  CardMedia,
  CardBody,
  Card,
  CardContent,
  TextBox,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
} from "@sberdevices/ui";
const Main = () => {
  const cover = false;

  return (
    <Card
      style={{ width: "22.5rem" }}
      tabIndex={-1}
      outlined={true}
      scaleOnFocus={true}
    >
      <CardBody>
        <CardMedia
          src="./images/320_320_0.jpg"
          placeholder="./images/320_320_1.jpg"
          ratio={cover ? "1 / 1" : "16 / 9"}
        />
        <CardContent cover={cover}>
          <TextBox>
            <TextBoxBigTitle>Потребительский кредит</TextBoxBigTitle>
            <TextBoxBiggerTitle>до 230 000 ₽</TextBoxBiggerTitle>
            <TextBoxSubTitle>
              description", "На 18 месяцев, ставка 13,9%
            </TextBoxSubTitle>
          </TextBox>
          <Link to="/calendar">
            <Button
              view="primary"
              size="s"
              scaleOnInteraction={false}
              outlined={false}
              fullWidth
              style={{ marginTop: "1em" }}
              tabIndex={-1}
            >
              ХХЦХ
            </Button>
          </Link>
        </CardContent>
      </CardBody>
    </Card>
  );
};

export default withRouter(Main);
