import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Stepper } from "@sberdevices/ui";
import { Container } from "@sberdevices/ui/components/Grid/Container";
import { Row } from "@sberdevices/ui/components/Grid/Row";
import { Col } from "@sberdevices/ui/components/Grid/Col";
const Shop = () => {
  const [values, setValues] = useState([
    {
      title: "Попытки",
      count: 0,
    },
    { title: "Время", count: 0 },
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Магазин</h1>

      {values.map(({ _id, title }, i) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            //alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h3>{title}</h3>
          <Stepper
            step={1}
            value={values[i].count}
            onChange={(value) => {
              setValues((prevState) => {
                // #3 - don't modify state directly - copy the array...

                // ...and the object, doing the update
                values[i] = {
                  ...values[i],
                  title: title,
                  count: value,
                };

                return { values };
              });
            }}
          />
        </div>
      ))}
      <Button>Получить</Button>
    </div>
  );
};

export default withRouter(Shop);
