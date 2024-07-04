let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","green","purple"];

let started=false;
let level=0;
let highestScore=0;
let startbtn=document.querySelector(".startbtn")

startbtn.onclick=startGame

function startGame(){
    if (!started){
        started=true;
        levelUp();
        startbtn.style.display="None";
    }
 
}

document.addEventListener("keypress",startGame);

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash")
    },250);
}

let h2=document.querySelector("h2");
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level${level}`
    let randinx=Math.floor(Math.random()*3);
    let randcolor=btns[randinx]
    gameSeq.push(randcolor);
    let randbtn=document.querySelector(`.${randcolor}`)
    gameFlash(randbtn)

}

function checkans(idx){
    if (userSeq[idx]==gameSeq[idx]){
        if (userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br> Press any key to Start again`;
        document.querySelector("body").style.backgroundColor="red";
        document.querySelector("#error").play();
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="antiquewhite";
        },250)
        startbtn.style.display="inline-block"
        if(level>highestScore){
            highestScore=level;
            document.querySelector(".high").innerHTML=`High Score : ${level}`;
            setTimeout(function(){alert(`Congratulations !! New High Score : ${highestScore}`)},1000);
        }
        reset();
    }
}

function btnpress(){

    let btn=this;
    userFlash(btn);
    let usercolor=btn.getAttribute("id")
    userSeq.push(usercolor)

    checkans(userSeq.length-1)
}
let allbtns=document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click",btnpress)
}
function reset(){
    started=0;
    gameSeq=[];
    userSeq=[];
    level=0;
    

}