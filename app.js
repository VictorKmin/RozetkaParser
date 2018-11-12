const cheerio = require('cheerio');
const request = require('request-promise');


let arrOfDivs = []


async function rozetkaParser(url) {
    let mainHtmlFile = await request(url)


    // _____________________________________________________
    // _____________________________________________________
    // _____________________________________________________

    let $ = await cheerio.load(mainHtmlFile)
    let arr = $('div.g-i-search-list')[0].children;


    $(arr).each((i, elem) => {
        let n = ($(elem).find('.g-i-list-title').html())

        // TODO NORMAL REGEXP
        if (n !== null){
            arrOfDivs.push(n)
            console.log('_______________');
            console.log(n.match('/(https?:\\/\\/[^\\s]+)/g;'));
            console.log('_______________');
        }

    })
    console.log(arrOfDivs);
}

rozetkaParser('https://rozetka.com.ua/ua/search/?class=0&text=samsung++note&section_id=80003')


// g-i-list-img-link