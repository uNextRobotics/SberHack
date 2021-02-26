import React from "react";
import { Button } from "@sberdevices/ui/components/Button/Button";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Container } from "@sberdevices/ui/components/Grid/Container";
import { Spinner, TextField } from "@sberdevices/ui";
import { Timer } from "../components/Timer";
const Game = ({
  score,
  attempts,
  currentQuest,
  checkQuestion,
  category,
  Answers,
  setIsGame,
  chooseCategory,
}) => {
  return category ? (
    <div>
      <Container>
        <Row>
          <Col type="rel" size={4}>
            <h3>{currentQuest}</h3>
          </Col>
          <Col type="calc" size={2}>
            <h3>Количетсво правильных ответов: {score}</h3>
          </Col>
        </Row>

        {Answers.length ? (
          <>
            <Row>
              <Col>
                <Timer
                  setIsGame={setIsGame}
                  category={category}
                  chooseCategory={chooseCategory}
                />
              </Col>
              <Col>
                <span>Осталось попыток: {attempts}</span>
              </Col>
            </Row>
            <br />
            <Row>
              {Answers.map(({}, i) => (
                <Col>
                  <Button
                    style={{ marginBottom: "1rem" }}
                    value={Answers[i]}
                    onClick={() => {
                      checkQuestion(Answers[i]);
                    }}
                  >
                    {i + 1}. {Answers[i]}
                  </Button>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner />
          </div>
        )}
      </Container>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default withRouter(Game);
