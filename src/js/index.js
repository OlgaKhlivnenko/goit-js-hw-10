import '../css/styles.css';

// import API from './fetchname';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener(`input`, debounce((onInputChange), DEBOUNCE_DELAY));

function onInputChange(evt) {
    let inputValue = evt.target.value;
    console.log(inputValue);
    let country = inputValue.trim();
    console.log(country);
    fetchCountries(country).then(renderCountryCard);
}
function fetchCountries(name) {
    console.log(name);
     return fetch('https://restcountries.com/v3.1/name/${name}')
        .then(response =>  response.json() );
}

function renderCountryCard(country) {
    console.log(country);
     if (country.length > 10) {
        console.log(`10`);
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (country.length >= 2 && country.length < 10) {
         console.log(`2`);
        countryList.innerHTML = country
            .map(({ flags, name, }) =>
                `<li>
                    <svg class="flag__image" width="40px" height="40px">
                        <use href="${flags.svg}"></use>
                    </svg>
                    <h2>${name.official}</h2>
                    </li>`
            )
            .join('');
        return;
    }
    if (country.length === 1) {
        countryInfo.innerHTML = country
            .map(({ flags, name, capital, population, languages, }) => 
                 `<svg class="flag__image" width="40px" height="40px">
                        <use href="${flags.svg}"></use>
                    </svg>
                    <h2>${name.official}</h2>
                    <p class="capital">Capital: ${capital}</p>
                    <p class="population">Population: ${population}</p>
                    <p class="languages">Languages: ${languages}</p>`
            )
            .join('');
        return;
    }
    };