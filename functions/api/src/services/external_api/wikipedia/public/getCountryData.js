const api = require('../private/api');
const adapter = require('../private/adapter');

const getCountryData = async (country) => {
    const searchResult = await api.search(country.name);
    const { pages = [] } = searchResult;
    if (pages.length === 0) {
        return {};
    }
    console.log('pages', pages);
    const [page] = pages;
    const { title, description } = page;
    console.log('title', title);
    console.log('description', description);
    if (!description.toLowerCase().includes('country')) {
        return {};
    }

    const htmlPage = await api.getHtmlPage(title);
    console.log('htmlPage', htmlPage);

    return adapter.toCountryData();
}

module.exports = getCountryData;