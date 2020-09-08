import React, { Component } from 'react'
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";


class WeekPicker extends Component {
  constructor(props) {
    super(props);

    const currentMoment = moment();

    this.state = {
      focused: false,
      selectedWorkWeek: currentMoment.isoWeek(),
      selectedYear: currentMoment.year(),
      hoverdDays: this.calculateActiveWeek(currentMoment),
      workWeekMarginLeft: 0,
    }
  }

  
}