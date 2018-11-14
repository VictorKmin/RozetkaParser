const cheerio = require('cheerio');
const request = require('request-promise');


/**
 * @param url - URL of page what we will be parse
 * This is main method of parser.
 */
async function rozetkaParser(url) {
    let arrayOfPhoneLinks = [];

    let mainHtmlFile = await request(url);

    let $ = await cheerio.load(mainHtmlFile);
    let arr = $('.g-i-search-list')[0].children;

    $(arr).each((i, elem) => {
        let n = ($(elem).find('.g-i-list-title').html());

        if (n !== null) {
            arrayOfPhoneLinks.push(n.match(/href="([^"]*)/)[1]);
        }
    });

    let promises = [];

    arrayOfPhoneLinks.forEach(phoneIrl => {
        phoneIrl = phoneIrl + '#tab=characteristics';
        promises.push(getPhoneInfo(phoneIrl));
    });

    let characteristicPhones = await Promise.all(promises);

    console.log(characteristicPhones);

}

const getPhoneInfo = async (url) => {
    let page = await request(url);
    let $ = cheerio.load(page);
    // Get HTML of class what contains name of phone and trim it to get just model
    let [nameOfPhone] = $('.detail-title').html().trim().split(' + &#');

    let infoAboutPhone = {nameOfPhone, techChar: []};

    $('.chars-t-cell').each((index, elem) => {
        let descr = $(elem).text().trim();
        let characteristic = {};
        if (index % 2 === 0) characteristic.description = descr;
        else characteristic.value = descr;

        infoAboutPhone.techChar.push(characteristic);
    });
    // console.log(infoAboutPhone);
    return infoAboutPhone;
};

rozetkaParser('https://rozetka.com.ua/ua/search/?class=0&text=samsung++note&section_id=80003');