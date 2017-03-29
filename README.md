# TT React Calendar

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

## Description

A no-frills calendar widget that lets you bring your own styling. This component
takes a start date, an end date, and a `renderDay` function, and then gets out
of the way.

## Installation

```sh
npm install --save tt-react-calendar
```

## Usage

```javascript
import Calendar from 'tt-react-calendar';

function renderDay(day) {
  return <div className="day">{day.format('dd')}</div>
}

function MyComponent() {
  return (
    <Calendar
      className="calendar-container"
      dayAbbrevs={['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']}
      dayHeaderClassName="calendar-day-header"
      dayHeaderStyle={Calendar.DayHeaderStyles.InFirstMonth}
      firstRenderedDay="2016-12-25"
      lastRenderedDay="2017-02-12"
      monthClassName="calendar-month"
      monthHeaderFormat="MMMM YYYY"
      renderDay={renderDay}
      weekClassName="calendar-week"
    />
  );
}
```

### Properties

Name | Type | Description
-----|------|-------------
`className` | string | Class name for the calendar's container element
`dayAbbrevs` | Array.&lt;string&gt; | Array of day names, starting with Sunday. Defaults to `['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']`.
`dayHeaderClassName` | string | Class name for the day header container element
`dayHeaderStyle` | Enum | Determines where the day column headers are rendered. Can be one of `Calendar.DayHeaderStyles.InFirstMonth` (the default), `Calendar.DayHeaderStyles.AboveFirstMonth`, or `Calendar.DayHeaderStyles.InEveryMonth`
`firstRenderedDay` | _varied_ | The first date that will be rendered as part of the calendar. Can be any type that [moment's constructor](http://momentjs.com/docs/#/parsing/) supports.
`lastRenderedDay` | _varied_ | The last date that will be rendered as part of the calendar. Can be any type that [moment's constructor](http://momentjs.com/docs/#/parsing/) supports.
`monthClassName` | string | Class name to add to each month element
`monthHeaderFormat` | string | Format of the month header text. See [moment.format](http://momentjs.com/docs/#/displaying/format/) for the available options. Defaults to `'MMMM YYYY'`.
`renderDay` | function | A function that takes a moment object of a single day as a parameter and returns a React element. Defaults to `(day) => <div>{day.format('YYYY-MM-DD')}</div>`
`weekClassName` | string | Class name for the week element

### Browser Support

This is still a very young project, so it hasn't been actively tested in cross
browser environments. That being said, given the technologies being used, it
_should_ work in any browser that supports some form of flexbox.

![Google Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.0.0/chrome/chrome_48x48.png) | ![Mozilla Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.0.0/firefox/firefox_48x48.png) | ![Microsoft Internet Explorer](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.0.0/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Microsoft Edge](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.0.0/edge/edge_48x48.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/41.0.0/safari/safari_48x48.png)
-----|-----|-----|-----|-----
 Yes | Yes | 10+ | Yes | Yes

[See caniuse.com for more details](http://caniuse.com/#feat=flexbox)

## Development

Issues/PRs welcome! Linting/automated tests coming soon.

## Meta

Distributed under the MIT License. See ``LICENSE`` for more information.

Developers:

_[Jeremy Tice](https://github.com/jetpacmonkey)_
[@jetpacmonkey](https://twitter.com/jetpacmonkey)

[npm-image]: https://img.shields.io/npm/v/tt-react-calendar.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tt-react-calendar
[npm-downloads]: https://img.shields.io/npm/dm/tt-react-calendar.svg?style=flat-square
