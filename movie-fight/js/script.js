const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: "b85cd978",
            s: searchTerm
        }
    });

};


const input = document.querySelector('input');

const onInput = (event) => {
    fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));