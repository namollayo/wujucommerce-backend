const myInput = process.argv[2].toLowerCase()

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let computerChoice = (getRndInteger(1,3)) 

computerChoice === 1 
? computerChoice = 'rock' 
: computerChoice === 2 
? computerChoice ='paper' 
: computerChoice ='scissors'

const matchResult = (myInput, computerChoice) =>{
   let result
    myInput === computerChoice? result = `It's a tie!` 
    : computerChoice === 'rock' && myInput ==='scissors' 
    || computerChoice === 'paper' && myInput ==='rock'
    || computerChoice === 'scissors' && myInput ==='paper'
    ? result = `Sorry, you lost!` : result = `Congrats, you won!`
    return result
}


console.log(`You chose ${myInput} and the PC chose ${computerChoice}. ${matchResult(myInput,computerChoice)}`);