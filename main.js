
/* --------------- OpenWeather API START --------------- */

const api = {
	key: '13a9caa18eac28498b568a24e17056a3',
	url: 'https://api.openweathermap.org/data/2.5/weather'
}

/* --------------- OpenWeather API END --------------- */


/* --------------- GET PAGE ELEMENTS START --------------- */

const form = document.getElementById('searchform');
const searchbox = document.getElementById('searchbox');
const mainimg = document.getElementById('mainimg')
const cont = document.getElementById('cont')
const card = document.getElementById('card');
const date = document.getElementById('date');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const weatherImg = document.getElementById('weatherimg');
const range = document.getElementById('range');
const footer = document.getElementById('footer');

/* --------------- GET PAGE ELEMENTS END --------------- */


/* --------------- FUNCTIONS START --------------- */

function updateImages(data) {
	let weather = data.weather[0].id;
	let src = 'Imagenes/clear.png';
	if (weather >= 200 && weather <= 232) {
		src = 'Imagenes/thunderstorm.png';
	} else if (weather >= 500 && weather <= 531) {
		src = 'Imagenes/rain.png';
	} else if (weather >= 300 && weather <= 321) {
		src = 'Imagenes/drizzle.png';
	} else if (weather >= 600 && weather <= 622) {
		src = 'Imagenes/snow.png';
	} else if (weather >= 701 && weather <= 781) {
		src = 'Imagenes/atmosphere.png';
	} else if (weather == 800) {
		src = 'Imagenes/clear.png';
	} else if (weather >= 801 && weather <= 804) {
		src = 'Imagenes/clouds.png';
	}
	weatherImg.src = src;
} /* --- Update Weather Images --- */

function showSearchBox() {
	mainimg.classList.replace('mainimg', 'mainimgopacity');
	setTimeout(function () {footer.classList.replace('footerhidden', 'footershow');}, 900)
	setTimeout(function () {mainimg.classList.add('mainimgdisplay');}, 900)
	setTimeout(function () {cont.classList.remove('contenedordisplay');}, 900)
	setTimeout(function () {cont.classList.remove('contenedoropacity');}, 950);
} /* --- Show Search Box --- */

function showCard() {
	cont.classList.replace('contenedor', 'contenedorenter');
	card.classList.remove('cardshowdisplay');
	setTimeout(function () {card.classList.replace('weather-card', 'cardshow');}, 100);
} /* --- Show Weather Card --- */

async function search(query) {
	try {
		const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
		const data = await response.json();
		showCard();
		console.log(data);
		city.innerHTML = `${data.name}, ${data.sys.country}`;
		date.innerHTML = (new Date()).toLocaleDateString();
		temperature.innerHTML = toCelsius(data.main.temp) + '°C';
		weather.innerHTML = data.weather[0].description;
		range.innerHTML = `${toCelsius(data.main.temp_min)}°C min / ${toCelsius(data.main.temp_max)}°C max`;
		updateImages(data);
	} catch(err) {
		console.log(err);
		alert('Hubo un error');
	}
} /* --- Get Weather Data and Replace --- */

function toCelsius(kelvin) {
	return Math.round(kelvin - 273.15);
} /* --- Converte Kelvin deg to Celsius --- */

function onSubmit(event) {
	event.preventDefault();
	search(searchbox.value);
} /* --- Run APP --- */

/* --------------- FUNCTIONS END --------------- */

mainimg.addEventListener('click', showSearchBox, true); /*- Show Search Box -*/
form.addEventListener('submit', onSubmit, true); /* - Run APP - */
