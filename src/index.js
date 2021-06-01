import debounce from 'lodash.debounce';
import './sass/main.scss';
import countryCard from './country-card.hbs';
import countryList from './countries-list.hbs'
import fetchCountry from './fetchCountry';
import getRefs from './get-refs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
refs.inputForm.addEventListener('input', debounce(onInput,500));
function onInput(e) {
  resetPage();
  const form = e.target.value;    

  fetchCountry(form)
    .then(countries => {
      if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',          
          closer: true,          
          hide: true,
          sticker: false,
          mode: 'light',
          delay: 2000,
        });
        return;
      }
      if (countries.length <= 10 && countries.length > 1) {
        renderCountriesList(countries);
        return;
      }
      if (countries.length === 1) {
        renderCountryCard(countries);
        return;
      }
    })
    .catch(onFetchError);
}   
             

function renderCountryCard(country) {
    const markup=countryCard(country);
    refs.cardContainer.innerHTML = markup;    
}

function renderCountriesList(countries) {
    const list=countryList(countries);
    refs.cardContainer.innerHTML = list;    
}


function onFetchError(e) {
  error({
    text: `${e}`,    
    closer: true,    
    hide: true,
    sticker: false,
    mode: 'dark',
    delay: 2000,      
  });
}


function resetPage() {
  refs.cardContainer.innerHTML = '';
}