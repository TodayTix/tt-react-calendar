import test from 'ava';
import React from 'react';
import moment from 'moment';
import { render, shallow } from 'enzyme';

import TTReactCalendar from '../src';
import DayHeaders from '../src/day-headers';

const abbrevs = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

test.beforeEach(t => {
  t.context.prevLocale = moment.locale();
});

test.afterEach(t => {
  moment.locale(t.context.prevLocale);
});

test.serial('renders day headers in en-gb starting with Monday', t => {
  moment.locale('en-gb');

  const wrapper = shallow(<DayHeaders dayAbbrevs={abbrevs} />);
  const firstHeader = wrapper.find('.tt-cal-columnHeader').first();

  t.is(firstHeader.text(), abbrevs[1]);
});

test.serial('renders day headers in en starting with Sunday', t => {
  moment.locale('en');

  const wrapper = shallow(<DayHeaders dayAbbrevs={abbrevs} />);
  const firstHeader = wrapper.find('.tt-cal-columnHeader').first();

  t.is(firstHeader.text(), abbrevs[0]);
});

test.serial('properly aligns by the week in en-gb', t => {
  moment.locale('en-gb');

  // Go from Friday April 14 to Sunday April 23.
  // In en-gb, this should only be 2 weeks, because new weeks start on Monday
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const weekWrappers = wrapper.find('.tt-cal-week');

  t.is(weekWrappers.length, 2);
});

test.serial('properly aligns by the week in en', t => {
  moment.locale('en');

  // Go from Friday April 14 to Sunday April 23.
  // In en-gb, this would only be 2 weeks, because new weeks start on Monday,
  // but in en it's 3 weeks.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const weekWrappers = wrapper.find('.tt-cal-week');

  t.is(weekWrappers.length, 3);
});

test.serial('has the correct number of dummy days inserted in en-gb', t => {
  moment.locale('en-gb');

  // Go from Friday April 14 to Sunday April 23.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const firstWeek = wrapper.find('.tt-cal-week').first();
  const dummyDays = firstWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 4);
});

test.serial('has the correct number of dummy days inserted in en', t => {
  moment.locale('en');

  // Go from Friday April 14 to Sunday April 23.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const firstWeek = wrapper.find('.tt-cal-week').first();
  const dummyDays = firstWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 5);
});
