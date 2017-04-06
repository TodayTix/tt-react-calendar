import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';

export default function CalendarDayHeaders(props) {
  const {
    className,
    dayAbbrevs,
    gutterWidth,
  } = props;

  const firstWeekday = moment.localeData().firstDayOfWeek();

  return (
    <div className={classNames('tt-cal-dayHeaders', className)}>
      {_.range(firstWeekday, firstWeekday + 7).map((weekday, idx) => (
        <div
          key={weekday % 7}
          className="tt-cal-columnHeader"
          style={{
            marginLeft: (idx === 0 ? null : gutterWidth),
          }}
        >
          {dayAbbrevs[weekday % 7]}
        </div>
      ))}
    </div>
  );
}

CalendarDayHeaders.propTypes = {
  className: PropTypes.string,
  dayAbbrevs: PropTypes.arrayOf(PropTypes.string).isRequired,
  gutterWidth: PropTypes.string,
};
