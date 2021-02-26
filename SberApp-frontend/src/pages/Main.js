import { Button } from "@sberdevices/ui";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Col, Row, Container } from "@sberdevices/ui";
const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 1,
      }}
    >
      <Button>Рандомная зарядка</Button>
      <Button>Календарь</Button>
    </div>
  );
};

export default withRouter(Main);
