var cric = JSON.parse(localStorage.getItem("result"));
console.log(cric);
console.log(localStorage.getItem("table"));
window.onload = function () {
    var winner = 0;
    var manOfTheMatch = 0;
    var manOfTheMatchTeam = "";
    var manOfTheMatchScore = 0;
    if (cric.teams[0].total > cric.teams[1].total) {
        winner = 1;
    }
    else {
        winner = 2;
    }
    var val1 = Math.max.apply(Math, cric.teams[0].score);
    var val2 = Math.max.apply(Math, cric.teams[1].score);
    if (val1 > val2) {
        manOfTheMatch = cric.teams[0].score.indexOf(val1);
        manOfTheMatchTeam = "Team-1";
        manOfTheMatchScore = val1;
        // console.log(winner,manOfTheMatch);
    }
    else {
        manOfTheMatch = cric.teams[1].score.indexOf(val2);
        manOfTheMatchTeam = "Team-2";
        manOfTheMatchScore = val2;
    }
    var title = document.createElement("div");
    title.setAttribute("class", "container-fluid bg-dark text-white text-center");
    title.innerHTML = "<h1>Timer Cricket</h1>";
    document.body.appendChild(title);
    var cont = document.createElement("div");
    cont.setAttribute("class", "container text-center");
    cont.innerHTML = "<br>";
    cont.innerHTML += "" + localStorage.getItem("table");
    var row = document.createElement("div");
    row.setAttribute("class", "row text-center");
    var content = document.createElement("div");
    content.setAttribute("class", "col-lg-12 text-center");
    content.innerHTML = "<div class=\"card text-center border border-dark\">\n  <div class=\"card-header bg-dark text-white\">\n  Result of the Timer Cricket Match  </div>\n  <div class=\"card-body\">\n    <h3 class=\"card-title font-weight-bold\">The Winner is</h3>\n    <h1 class=\"card-text\">Team-" + winner + "</h1><br>\n    <h3 class=\"card-title font-weight-bold\">The Man of the match is</h3>\n    <h1 class=\"card-text\">Player-" + (manOfTheMatch + 1) + "</h1>\n    <h2 class=\"card-title\">Team: " + manOfTheMatchTeam + "</h2>\n    <h2 class=\"card-title\">Score: " + manOfTheMatchScore + "</h2>\n    <a href=\"index.htm\" class=\"btn btn-dark\">click to play again</a>\n  </div>\n  <div class=\"card-footer  bg-dark text-white\">\n    Congratulations\n  </div>\n</div>";
    //   content.innerHTML=`<h1>The Winner is</h1>
    //                     <h1>Team-${winner}</h1>
    //                      <h1>The Man of the match is</h1>
    //                      <h1>Player-${manOfTheMatch+1}</h1>`;
    row.appendChild(content);
    cont.appendChild(row);
    cont.innerHTML += "<br><br>";
    document.body.appendChild(cont);
};
