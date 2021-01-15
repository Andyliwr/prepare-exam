const q1 = require('./exams/1');
const q2 = require('./exams/2');
const q3 = require('./exams/3');
const q4 = require('./exams/4');
const q5 = require('./exams/5');

const exam = [ q1, q2, q3, q4, q5 ];

async function collectTestResults () {
  const results = [];
  for (let i = 0; i < exam.length; i++) {
    const testResult = await exam[i]();
    console.log(`第 ${i + 1} 题结果: ${testResult}`);
  }
}

(async () => {
  await collectTestResults();
})();