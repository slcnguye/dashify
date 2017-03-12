/*!
 * plusify <https://github.com/slcnguye/plusify>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function plusify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/([a-z])([A-Z])/g, '$1+$2');
  str = str.replace(/[ \t\W]/g, '+');
  str = str.replace(/^\++|\++$/g, '');
  return str.toLowerCase();
};
