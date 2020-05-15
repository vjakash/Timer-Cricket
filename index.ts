let noOfBalls = 0;
let noOfPlayers = 10;
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
//************************Onload**************************************************
window.onload = () => {
    localStorage.clear();
  let container = <HTMLDivElement>document.createElement("div");
  container.setAttribute("class", "container");
  container.innerHTML = `
    <div class="row text-center"><div class="col-lg-12"><button class="btn btn-dark" onclick="startTimer()" id="start">Start the game</button></div></div>
    <hr>
    <div class="row text-center">
        <div class="col-4 col-lg-4 text-center">
            <h2>Team-1</h2>
            <h3 id="team1Score">0</h3>
            <button class="btn btn-dark" id="hit1" onclick="hit(1)" disabled>HIT 1</button>
        </div>
        <div class="col-4 col-lg-4 text-center" id="timerText">
            <h2 >Timer</h2>
            <h3 id="timer">60</h3>
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
  row.id="scoreBoard";
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
  secondsToCountDown = 60;
  noOfBalls = 0;
  if (hit1 == 1) {
    hit1 = 0;
    hit2 = 1;
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = false;
  } else if (hit2 == 1) {
    hit1 = 0;
    hit2 = 0;
    gen = 1;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = false;
  }
  (<HTMLButtonElement>document.getElementById("start")).disabled = true;
  let temp = new Promise((resolve, reject) => timer(resolve, reject));
  await temp;
  document.getElementById("timerText").classList.remove("text-danger");
  if(hit1==0){
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
  }
  else if(hit2==0){
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
  }
  document.getElementById("timer").innerHTML = String(60);
  if (hit2 == 0 && hit1 == 0) {
    (<HTMLButtonElement>document.getElementById("start")).disabled = true;
    (<HTMLButtonElement>document.getElementById("gen")).disabled = false;
    localStorage.setItem("result", JSON.stringify(cricket));
    // console.log(String(document.getElementById("scoreBoard").outerHTML));
    localStorage.setItem("table",String(document.getElementById("scoreBoard").outerHTML));
  } else {
    // console.log("hi");
    (<HTMLButtonElement>document.getElementById("start")).disabled = false;
    // updateButton();
  }
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
      document.getElementById("timerText").classList.add("text-danger");
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
  updateValue(hitIndex);
  let possibleRun = [1, 6, 2, 0, 4];
  let run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
  //   console.log(run);
  switch (hitIndex) {
    case 1:
      if (playerBatting1 < team1.players.length) {
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
        noOfBalls++;
        if (noOfBalls == 6 || run == 0) {
          team1.players[playerBatting1].total = player1Total;
          team1.score.push(player1Total);
          (<HTMLTableCellElement>(
            document.getElementById(`total${playerBatting1 + 1}${hitIndex}`)
          )).innerHTML = String(player1Total);
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
        team2.players[playerBatting2].score.push(run);
        player2Total += run;
        team2score += run;
        team2.total = team2score;
        (<HTMLTableCellElement>(
          document.getElementById(
            `B-${playerBatting2 + 1}${noOfBalls + 1}${hitIndex}`
          )
        )).innerHTML = String(run);
        noOfBalls++;
        if (noOfBalls == 6 || run == 0) {
          team2.players[playerBatting2].total = player2Total;
          team2.score.push(player2Total);
          (<HTMLTableCellElement>(
            document.getElementById(`total${playerBatting2 + 1}${hitIndex}`)
          )).innerHTML = String(player2Total);
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
