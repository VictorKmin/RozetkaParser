const cheerio = require('cheerio');
const request = require('request-promise');


/**
 * @param url - URL of page what we will be parse
 * This is main method of parser.
 */
async function rozetkaParser(url) {
    let arrayOfPhoneLinks = []

    let mainHtmlFile = await request(url)

    // console.log(mainHtmlFile);
    // _____________________________________________________
    // _____________________________________________________

    // //TODO NORMALLY LINK OF SINGLE PHONE
    // let $ = await cheerio.load(mainHtmlFile)
    // let arr = $('div.g-i-search-list')[0].children;
    //
    //
    // $(arr).each((i, elem) => {
    //     let n = ($(elem).find('.g-i-list-title').html())
    //
    //     if (n !== null){
    //         arrayOfPhoneLinks.push(n)
    //         console.log('_______________');
    //         console.log(n);
    //         console.log('_______________');
    //     }
    // })

    arrayOfPhoneLinks.push("https://rozetka.com.ua/ua/samsung_sm_n950fzvdsek/p21617366/")
    arrayOfPhoneLinks.push("https://rozetka.com.ua/ua/samsung_sm_n960fzbhsek/p57888057/")
    arrayOfPhoneLinks.push("https://rozetka.com.ua/ua/samsung_sm_n960fzkdsek/p48750886/")
    arrayOfPhoneLinks.push("https://rozetka.com.ua/ua/samsung_galaxy_a8_plus_2018_4_32gb_black/p28487353/")

    await getCharacteristic(arrayOfPhoneLinks)
}

/**
 * @param phoneUrls - URLs of every single phone on a page what was parsed
 * In this method, we add a link to the phone part that characterizes the charter tab
 */
function getCharacteristic(phoneUrls) {
    // let htmlFilesWithPhoneCharacteristic = [];
    // phoneUrls.forEach(phoneIrl => {
    //     phoneIrl = phoneIrl + '#tab=characteristics';
    //     request(phoneIrl).then(htmlWithPhoneCharacteristic => {
    //         htmlFilesWithPhoneCharacteristic.push(htmlWithPhoneCharacteristic)
    //     })
    // });
    // console.log(htmlFilesWithPhoneCharacteristic);
    // singlePhoneParser(htmlFilesWithPhoneCharacteristic)

    phoneUrls.forEach(phoneIrl => {
        phoneIrl = phoneIrl + '#tab=characteristics';
        request(phoneIrl).then(htmlWithPhoneCharacteristic => {
            // Calling method to pasre single page with phone
            singlePhoneParser(htmlWithPhoneCharacteristic)
        })
    });
}

/**
 * @param htmlOfSinglePhone - html file with phone what we want to parse
 * This method call in loop. And it will be called arrOfPhones.length times
 * Here we parse phone page and get all values what we want from page
 */
function singlePhoneParser(htmlOfSinglePhone) {
    let $ = cheerio.load(htmlOfSinglePhone)
    // Get HTML of class what contains name of phone and trim it to get just model
    let nameOfPhone = $('.detail-title').html().split(' + &#')[0]
    console.log(nameOfPhone);

    let arrOfValues = []
    let arrOfString = []
    $('.chars-t .glossary-term').each((index, elem) => {
        arrOfString.push($(elem).html())
    })

    $('.chars-t .novisited').each((index, elem) => {
        arrOfValues.push($(elem).html())
    })


    for (let i = 0; i < arrOfValues.length; i++) {
        console.log(`${arrOfString[i]} : ${arrOfValues[i]}`)
        console.log(' - - - - - - - - - - - - - - ')
    }

    console.log(' ')
    console.log(' ')
    console.log(' ')
}

rozetkaParser('https://rozetka.com.ua/ua/search/?class=0&text=samsung++note&section_id=80003')


// glossary-term - Назва проперті з опису (таблиця)
// novisited - значення проперті з опису (таблиця)
// chars-group-title - заголовок пропертів (дисплей, операціна система) всередині якого ідуть проперті
// chars-t - назва таблиці зі всіма значеннями