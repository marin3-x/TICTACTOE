const box = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".resetBtn");
const newGameBtn = document.querySelector(".newBtn");
const msgDiv = document.querySelector(".msg-div");
let msg = document.querySelector("#msg");
let turn0 = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let resetGame = () => {
    let turn0 = true;
    enableBox();
    document.querySelector('.container').classList.remove("blur");
    msgDiv.style.display = "none";
    console.log("Game is reset");

}
let disableBox = () => {
    box.forEach(boxes => {
        boxes.disabled = true;
    });
}
let enableBox = () => {
    box.forEach(boxes => {
        boxes.disabled = false;
        boxes.innerText = "";
        boxes.style.backgroundColor = "";
    });
}
let drawGame = () => {
    msg.innerText = `Opps, the game is draw`;
    document.querySelector('.container').classList.add("blur");
    msgDiv.style.display = 'block';
}
let count = 0;
box.forEach((boxes) => {
    boxes.addEventListener("click", () => {
        console.log("btn was clicked");
        if (turn0) {
            boxes.innerText = "o";
            boxes.style.color = "royalblue";
            boxes.style.backgroundColor = "#10122b";
            turn0 = false;
        }
        else {
            boxes.innerText = "x"; 
            boxes.style.color = "tomato";
            boxes.style.backgroundColor = "#10122b";
            turn0 = true;
        }
        boxes.disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            drawGame();
          }
    });
});

let showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    document.querySelector('.container').classList.add("blur");
    msgDiv.style.display = 'block';
};
const checkWinner = () => {
    for (let patterns of winPatterns) {
        let pos1Val = box[patterns[0]].innerText;
        let pos2Val = box[patterns[1]].innerText;
        let pos3Val = box[patterns[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log(`Winner is ${pos1Val}`);
                disableBox();
                showWinner(pos1Val);
            }
        }
    }
}
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);