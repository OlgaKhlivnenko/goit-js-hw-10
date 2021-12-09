import '../css/styles.css';
import { debounce } from "lodash.debounce";
// import API from './fetchname';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener(`input`, onInputChange);

function onInputChange(evt) {
    const input = evt.currentTarget.value;
    console.log(`input`, input);
    fetchCountries(input).then(renderCountryCard);
}
function fetchCountries(name) {
    
    return fetch('https://restcountries.com/v2/name/${name}')
        .then(response =>  response.json() );
}

function renderCountryCard(name) {
     if (name.length > 10) {
        console.log(`10`);
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (name.length >= 2 && name.length < 10) {
         console.log(`2`);
        countryList.innerHTML = name
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
    if (name.length === 1) {
        console.log(`1`);
        countryInfo.innerHTML = name
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