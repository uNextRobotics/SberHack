import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Calendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { ru } from "date-fns/locale";
import { isSameDay } from "date-fns";
import { Button, Container, Spinner } from "@sberdevices/ui";
import ApiQueries from "../ApiQueries";

import "./SportCalendar.css";
const SportCalendar = ({ userId }) => {
  const [date, setDate] = useState();

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };
  const handleDayClick = async (date) => {
    //var date = new Date();

    setSelectedDates([...selectedDates, date]);
    await ApiQueries.createProgressAchieve(userId, date);
  };
  const [digit, setDigit] = useState(-1);
  const getData = async (uid) => {
    console.log(uid);
    await ApiQueries.getProverkaUsersByUserId(uid).then((data) =>
      setDigit(data.data)
    );
  };
  useEffect(() => {
    getData(userId);
    // const fetchDates = async (uid) => {
    //   const res = await ApiQueries.getProverkaUsersByUserId(uid);
    //   setDigit(res.data);
    // };
    // fetchDates(userId);
  }, [digit]);
  const [recievedData, setRecievedData] = useState([]);
  useEffect(() => {
    if (digit == 1) {
      console.log("here");
      const progress = async (uid) => {
        var res = await ApiQueries.getProgressByUser(uid);

        // res.data.push({
        //   date: "Thu Feb 25 2021 04:26:51 GMT+0300 (Москва, стандартное время)",
        // });

        // res.data.push({
        //   date: "Thu Feb 27 2021 04:26:51 GMT+0300 (Москва, стандартное время)",
        // });
        // res.data.push({
        //   date: "Thu Feb 26 2021 04:26:51 GMT+0300 (Москва, стандартное время)",
        // });
        console.log(res.data);
        setRecievedData(res.data);

        //console.log(res.data[0].date)
      };
      progress(userId);
    } else if (digit == 0) {
      console.log("here 2");

      const createU = async (uid) => {
        var a = await ApiQueries.createUser(uid);
      };
      createU(userId);
      getData(userId);
    }
  }, [digit]);
  useEffect(() => {
    recievedData.forEach((element) => {
      console.log(element);
      setSelectedDates([...selectedDates, Date.parse(element.date)]);
      console.log("sel dates", selectedDates);
    });
  }, [recievedData]);
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div style={{ height: "50%" }}>
      <Container>
        {digit == 1 ? (
          <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            locale={ru}
            date={date}
          />
        ) : (
          <Spinner />
        )}
      </Container>
    </div>
  );
};

export default withRouter(SportCalendar);
