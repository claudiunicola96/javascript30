// a json with all cities
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// here we'll hold all cities
const cities = [];

// the fetch function return a promise
// read more about promises here:
// https://developers.google.com/web/fundamentals/getting-started/primers/promises
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

// add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// find all matches what was searched
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // gi => global and insensitive
        const regex = new RegExp(wordToMatch, 'gi');

        // check
        return place.city.match(regex) || place.state.match(regex);
    });
}

// get the cities that match and return them 
// as a html string
function displayMatches(wordToMatch) {
    const matchArray = findMatches(wordToMatch, cities);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.city}, ${place.state}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');

    return html;
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('keyup', function () {
        const suggestions = document.querySelector('.suggestions');
        // set the html string with cities that matchF
        suggestions.innerHTML = displayMatches(this.value);
    });
});
