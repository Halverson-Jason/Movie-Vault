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
// AJAX / JSON
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', '/data/movies.json');
  ourRequest.onload = function(){
    var ourMovies;
    ourMovies = JSON.parse(ourRequest.responseText);
    checkMovies(ourMovies, userSelected);
  };
  ourRequest.send();
}


// Javascript examples , loops , conditionals ect.
function checkMovies(ourMovies, userSelected)
{
  if(ourMovies.length != 0)
  {
      // create table in movieDisplay
      var newTable = document.createElement("TABLE");
      newTable.setAttribute("id", "myTable");
      document.getElementById("movies").insertBefore(newTable, document.getElementById("insertBeforeMe"));


    // run through every movie
    for (var i = 0; i < ourMovies.length; i++)
    {

      // run through ever user

        // DOM interaction
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
          var a = document.createElement("a");
          a.setAttribute("id", ourMovies[i].movieName);
            a.setAttribute("href", "#");
            a.setAttribute("onclick", "setMedia(\"/media/video/" + ourMovies[i].videoName + "\", \"/media/audio/" + ourMovies[i].audioName + "\" )");
            a.setAttribute("title", "CLICK ME");

          var t = document.createTextNode(ourMovies[i].movieName);
            a.appendChild(t);
          z.appendChild(a);
          document.getElementById(ourMovies[i].id).appendChild(z);

        }
      }

    }
  }

}

function setMedia(videoName, audioName)
{

    var movie = document.getElementById("movie-Video");
    var audio = document.getElementById("movie-Audio");

    if (videoName == 0)
        {
            movie.src = "";
            audio.src = "";
            movie.poster = "/media/img/noVideo.jpg";
        }
    else
        {
            movie.poster = "";
            movie.src = videoName;
            audio.src = audioName ;
        }

}

function submitMovie()
{
    saveMovie();
}

function saveMovie()
{
// Javascript Objects
    var movie = {
    movieName: document.getElementById("movieName").value,
    movieGenre: document.getElementById("genre").value,
    movieRating: document.getElementById("userRating").value,
    movieUserList: document.getElementById("userList").value,
    persistentStorage: document.getElementById("persistent").checked,
    save: function ()
        {

            // Local storage

            if(this.persistentStorage)
                {
                    localStorage.name = this.movieName;
                    localStorage.genre = this.movieGenre;
                    localStorage.rating = this.movieRating;
                    localStorage.user = this.movieUserList;
                    alert("Stored by simple");
                    alert("Movie Name: " + localStorage.name);

                }
            else{
                    sessionStorage.setItem('movieObject', JSON.stringify(this));
                    var retrievedMovie = sessionStorage.getItem('movieObject');
    alert("Stored by Object");
                var parsedMovie = JSON.parse(retrievedMovie);
                alert("Movie Name: " + parsedMovie.movieName);
            }

        }

    };

    movie.save();

}
