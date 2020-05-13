import parse from "./parser.js";
import evaluate from "./evaluator.js";
import topScope from "./scope.js";

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}
