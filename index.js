const { default: axios } = require("axios");
var cron = require('node-cron');

async function name() {
    const body = { "q": "Babyconcerts", "filter": ["locale='tr'", "eventEndDateTimestamp >= 1675619701.694"], "attributesToRetrieve": ["eventName", "eventId", "isParent"], "offset": 0, "sort": ["eventStartDateTimestamp:asc"], "limit": 7 }
    const config = {
        headers: { Authorization: `Bearer a63d121547b0d950de3df57bba212d74a37a45973ee4cb07038f1ba8bc1bcd7d` }
    };
    const response = await axios.post('https://search.mobilet.com/indexes/event/search', body, config)
    console.log(response.data.hits);
}

cron.schedule('*/1 * * * *', () => {
    name();
});
