const theQuestion=document.getElementById("question")
const btn1=document.getElementById("btn-1");
const btn2=document.getElementById("btn-2");
const btn3=document.getElementById("btn-3");
const btn4=document.getElementById("btn-4");
const Next=document.getElementById('next');
const theScore=document.getElementById('score');
const generalknowledge=9;
const computers=18;
const math=19;
const geo=22;
let score=0;
let game_started=false;
async function get_data(choice){
try {
    const response=await fetch(`https://opentdb.com/api.php?amount=10&category=${choice}&difficulty=easy&type=multiple`)
    let data=await response.json();
    return data.results;
} catch (error){
    console.log(error);
}
}
let data;
let counter=0;
async function run(choice){
game_started=true;
data=await get_data(choice);
showQuestions();
}
function showQuestions(){
[btn1,btn2,btn3,btn4].forEach((btn)=>btn.classList.remove("wrong","correct","disabled"));
Next.style.display="none";
let question=data[counter].question;
let correctAnswer=data[counter].correct_answer;
let incorrectAnswers=data[counter].incorrect_answers;
let answers_array=[correctAnswer];
for(let i=0;i<3;i++){
answers_array.push(incorrectAnswers[i]);
}
theQuestion.textContent=decodeHTMLEntities(question);
let i=0;
let numbers=[];
let correctButton
while(i<4){
let number=Math.floor(Math.random()*4)+1;
if(numbers.includes(number)===false){
    if(i===0){
      correctButton=number;
    }
       numbers.push(number);
switch (number){
    case 1:
        btn1.textContent=decodeHTMLEntities(answers_array[i]);
        break;
    case 2:
        btn2.textContent=decodeHTMLEntities(answers_array[i]);
        break;
    case 3:
        btn3.textContent=decodeHTMLEntities(answers_array[i]);
         break;
    case 4:
        btn4.textContent=decodeHTMLEntities(answers_array[i]);
    break;
}
i++
}
}
btn1.onclick=()=>compare(correctButton,correctAnswer,btn1.textContent,1);
btn2.onclick=()=>compare(correctButton,correctAnswer,btn2.textContent,2);
btn3.onclick=()=>compare(correctButton,correctAnswer,btn3.textContent,3);
btn4.onclick=()=>compare(correctButton,correctAnswer,btn4.textContent,4);
}
function compare(correctButton,correctAnswer,userAnswer,clicked){
let btn=document.getElementById(`btn-${correctButton}`);
let clk=document.getElementById(`btn-${clicked}`);
if(correctAnswer===userAnswer){
btn.classList.add('correct');
score++;
}
else{
btn.classList.add('correct');
clk.classList.add("wrong");
}
Next.style.display="block";
[btn1,btn2,btn3,btn4].forEach((btn)=>btn.classList.add('disabled'));
}
Next.addEventListener("click",()=>{
    counter++;
    if(counter<data.length){
      showQuestions();
    }
   else{
     theScore.textContent=`You scored:${score}/10!`
     Next.textContent="Play again!";
     Next.onclick=()=>location.reload();
    }
})
function decodeHTMLEntities(text){
    let parser = new DOMParser();
    let decoded = parser.parseFromString(text, "text/html");
    return decoded.documentElement.textContent;
}
if(game_started==false){
btn1.onclick=()=>run(generalknowledge);
btn2.onclick=()=>run(computers);
btn3.onclick=()=>run(math);
btn4.onclick=()=>run(geo);
}
