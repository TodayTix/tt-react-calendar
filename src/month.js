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
  // NOTE(Jeremy): The "e" is the locale-specific day of the week. If that
  // changes, it should invalidate the cache.
  (firstDay, lastDay) =>
    `${firstDay.format('eYYYYMMDD')}-${lastDay.format('eYYYYMMDD')}`
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

/**
 * Generates an array of dummy day elements to fill up space and make alignment
 * work correctly. Gutters get weird when we don't have a consistent number of
 * elements in every row, so these dummy elements help us get around that.
 * The fact that they're needed is making me wish CSS Grid Layout had better
 * support. Old iOS makes me sad.
 * @param  {number}   num                    How many dummy elements
 * @param  {string}   options.gutterWidth    CSS length
 * @param  {?boolean} options.firstHasMargin
 *   Should the first dummy element have a margin-left? Defaults to false.
 * @return {Array.<ReactElement>}
 */
const dummyDays = (num, { gutterWidth, firstHasMargin = false }) =>
  _.times(num, (n) => (
    <div
      key={n}
      className="tt-cal-dummyDay"
      style={{
        marginLeft: (firstHasMargin || n !== 0 ? gutterWidth : null),
      }}
    />
  ));

/* NOTE(Jeremy):
 * This is _usually_ a single month to be rendered. However, if the outer
 * calendar component has the `compactMonths` flag set, then this gets
 * `headerInsideDay`, and at that point should only be considered a collection
 * of days, not limited to a single month.
 */
export default function CalendarMonth(props) {
  const {
    className,
    dayAbbrevs,
    dayHeaderClassName,
    firstDay,
    firstWeekday,
    gutterWidth,
    headerClassName,
    headerFormat,
    headerInsideDay,
    includeDayHeaders,
    lastDay,
    renderDay,
    renderHeader,
    weekClassName,
  } = props;

  const dayWeeks = partitionByWeek(daysInRange(firstDay, lastDay));

  return (
    <div
      className={classNames(
        className,
        { 'tt-cal-headerInsideDay': headerInsideDay }
      )}
    >
      { headerInsideDay ?
        null :
        <h3 className={headerClassName}>
          {renderHeader(firstDay, headerFormat)}
        </h3>
      }
      { includeDayHeaders ?
        <CalendarDayHeaders
          className={dayHeaderClassName}
          dayAbbrevs={dayAbbrevs}
          firstWeekday={firstWeekday}
          gutterWidth={gutterWidth}
        /> :
        null
      }
      <div>
        {
          _.map(dayWeeks, (days, week) => (
            <div
              key={week}
              className={classNames('tt-cal-week', weekClassName)}
            >
              {/* Left dummy days */}
              { days[0].isSame(firstDay) ?
                dummyDays(days[0].weekday(), { gutterWidth }) :
                null
              }

              {/* Actual days */}
              {
                days.map((day) => {
                  const shouldRenderHeader = (
                    headerInsideDay && (
                      // We're either the first day rendered, or
                      // the first day of a new month.
                      day.isSame(firstDay) ||
                      day.date() === 1
                    )
                  );

                  return (
                    <div
                      key={day.format('YYYYMMDD')}
                      className="tt-cal-day"
                      style={{
                        marginLeft: (day.weekday() === 0 ? null : gutterWidth),
                      }}
                    >
                      { shouldRenderHeader ?
                        <h3
                          className={classNames(
                            'tt-cal-inlineMonthHeader',
                            headerClassName
                          )}
                        >
                          {renderHeader(day, headerFormat)}
                        </h3> :
                        null
                      }
                      {renderDay(day)}
                    </div>
                  );
                })
              }

              {/* Right dummy days */}
              { parseInt(week, 10) === lastDay.week() ?
                dummyDays(7 - (lastDay.weekday() + 1), {
                  gutterWidth,
                  firstHasMargin: true,
                }) :
                null
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
  dayHeaderClassName: PropTypes.string,
  firstDay: PropTypes.instanceOf(moment).isRequired,
  firstWeekday: PropTypes.number,
  gutterWidth: PropTypes.string,
  headerClassName: PropTypes.string,
  headerFormat: PropTypes.string.isRequired,
  headerInsideDay: PropTypes.bool.isRequired,
  includeDayHeaders: PropTypes.bool.isRequired,
  lastDay: PropTypes.instanceOf(moment).isRequired,
  renderDay: PropTypes.func.isRequired,
  renderHeader: PropTypes.func.isRequired,
  weekClassName: PropTypes.string,
};

CalendarMonth.defaultProps = {
  headerInsideDay: false,
  includeDayHeaders: true,
};
