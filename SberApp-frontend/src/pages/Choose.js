import { Button, Container } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import { Spinner } from "@sberdevices/ui";

import "./Workout.css";
var workouts = [{ title: "Качаем руки" }, { title: "Качаем ноги" }];
const Choose = () => {
  return (
    <Container>
      <Row>
        {workouts.length ? (
          workouts.map(({ _id, title }, i) => (
            <>
              <Col type="calc" size={1}>
                <Link
                  style={{
                    color: "#FFF",
                    textDecoration: "none",
                  }}
                  to="/game"
                >
                  <Button
                    style={{ marginBottom: "1rem" }}
                    value={title}
                    //onClick={() => chooseCategory(title)}
                  >
                    {title}
                  </Button>
                </Link>
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
