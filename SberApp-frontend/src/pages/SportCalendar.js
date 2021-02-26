import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Calendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { ru } from "date-fns/locale";
import { isSameDay } from "date-fns";
import { Container } from "@sberdevices/ui";
import "./SportCalendar.css";
const SportCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState();

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };
  const handleDayClick = (date) => {
    setSelectedDates([...selectedDates, date]);
    console.log(selectedDates);
  };
  return (
    <div style={{ height: "50%" }}>
      <Container>
        <Calendar
          onDayClick={handleDayClick}
          modifiers={modifiers}
          locale={ru}
          date={date}
        />
      </Container>
    </div>
  );
};

export default withRouter(SportCalendar);
