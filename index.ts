//******************Custom Alert box from internet********************************** */
function CustomAlert() {
  this.render = function() {
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogoverlay.style.display = "block";
      dialogoverlay.style.height = String(winH) + "px";
      dialogbox.style.left = String((winW / 2) - (550 * .5)) + "px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
      document.getElementById('dialogboxfoot').innerHTML += '<button class="btn btn-success" onclick="Alert.ok()">Yeah!!!</button>';
  }
  this.ok = function() {
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogoverlay').style.display = "none";
  }
}
var Alert = new CustomAlert();
//*****************************************************************************/
let noOfBalls = 0;
let noOfPlayers = 10;
// let possibleRun=[1, 6, 2, 0, 4]
// let run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
let possibleRun = [0, 1, 2, 4, 6];
let runIndex = 0;
let run = possibleRun[runIndex];
class game {
  teams: team[] = [];
  winningTeam: team;
}

class team {
  name: string;
  players: player[] = [];
  score: number[] = [];
  total: number = 0;
  topScorer: {
    player: String;
    score: number;
  };

  constructor(n: string) {
    this.name = n;
  }
}

class player {
  index: number;
  name: String;
  team: string;
  score: number[] = [];
  total: number;
  constructor(n: string, ind: number, t: string) {
    this.name = n;
    this.index = ind;
    this.team = t;
  }
}
let cricket = new game();
let team1 = new team("team-1");
cricket.teams.push(team1);
let team2 = new team("team-2");
cricket.teams.push(team2);
let play = 1;
let hit1 = 1;
let hit2 = 0;
let gen = 0;
let secondsToCountDown = 60;
// var startup = new Audio('startup.mp3');
var warning = new Audio("warning.mp3");

//************************Onload**************************************************
window.onload = () => {
  localStorage.clear();
  let container = <HTMLDivElement>document.createElement("div");
  container.setAttribute("class", "container");
  container.innerHTML = `
    <div class="row text-center">
    <div class="col-4 col-lg-4 text-left" style="font-size:1.3em;"><p id="score1">Team-1 Score for each Ball goes here</p></div>
    <div class="col-4 col-lg-4 text-center">
    <button class="btn btn-dark" onclick="startTimer();" id="start">Start the game</button>
    <h3 id="notifi"><h3>
    </div>
    <div class="col-4 col-lg-4 text-right" style="font-size:1.3em;"><p id="score2">Team-2 Score for each Ball goes here</p></div>
    </div>
    <hr>
    <div class="row text-center">
        <div class="col-4 col-lg-4 text-center">
            <h2>Team-1</h2>
            <h3 id="team1Score">0</h3>
            <button class="btn btn-dark" id="hit1" onclick="hit(1)" disabled>HIT 1</button>
        </div>
        <div class="col-4 col-lg-4 text-center">
          <h2 id="ranRun">Hit the value here to score</h2>
            <h1 class="timerText" >Timer</h1>
            <h3 id="timer" class="timerText ">60</h3>
          
        </div>
        <div class="col-4 col-lg-4 text-center">
            <h2>Team-2</h2>
            <h3 id="team2Score">0</h3>
            <button class="btn btn-dark" id="hit2" onclick="hit(2)" disabled>HIT 2</button>
        </div>
    </div>
    <hr>
    `;
  let container2 = <HTMLDivElement>document.createElement("div");
  container2.setAttribute("class", "container-fluid");
  container2.innerHTML = `<div class="row ">
  <div class="col-lg-4 text-left"></div>
  <div class="col-lg-4 text-center"><a href="result.htm" target="__blank"><button class="btn btn-dark" id="gen"disabled>Generate Result</button></a></div>
  <div class="col-lg-4 text-right"></div>
  </div>`;
  let row = <HTMLDivElement>document.createElement("div");
  row.setAttribute("class", "row");
  row.id = "scoreBoard";
  let col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-12 col-lg-5 text-center");
  col.innerHTML = `<h2>Team-1:Score Board</h2><table class="table table-striped">
  <thead>
    <tr id="thead1">
      
    </tr>
  </thead>
  <tbody id="content1">
  </tbody>
  </table>`;
  row.appendChild(col);

  col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-0 col-lg-2");
  row.appendChild(col);
  col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-12 col-lg-5 text-center");
  col.innerHTML = `<h2>Team-2:Score Board</h2><table class="table table-striped">
  <thead>
    <tr id="thead2">
      
    </tr>
  </thead>
  <tbody id="content2">
  </tbody>
  </table>`;
  row.appendChild(col);
  container2.appendChild(row);
container2.innerHTML+="<br>";
  document.body.appendChild(container);
  document.body.appendChild(container2);
  genTable(1);
  genTable(2);

  for (let i = 0; i < noOfPlayers; i++) {
    let play = new player(`Player-${i + 1}`, i, "team-1");
    team1.players.push(play);
  }
  for (let i = 0; i < noOfPlayers; i++) {
    let play = new player(`Player-${i + 1}`, i, "team-2");
    team2.players.push(play);
  }
  Alert.render();
};
//****************************************************************************** */

