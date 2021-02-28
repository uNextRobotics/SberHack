import { Button, Container } from "@sberdevices/ui";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import ApiQueries from "../ApiQueries";
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

const Choose = ({
  setGroupId,
  setDescription,
  setName,
  setWorkouts,
  workouts,
  SendDataToAssistant
}) => {
  const fetchCategoriesAndSetCategories = async () => {
    const workouts = await ApiQueries.getAllGroupsExercises();
    setWorkouts(workouts);
  };
  useEffect(() => {
    fetchCategoriesAndSetCategories();
  }, []);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Headline2>Выберите режим тренировки</Headline2>
      </div>
      <br />
      <Row>
        {workouts.data ? (
          workouts.data.map(({ name, short_discription, discription }, i) => (
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
                        <TextBoxSubTitle>{short_discription}</TextBoxSubTitle>
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
                          onClick={() => {
                            console.log(workouts.data);
                            //SendDataToAssistant('chooseCategory')
                            setGroupId(i + 1);
                            setDescription(discription);
                            setName(name);
                          }}
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
