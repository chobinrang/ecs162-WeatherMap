"strict mode";

// Do a CORS request to get Davis weather hourly forecast
let allweather;

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(city) {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + city + ",US&units=imperial&APPID=1a859727d426d067799208b297566176"
  console.log(city);
  let xhr = createCORSRequest('GET', url);

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
}

function setWeather() {
  console.log(allweather.list[0].main.temp);
}

// run this code to make request when this script file gets executed 
function makeRequest() {
  let city = document.getElementById("city").value;
  document.write(city.replace(/\s/g, ''));

  if (!city) {
    city = "Davis,CA";
  }

  makeCorsRequest(city);
}

makeRequest();
