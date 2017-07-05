// modules
import React from 'react';

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

export default function App() {
  return (
    <div className={styles.container}>
      <h1>TT React Calendar</h1>
      <h3>A React calendar component with as few frills as humanly possible.</h3>
      <Calendar
        dayAbbrevs={['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']}
        dayHeaderClassName="calendar-day-header"
        dayHeaderStyle={Calendar.DayHeaderStyles.InFirstMonth}
        firstRenderedDay="2016-12-25"
        lastRenderedDay="2017-04-12"
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
