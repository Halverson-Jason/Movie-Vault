// button event listeners
var jason = document.getElementById("Jason");
var bobby = document.getElementById("Bobby");
var dilly = document.getElementById("Dilly");
jason.addEventListener("click", jasonsMovies);
bobby.addEventListener("click", bobbysMovies);
dilly.addEventListener("click", dillysMovies);


function jasonsMovies() {

  var userSelected = "jason";
  queryDatabase(userSelected);
}

function bobbysMovies() {
  var userSelected = "bobby";
  queryDatabase(userSelected);
}

function dillysMovies() {
  var userSelected = "dilly";
  queryDatabase(userSelected);
}

// JSON + AJAX CODE
function queryDatabase(userSelected)
{
  // remove Table if present
  if(document.getElementById("myTable"))
  {
    var table = document.getElementById("myTable");
    table.parentNode.removeChild(table);

  }

  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'movies.json');
  ourRequest.onload = function(){
    var ourMovies;
    ourMovies = JSON.parse(ourRequest.responseText);
    checkMovies(ourMovies, userSelected);
  };
  ourRequest.send();
}

function checkMovies(ourMovies, userSelected)
{
  if(ourMovies.length != 0)
  {

    // run through every movie
    for (var i = 0; i < ourMovies.length; i++)
    {
      // create table in movieDisplay
      var newTable = document.createElement("TABLE");
      newTable.setAttribute("id", "myTable");
      document.body.appendChild(newTable);
      // run through ever user
      var howManyUsers = 0;
      howManyUsers = ourMovies[i].userlist.length;

      for(var j = 0; j < howManyUsers; j++)
      {
        // if matches user create table
        if (ourMovies[i].userlist[j] == userSelected)
        {
          // create table row with movie name
          var y = document.createElement("TR");
          y.setAttribute("id", ourMovies[i].id);
          document.getElementById("myTable").appendChild(y);

          var z = document.createElement("TD");
          var t = document.createTextNode(ourMovies[i].movieName);
          z.appendChild(t);
          document.getElementById(ourMovies[i].id).appendChild(z);

        }
      }

    }
  }

}
