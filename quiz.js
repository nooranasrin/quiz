let { stdin, stdout } = process;
const chalk = require("chalk");
let questions = require("./questions.json");
stdin.setEncoding("utf8");
let correctAnsCount = 0;

const setTimer = () => {
  return setTimeout(() => {
    console.log(chalk.red("\ntimeout...\n"));
    stdin.emit("data");
  }, 10000);
};

const printQuestions = ques => {
  const { question, a, b, c, d } = ques;
  stdout.write(`${question}\n${a}\n${b}\n${c}\n${d}\n\n`);
};

const isCorrectAns = function(question, answer) {
  const correctAns = `${question["answer"]}\n`;
  return answer == correctAns;
};

const setQuestionTimeIntervel = function(questionNum) {
  printQuestions(questions[questionNum]);
  let timer = setTimer();
  return timer;
};

function displayIsAnsCorrectOrWrong(answer, questionNum) {
  let result = `..Ooops!.Your answer is wrong 😰\ncorrect ans : ${questions[questionNum].answer}`;
  if (isCorrectAns(questions[questionNum], answer)) {
    result = `.......Your answer is correct......🥳`;
    correctAnsCount += 1;
  }
  stdout.write(` ${result}\n\n`);
}

const main = function() {
  let questionNum = 0;
  let timeForQuestion = setQuestionTimeIntervel(questionNum);
  stdin.on("data", answer => {
    answer && displayIsAnsCorrectOrWrong(answer, questionNum);
    clearTimeout(timeForQuestion);
    questionNum += 1;
    timeForQuestion = setQuestionTimeIntervel(questionNum);
  });
};

process.on("uncaughtException", () => {
  stdout.write("Quiz is over\n");
  stdout.write(`your total scores : ${correctAnsCount * 5}/25 \n`);
  process.exit(0);
});

main();
