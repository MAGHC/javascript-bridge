const { Console } = require('@woowacourse/mission-utils');

const Utils = Object.freeze({
  input(message, callback) {
    Console.readLine(message, callback);
  },

  print(message) {
    Console.print(message);
  },
});

module.exports = Utils.input;
module.exports = Utils.print;