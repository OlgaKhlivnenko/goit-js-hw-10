import '../css/styles.css';

import API from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let inputValue = '';
inputEl.addEventListener(`input`, debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
    
    inputValue = (evt.target.value).trim();
    console.log(inputValue);
    if (inputValue === '') {
        return
    };
    API.fetchCountries(inputValue)
        .then(renderCountryCard)
        .catch(error => {
             Notiflix.Notify.failure('Oops, there is no country with that name');
             console.log(error);
         });
}
            
function renderCountryCard(country) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

     if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
     }
    if (country.length >= 2 && country.length < 10) {
        countryList.innerHTML = country
            .map(({ name, flags, }) =>
                `<li>
                <img class="gallery__image" src="${flags.svg}" alt="" height=20px />
                    <h1>${name.official}</h1>
                    </li>`
            )
            .join('');
        return;
    }
    if (country.length === 1) {
       countryInfo.innerHTML = country
            .map(({ flags, name, capital, population, languages, }) => 
                ` <h1>
                    <img class="gallery__image" src="${flags.svg}" alt=""height=40px />
                    <p>${name.official}</p>
                 </h1>
                    <p> <b>Capital:</b> ${capital}</p>
                    <p> <b>Population:</b> ${population}</p>
                    <p> <b>Languages:</b> ${Object.values(languages)}</p>`
            )
            .join('');
        return;
    }
    };