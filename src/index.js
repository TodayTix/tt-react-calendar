import React, { PropTypes } from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';

import { day as dayType } from './proptypes';

import CalendarDayHeaders from './day-headers';
import CalendarMonth from './month';

/**
 * Turns a moment instance into a serialized string that's unique for a month
 * and the object's locale's first day of the week. This ensures that the range
 * of months only regenerates if the locale changes, or different months are
 * passed in for the start and end dates, maximizing efficiency for re-renders.
 * @param  {moment} day
 * @return {string}
 */
const monthKey = (day) =>
  `${day.localeData().firstDayOfWeek()}${day.format('YYYYMMZZ')}`;

/**
 * Takes two inclusive endpoints and returns an array of moment objects for the
 * first of each month between those endpoints.
 * @param  {moment} firstDay
 * @param  {moment} lastDay
 * @return {Array.<moment>}
 */
const getMonthsInRange = _.memoize(
  _.flow(
    // Wrap in an array to more easily have multiple values flow through these
    // functions.
    (firstDay, lastDay) => [firstDay, lastDay],

    // Move both days to the start of their months so the math is more
    // consistent.
    fp.map(day => day.clone().startOf('month')),

    // Actually generate the moment objects for each month.
    ([firstDay, lastDay]) => _.times(
      lastDay.diff(firstDay, 'months') + 1,
      (n) => firstDay.clone().add(n, 'months')
    )
  ),
  // memoize key function
  (firstDay, lastDay) => `${monthKey(firstDay)}-${monthKey(lastDay)}`
);

const DayHeaderStyles = {
  AboveFirstMonth: 'above-first',
  InEveryMonth: 'in-every',
  InFirstMonth: 'in-first',
};

export default function Calendar(props) {
  const {
    className,
    compactMonths,
    dayAbbrevs,
    dayHeaderClassName,
    dayHeaderStyle,
    firstRenderedDay,
    gutterWidth,
    lastRenderedDay,
    monthClassName,
    monthHeaderClassName,
    monthHeaderFormat,
    renderDay,
    renderMonthHeader,
    weekClassName,
  } = props;

  const firstDay = moment(firstRenderedDay);
  const lastDay = moment(lastRenderedDay);
  const months = (compactMonths ?
    [firstDay] :
    getMonthsInRange(firstDay, lastDay)
  );
  const firstWeekday = firstDay.localeData().firstDayOfWeek();

  return (
    <div className={className}>
      { dayHeaderStyle === DayHeaderStyles.AboveFirstMonth ?
        <CalendarDayHeaders
          className={dayHeaderClassName}
          dayAbbrevs={dayAbbrevs}
          firstWeekday={firstWeekday}
          gutterWidth={gutterWidth}
        /> :
        null
      }
      {months.map((firstOfMonth, idx) => (
        <CalendarMonth
          className={monthClassName}
          dayAbbrevs={dayAbbrevs}
          dayHeaderClassName={dayHeaderClassName}
          firstDay={moment.max(
            firstOfMonth,
            firstDay
          )}
          firstWeekday={firstWeekday}
          gutterWidth={gutterWidth}
          headerClassName={monthHeaderClassName}
          headerInsideDay={compactMonths}
          headerFormat={monthHeaderFormat}
          includeDayHeaders={
            dayHeaderStyle === DayHeaderStyles.InEveryMonth ||
            (dayHeaderStyle === DayHeaderStyles.InFirstMonth && idx === 0)
          }
          key={firstOfMonth.format('YYYYMM')}
          lastDay={compactMonths ?
            lastDay :
            moment.min(
              firstOfMonth.clone().endOf('month'),
              lastDay
            )
          }
          renderDay={renderDay}
          renderHeader={renderMonthHeader}
          weekClassName={weekClassName}
        />
      ))}
    </div>
  );
}

Calendar.propTypes = {
  className: PropTypes.string,
  compactMonths: PropTypes.bool.isRequired,

  // Array of 7 strings to use as column headers for days. Start with Sunday.
  dayAbbrevs: PropTypes.arrayOf(PropTypes.string).isRequired,
  dayHeaderClassName: PropTypes.string,
  dayHeaderStyle: PropTypes.oneOf(_.values(DayHeaderStyles)),
  firstRenderedDay: dayType.isRequired,
  gutterWidth: PropTypes.string,
  lastRenderedDay: dayType.isRequired,
  monthClassName: PropTypes.string,
  monthHeaderClassName: PropTypes.string,
  monthHeaderFormat: PropTypes.string,

  // Function that takes a moment instance and returns a single ReactElement.
  renderDay: PropTypes.func.isRequired,
  renderMonthHeader: PropTypes.func.isRequired,
  weekClassName: PropTypes.string,
};

Calendar.defaultProps = {
  compactMonths: false,
  dayAbbrevs: ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
  dayHeaderStyle: DayHeaderStyles.InFirstMonth,
  monthHeaderFormat: 'MMMM YYYY',
  renderDay: (day) => <div>{day.format('YYYY-MM-DD')}</div>,
  renderMonthHeader: (day, format) => day.format(format),
};

Calendar.DayHeaderStyles = DayHeaderStyles;
