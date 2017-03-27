import moment from 'moment';
import { PropTypes } from 'react';

/**
 * To be used in PropTypes - anything that can be passed to moment.
 * @type {PropType}
 */
export const day = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment),
]);
