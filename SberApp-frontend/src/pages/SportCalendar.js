import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import { Calendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { ru } from "date-fns/locale";
import { isSameDay } from "date-fns";
import { Button, Container, Spinner } from "@sberdevices/ui";
import ApiQueries from "../ApiQueries";

import "./SportCalendar.css";
const SportCalendar = ({ userId, digit }) => {  
  useEffect(() => {

    const getData = async userId =>{
      const data = await ApiQueries.getProgressByUser(userId);
      var dates_new = []
      console.log("Data", data)
      data.data.forEach((element) => {
        dates_new.push(Date.parse(element.date))
      });
      setSelectedDates(dates_new)
    }
     getData(userId)
  },[]);
    const [selectedDates, setSelectedDates] = useState([])
    const modifiers = {
      selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
    }
    return (
      <Calendar modifiers={modifiers} locale={ru} />
    )
};

export default withRouter(SportCalendar);
