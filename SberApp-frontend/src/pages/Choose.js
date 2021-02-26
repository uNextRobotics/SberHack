import { Button, Container } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import {
  Spinner,
  Card,
  CardBody,
  CardMedia,
  CardContent,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  TextBox,
} from "@sberdevices/ui";
import { Headline2 } from "@sberdevices/ui/components/Typography";
import "./Workout.css";
var workouts = [
  { title: "Качаем руки" },
  { title: "Качаем ноги" },
  { title: "Качаем спину" },
];
const Choose = () => {
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Headline2>Выберите тренировку</Headline2>
      </div>
      <br />
      <Row>
        {workouts.length ? (
          workouts.map(({ _id, title }, i) => (
            <>
              <Col type="calc" size={1}>
                {/* <Button
                    style={{ marginBottom: "1rem" }}
                    value={title}
                    //onClick={() => chooseCategory(title)}
                  >
                    {title}
                  </Button> */}
                <Card
                  style={{ width: "11rem", marginBottom: "1rem" }}
                  tabIndex={-1}
                  scaleOnFocus={true}
                >
                  <CardBody>
                    <CardMedia
                      src="./images/320_320_0.jpg"
                      placeholder="./images/320_320_1.jpg"
                    />
                    <CardContent>
                      <TextBox>
                        <TextBoxBigTitle>{title}</TextBoxBigTitle>

                        <TextBoxSubTitle>
                          {"На 18 месяцев, ставка 13,9%"}
                        </TextBoxSubTitle>
                      </TextBox>

                      <Link
                        style={{
                          color: "#FFF",
                          textDecoration: "none",
                        }}
                        to="/fastworkout"
                      >
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
                      </Link>
                    </CardContent>
                  </CardBody>
                </Card>
              </Col>
            </>
          ))
        ) : (
          <Spinner />
        )}
      </Row>
    </Container>
  );
};

export default withRouter(Choose);
