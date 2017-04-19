import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';

import TTReactCalendar from '../src';
import DayHeaders from '../src/day-headers';
import Month from '../src/month';

test('dayHeaderStyle AboveFirstMonth only renders one header', t => {
  const wrapper = mount(<TTReactCalendar
    dayHeaderStyle={TTReactCalendar.DayHeaderStyles.AboveFirstMonth}
    firstRenderedDay="2017-04-14"
    lastRenderedDay="2017-06-21"
  />);

  const headers = wrapper.find('.tt-cal-dayHeaders');

  t.is(headers.length, 1);
});

test(
  'dayHeaderStyle AboveFirstMonth renders its header as a direct child',
  t => {
    const wrapper = mount(<TTReactCalendar
      dayHeaderStyle={TTReactCalendar.DayHeaderStyles.AboveFirstMonth}
      firstRenderedDay="2017-04-14"
      lastRenderedDay="2017-06-21"
    />);

    const headers = wrapper.children().filter(DayHeaders);

    t.is(headers.length, 1);
  }
);

test(
  'dayHeaderStyle InFirstMonth renders its header inside the first month',
  t => {
    const wrapper = mount(<TTReactCalendar
      dayHeaderStyle={TTReactCalendar.DayHeaderStyles.InFirstMonth}
      firstRenderedDay="2017-04-14"
      lastRenderedDay="2017-06-21"
    />);

    const headers = wrapper.find(DayHeaders);

    t.is(headers.length, 1, 'There should only be one header in the component');

    const months = wrapper.find(Month);

    const monthHeaders = months.first().children().filter(DayHeaders);

    t.is(monthHeaders.length, 1);
  }
);

test(
  'dayHeaderStyle InEveryMonth renders its header inside each month',
  t => {
    const wrapper = mount(<TTReactCalendar
      dayHeaderStyle={TTReactCalendar.DayHeaderStyles.InEveryMonth}
      firstRenderedDay="2017-04-14"
      lastRenderedDay="2017-06-21"
    />);

    const headers = wrapper.find(DayHeaders);

    t.is(headers.length, 3);

    const months = wrapper.find(Month);

    months.forEach(month => {
      const monthHeaders = month.children().filter(DayHeaders);

      t.is(monthHeaders.length, 1);
    });
  }
);
