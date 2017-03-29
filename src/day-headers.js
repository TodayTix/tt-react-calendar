import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';

// A bit of a roundabout way to get what the first day of the week is, according
// to the locale used by moment. This works because .weekday is locale-specific,
// and .day always starts with Sunday as 0.
const firstWeekday = moment().weekday(0).day();

export default function CalendarDayHeaders(props) {
  const {
    className,
    dayAbbrevs,
  } = props;

  return (
    <div className={classNames('tt-cal-dayHeaders', className)}>
      {_.range(firstWeekday, firstWeekday + 7).map((weekday) => (
        <div key={weekday % 7} className="tt-cal-columnHeader">
          {dayAbbrevs[weekday % 7]}
        </div>
      ))}
    </div>
  );
}

CalendarDayHeaders.propTypes = {
  className: PropTypes.string,
  dayAbbrevs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
