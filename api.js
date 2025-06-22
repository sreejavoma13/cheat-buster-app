const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const searchname=document.getElementById('search-name')
const API_BASE_URL = '<http://localhost:3000/api>';
export const SearchUserbyEmail=async(event,searchInput,searchname,results,API_BASE_URL) => {
    event.preventDefault();
    const emailToSearch = searchInput.value;
    const nameToSearch=searchname.value;
    document.getElementsByTagName("button").disabled = true;
    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                email: emailToSearch,
                name:nameToSearch
            }
        });

        displayBustedResult(response.data);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            displaySafeResult(error.response.data.message);
        } else if (error.response && error.response.status === 400) {
            displayError(error.response.data.error);
        } else {
            displayError('Could not connect to the server. Please try again later.');
        }
    }
    finally{
        document.getElementsByTagName("button").disabled = false;
    }
};
