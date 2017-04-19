import test from 'ava';
import React from 'react';
import { render, shallow } from 'enzyme';
import $ from 'cheerio';

import TTReactCalendar from '../src';
import DayHeaders from '../src/day-headers';

const abbrevs = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

test('adds dummy days to the beginning of the first week', t => {
  // Go from Friday April 14 to Sunday April 23.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const firstWeek = wrapper.find('.tt-cal-week').first();
  const dummyDays = firstWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 5);
});

test('adds dummy days to the end of the last week', t => {
  // Go from Friday April 14 to Sunday April 23.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-04-23"
  />);
  const firstWeek = wrapper.find('.tt-cal-week').last();
  const dummyDays = firstWeek.find('.tt-cal-dummyDay');

  t.is(dummyDays.length, 6);
});

test('has 7 children in every week across multiple months', t => {
  // Go from Friday April 14 to Wednesday June 21.
  const wrapper = render(<TTReactCalendar
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-06-21"
    monthClassName="testMonth"
  />);
  const months = wrapper.find('.testMonth').toArray();

  months.forEach((monthEl) => {
    const weeks = $(monthEl).find('.tt-cal-week').toArray();

    weeks.forEach((weekEl) => {
      // Some might be dummy days, but there should always be 7 so that spacing
      // is consistent.
      t.is(weekEl.children.length, 7);
    });
  });

  t.is(months.length, 3);
});

test('includes margins on all but first day header', t => {
  const wrapper = shallow(<DayHeaders
    dayAbbrevs={abbrevs}
    gutterWidth="23px"
  />);

  const headers = wrapper.find('.tt-cal-columnHeader');

  t.is(headers.length, 7);
  headers.forEach((header, i) => {
    const expected = (i === 0 ?
      null :
      '23px'
    );
    t.is(header.prop('style').marginLeft, expected);
  });
});