function genTable(index) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 8; j++) {
      if (i == 0) {
        if (j == 0) {
          (<HTMLTableElement>(
            document.getElementById(`thead${index}`)
          )).innerHTML += `<th scope="col">Team-${index}</th>`;
        } else if (j == 7) {
          (<HTMLTableElement>(
            document.getElementById(`thead${index}`)
          )).innerHTML += `<th scope="col">Total</th>`;
        } else {
          (<HTMLTableElement>(
            document.getElementById(`thead${index}`)
          )).innerHTML += `<th scope="col">B-${j}</th>`;
        }
      }
    }
    (<HTMLTableElement>(
      document.getElementById(`content${index}`)
    )).innerHTML += `<tr>
            <td scope="row">Player-${i + 1}</th>
            <td id="B-${i + 1}1${index}"></td>
            <td id="B-${i + 1}2${index}"></td>
            <td id="B-${i + 1}3${index}"></td>
            <td id="B-${i + 1}4${index}"></td>
            <td id="B-${i + 1}5${index}"></td>
            <td id="B-${i + 1}6${index}"></td>
            <td id="total${i + 1}${index}"> </td>
          </tr>`;
  }
}
// console.log(cricket);
// console.log(team1);
// console.log(team2);

async function startTimer() {
  clearVar = 1;
  scoreRunner();
  secondsToCountDown = 60;
  noOfBalls = 0;
  if (hit1 == 1) {
    hit1 = 0;
    hit2 = 1;
    document.getElementById("notifi").innerHTML = "TEAM-1 Batting";
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = false;
  } else if (hit2 == 1) {
    hit1 = 0;
    hit2 = 0;
    gen = 1;
    document.getElementById("notifi").innerHTML = "TEAM-2 Batting";
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = false;
  }
  (<HTMLButtonElement>document.getElementById("start")).disabled = true;
  let temp = new Promise((resolve, reject) => timer(resolve, reject));
  await temp;
  clearVar = 0;
  document.getElementsByClassName("timerText")[0].classList.remove("text-danger");
  document.getElementsByClassName("timerText")[1].classList.remove("text-danger");
  document.getElementById("timer").innerHTML = String(60);
  if (hit2 == 0 && hit1 == 0) {
    document.getElementById("notifi").innerHTML =
      "Click generate result to see the result";
    document.getElementById(
      "score2"
    ).innerHTML = `Team-2 Scored<br>${team2.total} Runs`;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
    (<HTMLButtonElement>document.getElementById("start")).disabled = true;
    (<HTMLButtonElement>document.getElementById("gen")).disabled = false;
    (<HTMLButtonElement>document.getElementById("gen")).classList.add(
      "btn-success"
    );
    (<HTMLButtonElement>document.getElementById("gen")).classList.remove(
      "btn-dark"
    );
    localStorage.setItem("result", JSON.stringify(cricket));
    // console.log(String(document.getElementById("scoreBoard").outerHTML));
    localStorage.setItem(
      "table",
      String(document.getElementById("scoreBoard").outerHTML)
    );
  } else if (hit1 == 0) {
    document.getElementById(
      "score1"
    ).innerHTML = `Team-1 Scored<br>${team1.total} Runs`;
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
    (<HTMLButtonElement>document.getElementById("start")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
  }
}
let clearVar = 1;
function scoreRunner() {
  const interval = setInterval(() => {
    // run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
    runIndex++;
    if (runIndex > 4) {
      runIndex = 0;
    }
    run = possibleRun[runIndex];
    // document.getElementById("ranRun").innerHTML = String(run);
    document.getElementById("ranRun").innerHTML =`Hit on-><span class="text-info" style="font-size:1em;"> ${run}</span> to score`;
    if (clearVar === 0) {
      document.getElementById("ranRun").innerHTML =
        "Hit the value here to score";
      clearInterval(interval);
    }
  }, 120);
}
function timer(resolve, reject) {
  //   let secondsToCountDown = 60;
  const interval = setInterval(() => {
    document.getElementById("timer").innerHTML = String(secondsToCountDown);
    if (secondsToCountDown === 0) {
      clearInterval(interval);
      return resolve("sucess");
    }
    secondsToCountDown--;

    if (secondsToCountDown < 10) {
      document
        .getElementsByClassName("timerText")[0]
        .classList.add("text-danger");
      document
        .getElementsByClassName("timerText")[1]
        .classList.add("text-danger");
      // warning.play();
    }
  }, 1000);
}

// function updateButton() {
//   if (hit1 == 1) {
//     document.getElementById("timer").innerHTML = String(60);
//     // (<HTMLButtonElement>document.getElementById("start")).disabled = true;
//     // (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
//     // (<HTMLButtonElement>document.getElementById("hit2")).disabled = false;
//     // (<HTMLButtonElement>document.getElementById("gen")).disabled = true;
//     hit1 = 0;
//     hit2 = 1;
//   } else if (hit2 == 1) {
//     // (<HTMLButtonElement>document.getElementById("start")).disabled = true;
//     // (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
//     // (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
//     // (<HTMLButtonElement>document.getElementById("gen")).disabled = false;
//     hit1 = 0;
//     hit2 = 0;
//     gen = 1;
//   }
// }
let playerBatting1 = 0;
let player1Total = 0;
let team1score = 0;

let playerBatting2 = 0;
let player2Total = 0;
let team2score = 0;

function hit(hitIndex: number) {
  // let possibleRun = [1, 6, 2, 0, 4];
  // let run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
  //   console.log(run);
  switch (hitIndex) {
    case 1:
      if (playerBatting1 < team1.players.length) {
        if (run == 0) {
          document.getElementById("score1").innerHTML = `0<br>Player-${
            playerBatting1 + 1
          } OUT`;
        } else {
          document.getElementById("score1").innerHTML = `Player-${
            playerBatting1 + 1
          } Scored<br>${run}`;
        }
        team1.players[playerBatting1].score.push(run);
        player1Total += run;
        team1score += run;
        team1.total = team1score;
        // console.log(`B-${playerBatting1+1}${noOfBalls+1}${hitIndex}`);
        (<HTMLTableCellElement>(
          document.getElementById(
            `B-${playerBatting1 + 1}${noOfBalls + 1}${hitIndex}`
          )
        )).innerHTML = String(run);
        (<HTMLTableCellElement>(
          document.getElementById(`total${playerBatting1 + 1}${hitIndex}`)
        )).innerHTML = String(player1Total);
        noOfBalls++;
        if (noOfBalls == 6 || run == 0) {
          team1.players[playerBatting1].total = player1Total;
          team1.score.push(player1Total);

          player1Total = 0;
          noOfBalls = 0;
          playerBatting1++;
        }
      } else {
        (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
        secondsToCountDown = 0;
        document.getElementById("timer").innerHTML = String(60);
      }
      break;
    case 2:
      if (playerBatting2 < team1.players.length) {
        if (run == 0) {
          document.getElementById("score2").innerHTML = `0<br>Player-${
            playerBatting2 + 1
          } OUT`;
        } else {
          document.getElementById("score2").innerHTML = `Player-${
            playerBatting2 + 1
          } Scored<br>${run}`;
        }
        team2.players[playerBatting2].score.push(run);
        player2Total += run;
        team2score += run;
        team2.total = team2score;
        (<HTMLTableCellElement>(
          document.getElementById(
            `B-${playerBatting2 + 1}${noOfBalls + 1}${hitIndex}`
          )
        )).innerHTML = String(run);
        (<HTMLTableCellElement>(
          document.getElementById(`total${playerBatting2 + 1}${hitIndex}`)
        )).innerHTML = String(player2Total);
        noOfBalls++;
        if (noOfBalls == 6 || run == 0) {
          team2.players[playerBatting2].total = player2Total;
          team2.score.push(player2Total);
          player2Total = 0;
          noOfBalls = 0;
          playerBatting2++;
        }
      } else {
        (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
        secondsToCountDown = 0;
        document.getElementById("timer").innerHTML = String(60);
      }
      break;
  }
  updateValue(hitIndex);
}

function updateValue(hitIndex) {
  //   console.log("hi");
  switch (hitIndex) {
    case 1:
      (<HTMLElement>document.getElementById("team1Score")).innerHTML = String(
        team1.total
      );
      break;
    case 2:
      (<HTMLElement>document.getElementById("team2Score")).innerHTML = String(
        team2.total
      );
      break;
  }
}
