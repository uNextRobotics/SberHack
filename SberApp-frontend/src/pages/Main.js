import React from "react";
import { Button } from "@sberdevices/ui/components/Button/Button";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Container } from "@sberdevices/ui/components/Grid/Container";
import { IconCartAlt } from "@sberdevices/plasma-icons";
import { Spinner } from "@sberdevices/ui";
const Main = ({ categories, game, chooseCategory }) => {
  return !game ? (
    <div>
      <div>
        <Link to="/shop" style={{ float: "right" }}>
          <IconCartAlt />
        </Link>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Викторина</h2>
        <h3>Выберите категорию:</h3>
      </div>

      <Container>
        <Row>
          {categories.length ? (
            categories.map(({ _id, title }, i) => (
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
                      onClick={() => chooseCategory(title)}
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
    </div>
  ) : (
    <Redirect to="/game" />
  );
};

export default withRouter(Main);
