import { Button, Container } from "@sberdevices/ui";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import ApiQueries from "../ApiQueries";
import axios from "axios";

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

const Choose = () => {
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const getData = () => {
    //const workouts = ApiQueries.getAllGroupsExercises();
    // setWorkoutTypes(workouts.data);
    axios.get(`${ApiQueries.API_URL}AllGroupsExercises`).then((res) => {
      setWorkoutTypes(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    //getData();
    axios.get(`${ApiQueries.API_URL}AllGroupsExercises`).then((res) => {
      setWorkoutTypes(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Headline2>Выберите тренировку</Headline2>
      </div>
      <br />
      <Row>
        {true ? (
          workoutTypes.map(({ _id, name }, i) => (
            <>
              <Col type="calc" size={1}>
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
                        <TextBoxBigTitle>{name}</TextBoxBigTitle>

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
                          view="primary"
                          size="s"
                          scaleOnInteraction={false}
                          outlined={false}
                          fullWidth
                          style={{ marginTop: "1em" }}
                          tabIndex={-1}
                        >
                          Выбрать
                        </Button>
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
