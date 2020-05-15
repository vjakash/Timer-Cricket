var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//******************Custom Alert box from internet********************************** */
function CustomAlert() {
    this.render = function () {
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
    };
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    };
}
var Alert = new CustomAlert();
//*****************************************************************************/
var noOfBalls = 0;
var noOfPlayers = 10;
// let possibleRun=[1, 6, 2, 0, 4]
// let run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
var possibleRun = [0, 1, 2, 4, 6];
var runIndex = 0;
var run = possibleRun[runIndex];
var game = /** @class */ (function () {
    function game() {
        this.teams = [];
    }
    return game;
}());
var team = /** @class */ (function () {
    function team(n) {
        this.players = [];
        this.score = [];
        this.total = 0;
        this.name = n;
    }
    return team;
}());
var player = /** @class */ (function () {
    function player(n, ind, t) {
        this.score = [];
        this.name = n;
        this.index = ind;
        this.team = t;
    }
    return player;
}());
var cricket = new game();
var team1 = new team("team-1");
cricket.teams.push(team1);
var team2 = new team("team-2");
cricket.teams.push(team2);
var play = 1;
var hit1 = 1;
var hit2 = 0;
var gen = 0;
var secondsToCountDown = 60;
// var startup = new Audio('startup.mp3');
var warning = new Audio("warning.mp3");
//************************Onload**************************************************
window.onload = function () {
    localStorage.clear();
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    container.innerHTML = "\n    <div class=\"row text-center\">\n    <div class=\"col-4 col-lg-4 text-left\" style=\"font-size:1.3em;\"><p id=\"score1\">Team-1 Score for each Ball goes here</p></div>\n    <div class=\"col-4 col-lg-4 text-center\">\n    <button class=\"btn btn-dark\" onclick=\"startTimer();\" id=\"start\">Start the game</button>\n    <h3 id=\"notifi\"><h3>\n    </div>\n    <div class=\"col-4 col-lg-4 text-right\" style=\"font-size:1.3em;\"><p id=\"score2\">Team-2 Score for each Ball goes here</p></div>\n    </div>\n    <hr>\n    <div class=\"row text-center\">\n        <div class=\"col-4 col-lg-4 text-center\">\n            <h2>Team-1</h2>\n            <h3 id=\"team1Score\">0</h3>\n            <button class=\"btn btn-dark\" id=\"hit1\" onclick=\"hit(1)\" disabled>HIT 1</button>\n        </div>\n        <div class=\"col-4 col-lg-4 text-center\">\n          <h2 id=\"ranRun\">Hit the value here to score</h2>\n            <h1 class=\"timerText\" >Timer</h1>\n            <h3 id=\"timer\" class=\"timerText \">60</h3>\n          \n        </div>\n        <div class=\"col-4 col-lg-4 text-center\">\n            <h2>Team-2</h2>\n            <h3 id=\"team2Score\">0</h3>\n            <button class=\"btn btn-dark\" id=\"hit2\" onclick=\"hit(2)\" disabled>HIT 2</button>\n        </div>\n    </div>\n    <hr>\n    ";
    var container2 = document.createElement("div");
    container2.setAttribute("class", "container-fluid");
    container2.innerHTML = "<div class=\"row \">\n  <div class=\"col-lg-4 text-left\"></div>\n  <div class=\"col-lg-4 text-center\"><a href=\"result.htm\" target=\"__blank\"><button class=\"btn btn-dark\" id=\"gen\"disabled>Generate Result</button></a></div>\n  <div class=\"col-lg-4 text-right\"></div>\n  </div>";
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    row.id = "scoreBoard";
    var col = document.createElement("div");
    col.setAttribute("class", "col-12 col-lg-5 text-center");
    col.innerHTML = "<h2>Team-1:Score Board</h2><table class=\"table table-striped\">\n  <thead>\n    <tr id=\"thead1\">\n      \n    </tr>\n  </thead>\n  <tbody id=\"content1\">\n  </tbody>\n  </table>";
    row.appendChild(col);
    col = document.createElement("div");
    col.setAttribute("class", "col-0 col-lg-2");
    row.appendChild(col);
    col = document.createElement("div");
    col.setAttribute("class", "col-12 col-lg-5 text-center");
    col.innerHTML = "<h2>Team-2:Score Board</h2><table class=\"table table-striped\">\n  <thead>\n    <tr id=\"thead2\">\n      \n    </tr>\n  </thead>\n  <tbody id=\"content2\">\n  </tbody>\n  </table>";
    row.appendChild(col);
    container2.appendChild(row);
    container2.innerHTML += "<br>";
    document.body.appendChild(container);
    document.body.appendChild(container2);
    genTable(1);
    genTable(2);
    for (var i = 0; i < noOfPlayers; i++) {
        var play_1 = new player("Player-" + (i + 1), i, "team-1");
        team1.players.push(play_1);
    }
    for (var i = 0; i < noOfPlayers; i++) {
        var play_2 = new player("Player-" + (i + 1), i, "team-2");
        team2.players.push(play_2);
    }
    Alert.render();
};
//****************************************************************************** */
function genTable(index) {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 8; j++) {
            if (i == 0) {
                if (j == 0) {
                    (document.getElementById("thead" + index)).innerHTML += "<th scope=\"col\">Team-" + index + "</th>";
                }
                else if (j == 7) {
                    (document.getElementById("thead" + index)).innerHTML += "<th scope=\"col\">Total</th>";
                }
                else {
                    (document.getElementById("thead" + index)).innerHTML += "<th scope=\"col\">B-" + j + "</th>";
                }
            }
        }
        (document.getElementById("content" + index)).innerHTML += "<tr>\n            <td scope=\"row\">Player-" + (i + 1) + "</th>\n            <td id=\"B-" + (i + 1) + "1" + index + "\"></td>\n            <td id=\"B-" + (i + 1) + "2" + index + "\"></td>\n            <td id=\"B-" + (i + 1) + "3" + index + "\"></td>\n            <td id=\"B-" + (i + 1) + "4" + index + "\"></td>\n            <td id=\"B-" + (i + 1) + "5" + index + "\"></td>\n            <td id=\"B-" + (i + 1) + "6" + index + "\"></td>\n            <td id=\"total" + (i + 1) + index + "\"> </td>\n          </tr>";
    }
}
// console.log(cricket);
// console.log(team1);
// console.log(team2);
function startTimer() {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearVar = 1;
                    scoreRunner();
                    secondsToCountDown = 60;
                    noOfBalls = 0;
                    if (hit1 == 1) {
                        hit1 = 0;
                        hit2 = 1;
                        document.getElementById("notifi").innerHTML = "TEAM-1 Batting";
                        document.getElementById("hit1").disabled = false;
                    }
                    else if (hit2 == 1) {
                        hit1 = 0;
                        hit2 = 0;
                        gen = 1;
                        document.getElementById("notifi").innerHTML = "TEAM-2 Batting";
                        document.getElementById("hit2").disabled = false;
                    }
                    document.getElementById("start").disabled = true;
                    temp = new Promise(function (resolve, reject) { return timer(resolve, reject); });
                    return [4 /*yield*/, temp];
                case 1:
                    _a.sent();
                    clearVar = 0;
                    document.getElementsByClassName("timerText")[0].classList.remove("text-danger");
                    document.getElementsByClassName("timerText")[1].classList.remove("text-danger");
                    document.getElementById("timer").innerHTML = String(60);
                    if (hit2 == 0 && hit1 == 0) {
                        document.getElementById("notifi").innerHTML =
                            "Click generate result to see the result";
                        document.getElementById("score2").innerHTML = "Team-2 Scored<br>" + team2.total + " Runs";
                        document.getElementById("hit2").disabled = true;
                        document.getElementById("start").disabled = true;
                        document.getElementById("gen").disabled = false;
                        document.getElementById("gen").classList.add("btn-success");
                        document.getElementById("gen").classList.remove("btn-dark");
                        localStorage.setItem("result", JSON.stringify(cricket));
                        // console.log(String(document.getElementById("scoreBoard").outerHTML));
                        localStorage.setItem("table", String(document.getElementById("scoreBoard").outerHTML));
                    }
                    else if (hit1 == 0) {
                        document.getElementById("score1").innerHTML = "Team-1 Scored<br>" + team1.total + " Runs";
                        document.getElementById("hit1").disabled = true;
                        document.getElementById("start").disabled = false;
                        document.getElementById("hit2").disabled = true;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var clearVar = 1;
function scoreRunner() {
    var interval = setInterval(function () {
        // run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
        runIndex++;
        if (runIndex > 4) {
            runIndex = 0;
        }
        run = possibleRun[runIndex];
        // document.getElementById("ranRun").innerHTML = String(run);
        document.getElementById("ranRun").innerHTML = "Hit on-><span class=\"text-info\" style=\"font-size:1em;\"> " + run + "</span> to score";
        if (clearVar === 0) {
            document.getElementById("ranRun").innerHTML =
                "Hit the value here to score";
            clearInterval(interval);
        }
    }, 120);
}
function timer(resolve, reject) {
    //   let secondsToCountDown = 60;
    var interval = setInterval(function () {
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
var playerBatting1 = 0;
var player1Total = 0;
var team1score = 0;
var playerBatting2 = 0;
var player2Total = 0;
var team2score = 0;
function hit(hitIndex) {
    // let possibleRun = [1, 6, 2, 0, 4];
    // let run = possibleRun[Math.floor(Math.random() * possibleRun.length)];
    //   console.log(run);
    switch (hitIndex) {
        case 1:
            if (playerBatting1 < team1.players.length) {
                if (run == 0) {
                    document.getElementById("score1").innerHTML = "0<br>Player-" + (playerBatting1 + 1) + " OUT";
                }
                else {
                    document.getElementById("score1").innerHTML = "Player-" + (playerBatting1 + 1) + " Scored<br>" + run;
                }
                team1.players[playerBatting1].score.push(run);
                player1Total += run;
                team1score += run;
                team1.total = team1score;
                // console.log(`B-${playerBatting1+1}${noOfBalls+1}${hitIndex}`);
                (document.getElementById("B-" + (playerBatting1 + 1) + (noOfBalls + 1) + hitIndex)).innerHTML = String(run);
                (document.getElementById("total" + (playerBatting1 + 1) + hitIndex)).innerHTML = String(player1Total);
                noOfBalls++;
                if (noOfBalls == 6 || run == 0) {
                    team1.players[playerBatting1].total = player1Total;
                    team1.score.push(player1Total);
                    player1Total = 0;
                    noOfBalls = 0;
                    playerBatting1++;
                }
            }
            else {
                document.getElementById("hit1").disabled = true;
                secondsToCountDown = 0;
                document.getElementById("timer").innerHTML = String(60);
            }
            break;
        case 2:
            if (playerBatting2 < team1.players.length) {
                if (run == 0) {
                    document.getElementById("score2").innerHTML = "0<br>Player-" + (playerBatting2 + 1) + " OUT";
                }
                else {
                    document.getElementById("score2").innerHTML = "Player-" + (playerBatting2 + 1) + " Scored<br>" + run;
                }
                team2.players[playerBatting2].score.push(run);
                player2Total += run;
                team2score += run;
                team2.total = team2score;
                (document.getElementById("B-" + (playerBatting2 + 1) + (noOfBalls + 1) + hitIndex)).innerHTML = String(run);
                (document.getElementById("total" + (playerBatting2 + 1) + hitIndex)).innerHTML = String(player2Total);
                noOfBalls++;
                if (noOfBalls == 6 || run == 0) {
                    team2.players[playerBatting2].total = player2Total;
                    team2.score.push(player2Total);
                    player2Total = 0;
                    noOfBalls = 0;
                    playerBatting2++;
                }
            }
            else {
                document.getElementById("hit2").disabled = true;
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
            document.getElementById("team1Score").innerHTML = String(team1.total);
            break;
        case 2:
            document.getElementById("team2Score").innerHTML = String(team2.total);
            break;
    }
}
