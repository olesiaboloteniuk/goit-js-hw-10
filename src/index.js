import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import severalCountry from './templates/severalCountry.hbs';
import oneCountry from './templates/oneCountry.hbs';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const box = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY))

function searchCountries(event) {
	let inputEl = event.target.value.trim();
	fetchCountries(inputEl).then(
		listEl => {
			if (listEl.length > 10) {
				(countryList.innerHTML = "") || (box.innerHTML = "");
				Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
				return;
			} 
			if (listEl.length >= 2) {
				box.innerHTML = "";
				countryList.innerHTML = severalCountry(listEl);
				
			};
			if (listEl.length == 1) {
				countryList.innerHTML = "";
				box.innerHTML = oneCountry(listEl);
				console.log(listEl);
			};
		
			}
	).catch(
		mistake => {
			if (!inputEl) {
				(countryList.innerHTML = "") || (box.innerHTML = "");
				return;
			}
			Notiflix.Notify.failure('Oops, there is no country with that name')
		 }
	)
}