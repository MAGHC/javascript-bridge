const MapMaker = require('./MapMaker');

class BridgeMap {
  #isFirst = true;

  #FIRST_MAP_SOURCE = { CORRECT: 'O', INCORRECT: 'X', EMPTY: ' ' };

  #MAP_SOURCE = { CORRECT: '| O', INCORRECT: '| X' };

  #bridgeMap;

  handleMap(boolean, input, beforeMap) {
    if (this.#isFirst) this.#bridgeMap = this.addFirstMap(boolean, input, beforeMap);
    if (!this.#isFirst) this.#bridgeMap = this.addMap(boolean, input, beforeMap);
  }

  addFirstMap(boolean, input, beforeMap = MapMaker.makeMap()) {
    this.#isFirst = false;
    if (boolean) return this.addCorrect(input, beforeMap, this.#FIRST_MAP_SOURCE);
    if (!boolean) return this.addIncorrect(input, beforeMap, this.#FIRST_MAP_SOURCE);
  }

  addMap(boolean, input, beforeMap) {
    if (boolean) return this.addCorrect(input, beforeMap, this.#MAP_SOURCE);
    if (!boolean) return this.addIncorrect(input, beforeMap, this.#MAP_SOURCE);
  }

  addCorrect(input, beforeMap = [[], []], mapSource = this.#FIRST_MAP_SOURCE) {
    const [up, down] = beforeMap;
    if (input === 'D') {
      up.push(mapSource.EMPTY);
      down.push(mapSource.CORRECT);
    } else {
      up.push(mapSource.CORRECT);
      down.push(mapSource.EMPTY);
    }
    return [up, down];
  }

  addIncorrect(input, beforeMap, mapSource) {
    const [up, down] = beforeMap;
    if (input === 'D') {
      down.push(mapSource.INCORRECT);
      up.push(mapSource.CORRECT);
    } else {
      down.push(mapSource.CORRECT);
      up.push(mapSource.INCORRECT);
    }
    return [up, down];
  }

  //   correctAdd(input,beforeMap)
}

module.exports = BridgeMap;

const app = new BridgeMap();

console.log(app.addCorrect('D'));
