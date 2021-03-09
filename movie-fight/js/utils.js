const debounce = (callback, delay = 1000) => {
    let timeoutId;
    //return closure function
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay)
    };
}; 

