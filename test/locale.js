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

test('respects the firstWeekday prop for Monday', t => {
  const wrapper = shallow(<DayHeaders dayAbbrevs={abbrevs} firstWeekday={1} />);
  const firstHeader = wrapper.find('.tt-cal-columnHeader').first();

  t.is(firstHeader.text(), abbrevs[1]);
});

test('respects the firstWeekday prop for Sunday', t => {
  const wrapper = shallow(<DayHeaders dayAbbrevs={abbrevs} firstWeekday={0} />);
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

test.serial('has the correct number of leading dummy days in en-gb', t => {
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

test.serial('has the correct number of trailing dummy days in en-gb', t => {
  moment.locale('en-gb');

  // Go from Wednesday April 26 to Thursday May 25.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-26"
    lastRenderedDay="2017-05-25"
  />);
  const lastWeek = wrapper.find('.tt-cal-week').last();
  const dummyDays = lastWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 3);
});

test.serial('has the correct number of leading dummy days in en', t => {
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

test.serial('has the correct number of trailing dummy days in en', t => {
  moment.locale('en');

  // Go from Wednesday April 26 to Thursday May 25.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-26"
    lastRenderedDay="2017-05-25"
  />);
  const lastWeek = wrapper.find('.tt-cal-week').last();
  const dummyDays = lastWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 2);
});

test.serial('respects the instance locale over the global one', t => {
  moment.locale('en');

  // Go from Wednesday April 26 to Thursday May 25.
  const firstDay = moment('2017-04-26').locale('en-gb');
  const lastDay = moment('2017-05-25').locale('en-gb');

  const wrapper = render(<TTReactCalendar
    dayHeaderStyle={TTReactCalendar.DayHeaderStyles.AboveFirstMonth}
    firstRenderedDay={firstDay}
    lastRenderedDay={lastDay}
  />);

  const firstWeek = wrapper.find('.tt-cal-week').first();
  const firstWeekDummyDays = firstWeek.find('.tt-cal-dummyDay');
  const dayHeaders = wrapper.find('.tt-cal-dayHeaders');
  const firstHeader = dayHeaders.find('.tt-cal-columnHeader').first();

  t.is(firstWeekDummyDays.length, 2, 'incorrect number of leading dummy days');
  t.is(firstHeader.text(), abbrevs[1]);
});
