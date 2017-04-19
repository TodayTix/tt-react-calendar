import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import TTReactCalendar from '../src';

const momentMatcher = (dt, period) =>
  sinon.match(value => dt.isSame(value, period));

test('calls the renderDay function once with each day', t => {
  const renderDay = sinon.spy(day => day.date());
  const firstDay = moment('2017-04-19').startOf('day');
  const lastDay = moment('2017-05-17').startOf('day');

  mount(<TTReactCalendar
    firstRenderedDay={firstDay}
    lastRenderedDay={lastDay}
    renderDay={renderDay}
  />);

  const walker = firstDay.clone();
  while (walker.isSameOrBefore(lastDay, 'day')) {
    // A spy scoped to the date that we're currently looking at.
    const scopedSpy = renderDay.withArgs(momentMatcher(walker, 'day'));

    t.true(
      scopedSpy.calledOnce,
      (
        'renderDay should have been called once with ' +
        `${walker.format('YYYY-MM-DD')}, but instead was called ` +
        `${scopedSpy.callCount} times.\n\nActual calls: [${
          renderDay.args.map(
            ([arg]) => arg && arg.format('YYYY-MM-DD')
          ).join(', ')
        }]`
      )
    );

    walker.add(1, 'day');
  }
});

test('outputs the results of the given renderDay function in order', t => {
  const firstDay = moment('2017-04-19').startOf('day');
  const lastDay = moment('2017-05-17').startOf('day');
  const format = 'dddd, YYYYMMDD';
  const wrapper = mount(<TTReactCalendar
    firstRenderedDay={firstDay}
    lastRenderedDay={lastDay}
    renderDay={day => <div className="test-day">{day.format(format)}</div>}
  />);

  const dayDivs = wrapper.find('.test-day');

  const walker = firstDay.clone();
  while (walker.isSameOrBefore(lastDay, 'day')) {
    const idx = walker.diff(firstDay, 'days');
    const div = dayDivs.at(idx);

    t.true(div.exists(), `div at index ${idx} was not rendered`);
    t.is(div.text(), walker.format(format));

    walker.add(1, 'day');
  }
});
