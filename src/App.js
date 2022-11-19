const InputView = require('./InputView');
const BridgeMaker = require('./BridgeMaker');
const OutputView = require('./OutputView');
const Validator = require('./Validator');
const BridgeGame = require('./BridgeGame');
const BridgeMap = require('./BridgeMap');
const Utils = require('./Utils');

class App {
  #appStatus = 1;

  #bridgeAnswer;

  #bridge;

  #brdigeGame = new BridgeGame();

  #moveAnswer;

  #bridgeMap = new BridgeMap();

  #moveStatement;

  #gameOptionStatus;

  play() {
    OutputView.printStart();
    this.progressApp(this.#appStatus);
  }

  progressApp(appStatus) {
    if (appStatus === 1) return this.progressBridgeMake();
    if (appStatus === 2) {
      this.#appStatus = 3;
      this.#bridge = BridgeMaker.makeBridge(this.#bridgeAnswer);
      return this.progressBridgeMove();
    }
    if (appStatus === 3) return this.progressBridgeMove();
    if (appStatus === 4) {
      this.#moveStatement = this.#brdigeGame.move(this.#moveAnswer, this.#bridge);
      console.log(this.#moveAnswer, this.#bridge, '확인');
      console.log(this.#moveStatement);
      if (this.#moveStatement) {
        this.#bridgeMap.handleMap(this.#moveStatement, this.#moveAnswer);
        // OutputView.printMap(this.#bridgeMap.getMap());
        this.#bridgeMap.cofirm();
        return this.progressBridgeMove();
      }
      if (!this.#moveStatement) {
        this.#bridgeMap.handleMap(this.#moveStatement, this.#moveAnswer);
        this.#appStatus = 5;
        // OutputView.printMap(this.#bridgeMap.getMap());
        this.#bridgeMap.cofirm();
        return this.progressRetryGame();
      }
    }
    if (this.#appStatus === 5) return this.progressRetryGame();
    if (this.#appStatus === 6) {
      if (this.#gameOptionStatus) {
        this.#appStatus = 3;
        return this.progressApp(this.#appStatus);
      }
      if (!this.#gameOptionStatus) {
        OutputView.printResult(
          this.#bridgeMap.getMap(),
          this.#brdigeGame.getNumberOfTry(),
          this.#gameOptionStatus,
        );
      }
    }
  }

  progressBridgeMake() {
    InputView.readBridgeSize((answer) => {
      try {
        Validator.checkBridgeInput(answer);
        this.#bridgeAnswer = +answer;
        this.#appStatus = 2;
      } catch (e) {
        console.log(e, '예외발생');
      } finally {
        this.progressApp(this.#appStatus);
      }
    });
  }

  progressBridgeMove() {
    InputView.readMoving((answer) => {
      try {
        Validator.confirmOfCondition(answer, 'move');
        this.#moveAnswer = answer;
        this.#appStatus = 4;
      } catch (e) {
        console.log(e, '예외발생');
      } finally {
        this.progressApp(this.#appStatus);
      }
    });
  }

  progressRetryGame() {
    InputView.readGameCommand((answer) => {
      try {
        Validator.confirmOfCondition(answer, 'option');
        this.#gameOptionStatus = this.#brdigeGame.retry(answer);
        this.#appStatus = 6;
      } catch (e) {
        console.log(e, '예외발생');
      } finally {
        this.progressApp(this.#appStatus);
      }
    });
  }
}

module.exports = App;

const app = new App();

console.log(app.play());

// 실패가 되면 메서드를 재실행시켜야됨
