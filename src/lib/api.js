const apiData = require('./data.json');

// this is where an api call would happen, we're just loading from a test json file
export const getEvents = async(params = {}) => {
    console.log("Got data", apiData);
    return apiData.items;
}

export const getSingleEvent = async(id) => {
    const singleEvent = apiData.items.find(d => d.eventId === id);
    if (singleEvent && singleEvent.eventId) {
        console.log("got event", singleEvent);
        return singleEvent;
    }

    return null; // no event found
}