const axios = require('axios');
const config = require('../../../../../../config');

const headers = {
    'Authorization': config.WIKIPEDIA_ACCESS_TOKEN,
    'User-Agent': 'Worldopoly (tetsuwan.astroboy@gmail.com)'
}

const BASE_URL = 'https://api.wikimedia.org/core/v1/wikipedia/';
const SEARCH_ENDPOINT = '/search/page';
const PAGE_ENDPOINT = '/page/';
const HTML_OPTION = '/html';
const LIMIT = 1;

const get = async (url) => {
    try {
        const { data } = await axios.get(url, { headers });
        return data;
    } catch (error) {
        return null;
    }
}

const search = async (query, language = 'en') => {
    if (!query) {
        return null;
    }

    const params = `?q=${encodeURIComponent(query)}&limit=${LIMIT}`;
    const url = `${BASE_URL}${language}${SEARCH_ENDPOINT}${params}`;
    return await get(url);
}

const getHtmlPage = async (title, language = 'en') => {
    if (!title) {
        return null;
    }

    const url = `${BASE_URL}${language}${PAGE_ENDPOINT}${encodeURIComponent(title)}${HTML_OPTION}`;
    return await get(url);
}

module.exports = {
    search,
    getHtmlPage
}