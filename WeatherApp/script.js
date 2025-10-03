const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dataField = document.querySelector(".time_location span");
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation)

let targetLocation = 'Chennai'

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=76d77b7d300e4751b74135134250210&q=${targetLocation}&aqi=no`;
    
    const res = await fetch(url);
    const data = await res.json();

    let locationName = data.location.name; //loaction Name
    let time = data.location.localtime;  // location time
    let temp = data.current.temp_c;  //location temperature
    let weatherCondition = data.current.condition.text; // location weather Conditon

    updateDetails(temp,locationName,time,weatherCondition)
    
}

function updateDetails(temp,localtimeName,time,condition){
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    
    let currentDay = getDayName(new Date(splitDate).getDay()); 
    temperatureField.innerText = temp;
    locationField.innerText =  localtimeName;
    dataField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerText = condition;
}

function searchForLocation(e){
    e.preventDefault()

    target = searchField.value;
    fetchResults(target)   
}

// fetchResults(targetLocation);

function getDayName(number){
    console.log(number);
    switch(number){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';   
        case 5:
            return 'Friday'; 
        case 6:
            return 'Satruday'; 
    }
}
