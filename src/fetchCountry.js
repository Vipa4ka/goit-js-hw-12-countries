const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountry(form) {
    return fetch(`${BASE_URL}/name/${form}`)    
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error fatching data');
        });
}

