const cheerio = require('cheerio');
const request = require('request-promise');


let arrOfDivs = []


async function rozetkaParser(url) {
    let mainHtmlFile = await request(url)

    // console.log(mainHtmlFile);
    // _____________________________________________________
    // _____________________________________________________

    //TODO NORMALLY LINK OF SINGLE PHONE
    // let $ = await cheerio.load(mainHtmlFile)
    // let arr = $('div.g-i-search-list')[0].children;
    //
    //
    // $(arr).each((i, elem) => {
    //     let n = ($(elem).find('.g-i-list-title').html())
    //
    //     if (n !== null){
    //         arrOfDivs.push(n)
    //         console.log('_______________');
    //         console.log($(n).attr('href'));
    //         console.log('_______________');
    //     }
    // })

    arrOfDivs.push("https://rozetka.com.ua/ua/samsung_sm_n950fzvdsek/p21617366/")
    arrOfDivs.push("https://rozetka.com.ua/ua/samsung_sm_n960fzbhsek/p57888057/")
    arrOfDivs.push("https://rozetka.com.ua/ua/samsung_sm_n960fzkdsek/p48750886/")

    await getCharacteristic(arrOfDivs)
}


function getCharacteristic(phoneUrls) {
    let htmlFilesWithPhoneCharacteristic = [];
    phoneUrls.forEach(phoneIrl => {
        phoneIrl = phoneIrl + '#tab=characteristics';
        request(phoneIrl).then(htmlWithPhoneCharacteristic => {
            htmlFilesWithPhoneCharacteristic.push(htmlWithPhoneCharacteristic)
        })
    });
    console.log();
}














rozetkaParser('https://rozetka.com.ua/ua/search/?class=0&text=samsung++note&section_id=80003')


// g-i-list-img-link