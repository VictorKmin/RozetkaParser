const cheerio = require('cheerio');
const request = require('request-promise');

/**
 * @param url - URL of page what we will be parse
 * This is main method of parser.
 */
async function rozetkaParser(url) {
    let mainHtmlFile = await request(url);
    let $ = await cheerio.load(mainHtmlFile);
    //Take array of phones
    let arr = $('.g-i-search-list')[0].children;

    let arrayOfPhoneLinks = [];
    $(arr).each((i, elem) => {
        let n = $(elem).find('.g-i-list-title').html();
        if (n !== null) arrayOfPhoneLinks.push(n.match(/href="([^"]*)/)[1]);
    });

    let promises = [];
    // Build URL for characteristics tab and call method who parse it
    arrayOfPhoneLinks.forEach(phoneIrl => {
        promises.push(getPhoneInfo(phoneIrl + '#tab=characteristics'));
    });

    let characteristicPhones = await Promise.all(promises);
    // Log in console all phones characteristic (response.json analog)
    console.log(characteristicPhones);
}

/**
 * @param onePhoneURL - URL
 * @returns {Promise<{nameOfPhone: string, techChar: Array}>}
 * This method parse HTML file of phone. Take params from it, build response object and return it.
 */
const getPhoneInfo = async (onePhoneURL) => {
    let page = await request(onePhoneURL);
    let $ = cheerio.load(page);
    // Get HTML of class what contains name of phone and trim it to get just model
    let [nameOfPhone] = $('.detail-title').html().trim().split(' + &#');

    let infoAboutPhone = {nameOfPhone, techChar: []};
    // parse HTML page and find params and build response object
    $('.chars-t-cell').each((index, elem) => {
        let parsedParam = $(elem).text().trim();
        let phoneCharacteristic = {};
        // If the index is even its a description of phone property. If odd its value of the property
        if (index % 2 === 0) phoneCharacteristic.description = parsedParam;
        else phoneCharacteristic.value = parsedParam;

        infoAboutPhone.techChar.push(phoneCharacteristic);
    });
    return infoAboutPhone;
};

rozetkaParser('https://rozetka.com.ua/ua/search/?class=0&text=samsung++note&section_id=80003');