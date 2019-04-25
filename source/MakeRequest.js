"strict mode";

var temp = ["OneDeg", "TwoDeg", "ThreeDeg", "FourDeg", "FiveDeg"];
var time = ["OneTime", "TwoTime", "ThreeTime", "FourTime", "FiveTime"];
var setsky = ["OneSky", "TwoSky", "ThreeSky", "FourSky", "FiveSky"];

// Do a CORS request to get Davis weather hourly forecast
let allweather;
let curr_weather;

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(city) {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + city + ",US&units=imperial&APPID=1a859727d426d067799208b297566176"
  let current = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&APPID=1a859727d426d067799208b297566176"
  let xhr = createCORSRequest('GET', url);
  let xhr2 = createCORSRequest('GET', current);
  //console.log(city);
  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function () {
    let responseStr = xhr.responseText;  // get the JSON string 
    //let object = JSON.parse(responseStr);  // turn it into an object
    allweather = JSON.parse(responseStr);
    console.log(JSON.stringify(allweather, undefined, 2));
    //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
    setWeather();
  };

  xhr.onerror = function () {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();

  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr2.onload = function () {
    let responseStr = xhr2.responseText;  // get the JSON string 
    //let object = JSON.parse(responseStr);  // turn it into an object
    curr_weather = JSON.parse(responseStr);
    CurrentConditions();
    console.log(JSON.stringify(curr_weather, undefined, 2));
    //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
  };

  xhr2.onerror = function () {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr2.send();
}
function CurrentConditions(){
  var temperature = document.getElementById("temp");
  var timeofday = document.getElementById("time");
  temperature.innerHTML = Math.round(curr_weather.main.temp);
  var curr_time = new Date();
  var AMPM;
  var time2 = curr_time.getHours();
  var curr_conditions = curr_weather.weather[0].icon;
  var sky = document.getElementById("currsky");
  sky.src = "../assets/"+curr_conditions+".svg";
  sky = document.getElementById("currsky2");
  sky.src = "../assets/"+curr_conditions+".svg";


  if (time2 < 12 ) {
    AMPM = 'AM';
  }
  else {AMPM = "PM"}
  if(time2 > 12){
    time2 -= 12;
  } else if (time2 == 0){
    time2 = 12;
  }
  timeofday.innerHTML = time2 + AMPM;

}
function setWeather() {
  for (var i=0; i < temp.length; i++){
    var temperature = document.getElementById(temp[i]);
    var timeofday = document.getElementById(time[i]);
    temperature.innerHTML = Math.round(allweather.list[i].main.temp);
    var curr_conditions = allweather.list[i].weather[0].icon;
    var sky = document.getElementById(setsky[i]);
    sky.src = "../assets/"+curr_conditions+".svg";
  
    var curr_time = new Date();
    var AMPM;
    var time2 = curr_time.getHours();
    time2 += i+1;

    if (time2 < 12 ) {
      AMPM = 'AM';
    }
    else {AMPM = "PM"}

    if(time2 > 23){
      var diff = time2 - 24;
      time2 = 0;
      time2 += diff;
      AMPM = "AM"
    }
    if(time2 > 12){
      time2 -= 12;
    } else if (time2 == 0){
      time2 = 12;
    }
  
    timeofday.innerHTML = time2 +':00'+ AMPM;
  }

}

// run this code to make request when this script file gets executed 
function makeRequest() {
  var city = document.getElementById("city").value;
  //document.write(city.replace(/\s/g, ''));
  console.log(city);
  if (!city) {
    city = "Davis,CA";
  }
  makeCorsRequest(city);
}

 makeRequest();
