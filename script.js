import { searchUser } from "./api.js";

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

const displayBustedResult = (user) => {
    resultsContainer.innerHTML = `
        <div class="card">
            <img src="${user.picture}" alt="User picture">
            <h3>BUSTED!</h3>
            <p><strong>${user.firstname} ${user.lastname}</strong> (${user.age}) was found in our database.</p>
            <p>They live in ${user.city}.</p>
        </div>
    `;
};

const displaySafeResult = (message) => {
    resultsContainer.innerHTML = `<p class="safe">${message}</p>`;
};

const displayError = (message) => {
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
};

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) {
        displayError('Please enter an email or name.');
        return;
    }

    resultsContainer.innerHTML = '<p>Searching...</p>';
    searchButton.disabled = true;
    searchButton.textContent = 'Searching...';

    try {
        const response = await searchUser(query);
        displayBustedResult(response.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            if (error.response.data.message === "They are Loyal") {
                displaySafeResult(error.response.data.message);
            } else {
                displayError(error.response.data.error || 'Bad request');
            }
        } else {
            displayError('Server error or network issue.');
        }
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = 'Search';
    }
});
