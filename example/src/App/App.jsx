// modules
import React, { Component } from 'react';
import moment from 'moment';

// files
import styles from './styles.pcss';
import Calendar from '../../../dist/index.js';
import '../../../dist/styles.css';


function renderDay(day) {
  return (
    <div className="day">
      {day.format('D')}
    </div>
  )
}

function renderMonthHeader(firstDay, format) {
  // Don't render month headers for 2016, for some reason.
  if (firstDay.year() === 2017) {
    return firstDay.format(format);
  }
}

export default class App extends Component {
  state = {
    startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    endDate: moment().add(60, 'days').format('YYYY-MM-DD'),
  }

  updateDates = (event) => {
    event.preventDefault();
    const startDate = moment(event.target.startDate.value);
    const endDate = moment(event.target.endDate.value);

    // Both date inputs must be valid
    if (!startDate.isValid() && !startDate.isValid()) {
      alert('Invalid dates');
      return false;
    }

    // Start Date must come before End Date... duh
    if (startDate.isAfter(endDate)) {
      alert('Start Date must be before End Date');
      return false;
    }

    this.setState({
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <form onSubmit={this.updateDates}>
            <label>Start Date:
              <input
                defaultValue={this.state.startDate}
                name="startDate"
                type="date"
              />
            </label>

            <label>End Date:
              <input
                defaultValue={this.state.endDate}
                name="endDate"
                type="date"
              />
            </label>

            <button>Update</button>
          </form>
        </div>
        <h1>TT React Calendar</h1>
        <h3>A React calendar component with as few frills as humanly possible.</h3>
        <Calendar
          dayAbbrevs={['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']}
          dayHeaderClassName="calendar-day-header"
          dayHeaderStyle={Calendar.DayHeaderStyles.InFirstMonth}
          firstRenderedDay={this.state.startDate}
          lastRenderedDay={this.state.endDate}
          monthClassName="calendar-month"
          monthHeaderFormat="MMMM YYYY"
          monthHeaderClassName="calendar-month-header"
          renderDay={renderDay}
          renderMonthHeader={renderMonthHeader}
          weekClassName="calendar-week"
        />
      </div>
    )
  }
}
