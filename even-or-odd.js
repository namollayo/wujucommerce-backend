const evenOrOdd = process.argv[2];
const number = Number(process.argv[3]);

const computerChoice = evenOrOdd.toLowerCase() === 'even' ? 'odd' : 'even';

const computerNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

const sum = number + computerNumber(0,10)

const result = sum % 2 === 0? 'won' : 'lost'

console.log( `You chose ${evenOrOdd} and the computer chose ${computerChoice}. The result was ${sum}. You ${result}!`);