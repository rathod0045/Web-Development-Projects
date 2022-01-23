function genrandomnum() {
    var num=Math.random();
    num=Math.floor(num*6+1);
    return num;
}

var num1=genrandomnum();
var num2=genrandomnum();

document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice"+num1+".png");
document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice"+num2+".png");

if(num1 === num2) {
    document.querySelector(".container h1").innerHTML="Draw!";
}
else if(num1 > num2) {
    document.querySelector(".container h1").innerHTML="Player1 Wins 🎉";
}
else {
    document.querySelector(".container h1").innerHTML="Player2 Wins 👏";
}