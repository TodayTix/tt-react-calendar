import React, { PropTypes } from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';
import classNames from 'classnames';

import CalendarDayHeaders from './day-headers';

const daysInRange = _.memoize(
  (firstDay, lastDay) => {
    const arr = [];

    // Not just the name of a Trevor Noah special...
    const dayWalker = firstDay.clone();

    while (dayWalker.isSameOrBefore(lastDay, 'day')) {
      arr.push(dayWalker.clone());
      dayWalker.add(1, 'day');
    }

    return arr;
  },
  // memoization key
  (firstDay, lastDay) =>
    `${firstDay.format('YYYYMMDD')}-${lastDay.format('YYYYMMDD')}`
);

/**
 * Takes an array of days, and breaks them into an array of arrays, grouped by
 * week.
 * @example
 * partitionByWeek(daysInRange(moment('2017-03-16'), moment('2017-03-27')))
 *
 * // would return (depending on the locale for momentjs)...
 * [
 *   [moment('2017-03-16'), moment('2017-03-17'), moment('2017-03-18')],
 *   [moment('2017-03-19'), moment('2017-03-21'), ...rest of the week],
 *   [moment('2017-03-26'), moment('2017-03-27')],
 * ]
 * @param  {Array.<moment>} days Array of moment day objects to partition
 * @return {Array.<Array.<moment>>}
 */
const partitionByWeek = _.memoize(fp.groupBy(fp.invoke('week')));

export default function CalendarMonth(props) {
  const {
    className,
    dayAbbrevs,
    firstDay,
    headerClassName,
    headerFormat,
    includeDayHeaders,
    lastDay,
    renderDay,
    weekClassName,
  } = props;

  const dayWeeks = partitionByWeek(daysInRange(firstDay, lastDay));
  const numberOfWeeks = _.size(dayWeeks);

  return (
    <div className={className}>
      <h3 className={headerClassName}>
        {firstDay.format(headerFormat)}
      </h3>
      { includeDayHeaders ?
        <CalendarDayHeaders dayAbbrevs={dayAbbrevs} /> :
        null
      }
      <div>
        {
          _.map(dayWeeks, (days, week) => (
            <div
              key={week}
              className={classNames('tt-cal-week', weekClassName)}
            >
              { numberOfWeeks === 1 ?
                // We only have one week, so we need to pad the left with dummy
                // day divs. If we had multiple rows, getting days into the
                // correct column would simply be handled with alignment in CSS.
                _.times(days[0].weekday(), (n) => (
                  <div key={n} className="tt-cal-dummyDay" />
                )) :
                null
              }
              {
                days.map((day) => (
                  <div key={day.format('YYYYMMDD')} className="tt-cal-day">
                    {renderDay(day)}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

CalendarMonth.propTypes = {
  className: PropTypes.string,
  dayAbbrevs: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstDay: PropTypes.instanceOf(moment).isRequired,
  headerClassName: PropTypes.string,
  headerFormat: PropTypes.string.isRequired,
  includeDayHeaders: PropTypes.bool.isRequired,
  lastDay: PropTypes.instanceOf(moment).isRequired,
  renderDay: PropTypes.func.isRequired,
  weekClassName: PropTypes.string,
};

CalendarMonth.defaultProps = {
  includeDayHeaders: true,
};
