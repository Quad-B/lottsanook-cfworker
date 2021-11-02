const Router = require('cloudworker-router');
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const router = new Router();
const port = process.env.PORT || 8787;

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

router.get('/', async (ctx) => {
    if (!ctx.query.date) {
        ctx.query.date = padLeadingZeros(new Date().getDate(), 2) + '' + padLeadingZeros((new Date().getMonth() + 1), 2) + '' + (new Date().getFullYear() + 543)
    }
    if (ctx.query.date.substring(4, 8) == new Date().getFullYear() + 543) {
        if (ctx.query.from !== undefined) {
            await fetch('https://lottsanook-cfworker.boy1556.workers.dev/index2?date=' + ctx.query.date + '&from')
                .then(res => res.json())
                .then((body) => {
                    //res.send(body)
                    ctx.body = JSON.stringify(body);
                    ctx.status = 200;
                })
        } else {
            await fetch('https://lottsanook-cfworker.boy1556.workers.dev/index2?date=' + ctx.query.date)
                .then(res => res.json())
                .then((body) => {
                    //res.send(body)
                    ctx.body = JSON.stringify(body);
                    ctx.status = 200;
                })
        }
    } else {
        let data = ""
        let monthtext
        switch (ctx.query.date.substring(2, 4)) {
            case '01': monthtext = "มกราคม"; break;
            case '02': monthtext = "กุมภาพันธ์"; break;
            case '03': monthtext = "มีนาคม"; break;
            case '04': monthtext = "เมษายน"; break;
            case '05': monthtext = "พฤษภาคม"; break;
            case '06': monthtext = "มิถุนายน"; break;
            case '07': monthtext = "กรกฎาคม"; break;
            case '08': monthtext = "สิงหาคม"; break;
            case '09': monthtext = "กันยายน"; break;
            case '10': monthtext = "ตุลาคม"; break;
            case '11': monthtext = "พฤศจิกายน"; break;
            case '12': monthtext = "ธันวาคม"; break;
        }
        /*try {
            if (ctx.query.fresh !== undefined) {
                fs.unlinkSync('tmp/' + ctx.query.date + '.txt');
            }
        } catch (err) {

        }
        var fileContents = null;
        try {
            fileContents = fs.readFileSync('tmp/' + ctx.query.date + '.txt');
        } catch (err) {

        }
        try {
            data = JSON.parse(fileContents)
        } catch (err) {
            fileContents = false
        }
        if (fileContents) {
            data = JSON.parse(fileContents)
            if (ctx.query.from !== undefined) {
                data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
            }
            res.send(data);
        } else {*/
            await fetch('https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%87%E0%B8%A7%E0%B8%94-' + ctx.query.date.substring(0, 2) + '-' + encodeURI(monthtext) + '-' + ctx.query.date.substring(4, 8) + '.aspx', { redirect: "manual" })
                .then(res => res.text())
                .then((body) => {
                    data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                    let $ = cheerio.load(body)

                    let numberpush = []

                    $('.lot-dc').toArray().forEach(element => {
                        try {
                            //console.log(element.firstChild.data)
                            numberpush.push(element.firstChild.data)
                        } catch (error) {

                        }
                    });

                    if ($('div').toArray()[2] == null) {
                        //res.send(data)
                        ctx.body = JSON.stringify(data);
                        ctx.status = 200;
                        return
                    }

                    //data[0][1] = $('b').toArray()[2].firstChild.data
                    let threefirst = []
                    let threeend = []
                    /*try {
                        threefirst = $('b').toArray()[3].firstChild.data.split(" ")
                        threeend = $('b').toArray()[4].firstChild.data.split(" ")
                    } catch (error) {
                        /*threefirst = $('b').toArray()[4].firstChild.data.split(" ")
                        threeend = $('b').toArray()[5].firstChild.data.split(" ")
                        threeend = $('b').toArray()[4].firstChild.data.split(" ")
                        data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                        data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                        data[2][3] = threeend[2].replace(/\xc2\xa0/, '');
                        data[2][4] = threeend[3].replace(/\xc2\xa0/, '');
                    }
                    /*let threefirst = $('b').toArray()[3].firstChild.data.split(" ")
                    let threeend = $('b').toArray()[4].firstChild.data.split(" ")
                    if (threefirst.length <= 1) {
                        data[1][1] = 0;
                        data[1][2] = 0;
                        /*data[2][3] = threeend[2].replace(/\xc2\xa0/, '');
                        data[2][4] = threeend[3].replace(/\xc2\xa0/, '');
                    } else {
                        data[1][1] = threefirst[0].replace(/\xc2\xa0/, '');
                        data[1][2] = threefirst[1].replace(/\xc2\xa0/, '');
                    }
                    data[2][1] = threeend[0].replace('/\xc2\xa0/', '');
                    data[2][2] = threeend[1].replace('/\xc2\xa0/', '');
                    data[3][1] = $('b').toArray()[5].firstChild.data;
                    data[4][1] = padLeadingZeros(data[0][1] - 1, 6);
                    data[4][2] = padLeadingZeros(data[0][1] + 1, 6);*/

                    /*let wave = 5;
                    let minwave = 0;
                    let maxwave = 5;*/

                    /*for (const type of $('div').toArray()) {
                        if(wave >= 5){
                            if (type.attribs.class == 'lot-dc lotto-fx lot-c20') {
                                if (minwave < maxwave) {
                                    minwave++;
                                    data[wave][minwave] = type.firstChild.data;
                                }
                            }
                        }else{
                            minwave++;
                        }
                        if (minwave == maxwave && wave == 0) {
                            date[0][1] = type.firstChild.data
                            minwave = 0;
                            maxwave = 1;
                            wave = 1;
                        }
                        if (minwave == maxwave && wave == 1) {
                            if(type.firstChild.data.split(" ").length > 2){
                                threeend = type.firstChild.data.split(" ")
                                data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                                data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                                data[2][3] = threeend[2].replace(/\xc2\xa0/, '');
                                data[2][4] = threeend[3].replace(/\xc2\xa0/, '');
                            }else{
                                threefirst = type.firstChild.data.split(" ")
                                data[1][1] = threefirst[0].replace(/\xc2\xa0/, '');
                                data[1][2] = threefirst[1].replace(/\xc2\xa0/, '');
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 2;
                        }
                        if (minwave == maxwave && wave == 2) {
                            if(data[2].length == 5){
                                data[3][1] = type.firstChild.data
                            }else{
                                threeend = type.firstChild.data.split(" ")
                                data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                                data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 3;
                        }
                        if (minwave == maxwave && wave == 3) {
                            if(data[2].length != 5){
                                data[3][1] = type.firstChild.data
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 4;
                        }
                        if (minwave == maxwave && wave == 4) {
                            data[4][1] = padLeadingZeros(data[0][1] - 1, 6);
                            data[4][2] = padLeadingZeros(data[0][1] + 1, 6);
                            minwave = 0;
                            maxwave = 5;
                            wave = 5;
                        }
                        if (minwave == maxwave && wave == 5) {
                            minwave = 0;
                            maxwave = 10;
                            wave = 6;
                        }
                        if (minwave == maxwave && wave == 6) {
                            minwave = 0;
                            maxwave = 50;
                            wave = 7;
                        }
                        if (minwave == maxwave && wave == 7) {
                            minwave = 0;
                            maxwave = 100;
                            wave = 8;
                        }
                    }*/

                    /*let wave = 0;
                    let minwave = 0;
                    let maxwave = 1;*/

                    data[0][1] = numberpush[0]
                    numberpush.shift()
                    if (numberpush[0].split(" ").length > 2) {
                        threeend = numberpush[0].split(" ")
                        data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                        data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                        data[2][3] = threeend[2].replace(/\xc2\xa0/, '');
                        data[2][4] = threeend[3].replace(/\xc2\xa0/, '');
                    } else {
                        threefirst = numberpush[0].split(" ")
                        data[1][1] = threefirst[0].replace(/\xc2\xa0/, '');
                        data[1][2] = threefirst[1].replace(/\xc2\xa0/, '');
                    }
                    numberpush.shift()
                    if (numberpush[0].length == 2) {
                        data[3][1] = numberpush[0]
                        numberpush.shift()
                    } else {
                        threeend = numberpush[0].split(" ")
                        data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                        data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                        numberpush.shift()
                        data[3][1] = numberpush[0]
                        numberpush.shift()
                    }
                    data[4][1] = padLeadingZeros((data[0][1] - 1), 6);
                    data[4][2] = padLeadingZeros((data[0][1] + 1), 6);

                    let wave = 5;
                    let minwave = 0;
                    let maxwave = 5;

                    for (const type of numberpush) {
                        if (wave >= 5) {
                            if (minwave < maxwave) {
                                minwave++;
                                data[wave][minwave] = type
                            }
                        }/*else{
                            minwave++;
                        }*/
                        /*if (minwave == maxwave && wave == 0) {
                            data[0][1] = type
                            minwave = 0;
                            maxwave = 1;
                            wave = 1;
                        }
                        if (minwave == maxwave && wave == 1) {
                            if(type.split(" ").length > 2){
                                threeend = type.split(" ")
                                data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                                data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                                data[2][3] = threeend[2].replace(/\xc2\xa0/, '');
                                data[2][4] = threeend[3].replace(/\xc2\xa0/, '');
                            }else{
                                threefirst = type.split(" ")
                                data[1][1] = threefirst[0].replace(/\xc2\xa0/, '');
                                data[1][2] = threefirst[1].replace(/\xc2\xa0/, '');
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 2;
                        }
                        if (minwave == maxwave && wave == 2) {
                            if(data[2].length == 5){
                                data[3][1] = type
                            }else{
                                threeend = type.split(" ")
                                data[2][1] = threeend[0].replace(/\xc2\xa0/, '');
                                data[2][2] = threeend[1].replace(/\xc2\xa0/, '');
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 3;
                        }
                        if (minwave == maxwave && wave == 3) {
                            if(data[2].length != 5){
                                data[3][1] = type
                            }
                            minwave = 0;
                            maxwave = 1;
                            wave = 4;
                        }
                        if (minwave == maxwave && wave == 4) {
                            data[4][1] = padLeadingZeros((data[0][1] - 1), 6);
                            data[4][2] = padLeadingZeros((data[0][1] + 1), 6);
                            minwave = 0;
                            maxwave = 5;
                            wave = 5;
                        }*/
                        if (minwave == maxwave && wave == 5) {
                            minwave = 0;
                            maxwave = 10;
                            wave = 6;
                        }
                        if (minwave == maxwave && wave == 6) {
                            minwave = 0;
                            maxwave = 50;
                            wave = 7;
                        }
                        if (minwave == maxwave && wave == 7) {
                            minwave = 0;
                            maxwave = 100;
                            wave = 8;
                        }
                    }

                    if ($('div').toArray()[2].firstChild.data != null && $('div').toArray()[2].firstChild.data != ' เวลา 14:30-16:00น.') {
                        /*fs.writeFile('tmp/' + ctx.query.date + '.txt', JSON.stringify(data), function (err) {
                            if (err) throw err;*/
                            //console.log('Saved!');
                            if (ctx.query.from !== undefined) {
                                data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
                            }
                            //res.send(data)
                            ctx.body = JSON.stringify(data);
                            ctx.status = 200;
                        //});
                    } else {
                        if (ctx.query.from !== undefined) {
                            data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
                        }
                        //res.send(data)
                        ctx.body = JSON.stringify(data);
                        ctx.status = 200;
                    }
                }).catch(error => {
                    //console.log(error);
                    data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                    /*res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(data));
                    res.end();*/
                    //res.send(data)
                    ctx.body = JSON.stringify(data);
                    ctx.status = 200;
                });
        //}
    }
});

router.get('/index2', async (ctx) => {
    /*ctx.body = 'Hello World';
    ctx.status = 200;*/
    if (!ctx.query.date) {
        ctx.query.date = padLeadingZeros(new Date().getDate(), 2) + '' + padLeadingZeros((new Date().getMonth() + 1), 2) + '' + (new Date().getFullYear() + 543)
    }
    /*try {
        if (ctx.query.fresh !== undefined) {
            fs.unlinkSync('tmp/' + ctx.query.date + '.txt');
        }
    } catch (err) {

    }*/
    let monthtext
    /*var fileContents = null;
    try {
        fileContents = fs.readFileSync('tmp/' + ctx.query.date + '.txt');
    } catch (err) {

    }*/
    /*if (fileContents) {
        data = JSON.parse(fileContents)
        if (ctx.query.from !== undefined) {
            switch (ctx.query.date.substr(2, 2)) {
                case '01': monthtext = "มกราคม"; break;
                case '02': monthtext = "กุมภาพันธ์"; break;
                case '03': monthtext = "มีนาคม"; break;
                case '04': monthtext = "เมษายน"; break;
                case '05': monthtext = "พฤษภาคม"; break;
                case '06': monthtext = "มิถุนายน"; break;
                case '07': monthtext = "กรกฎาคม"; break;
                case '08': monthtext = "สิงหาคม"; break;
                case '09': monthtext = "กันยายน"; break;
                case '10': monthtext = "ตุลาคม"; break;
                case '11': monthtext = "พฤศจิกายน"; break;
                case '12': monthtext = "ธันวาคม"; break;
            }

            data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
        }
        res.send(data);
    } else {*/
        await fetch('https://news.sanook.com/lotto/check/' + ctx.query.date + '/', { redirect: "manual"})
            .then(res => res.text())
            .then((body) => {
                let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                let $ = cheerio.load(body)

                data[0][1] = $('strong').toArray()[0].firstChild.data
                data[1][1] = $('strong').toArray()[1].firstChild.data
                data[1][2] = $('strong').toArray()[2].firstChild.data
                data[2][1] = $('strong').toArray()[3].firstChild.data
                data[2][2] = $('strong').toArray()[4].firstChild.data
                data[3][1] = $('strong').toArray()[5].firstChild.data
                data[4][1] = $('strong').toArray()[6].firstChild.data
                data[4][2] = $('strong').toArray()[7].firstChild.data

                let k = 5
                let i = 1
                for (const type of $('span').toArray()) {
                    var arrit = type.attribs.class + ''
                    if (!arrit.search('lotto__number')) {
                        if (k == 5 && i <= 5) {
                            data[k][i] = type.firstChild.data
                            i++
                        } else if (k == 5 && i > 5) {
                            k++
                            i = 1
                        }
                        if (k == 6 && i <= 10) {
                            data[k][i] = type.firstChild.data
                            i++
                        } else if (k == 6 && i > 10) {
                            k++
                            i = 1
                        }
                        if (k == 7 && i <= 50) {
                            data[k][i] = type.firstChild.data
                            i++
                        } else if (k == 7 && i > 50) {
                            k++
                            i = 1
                        }
                        if (k == 8 && i <= 100) {
                            data[k][i] = type.firstChild.data
                            i++
                        }
                    }
                }
                if ($('div').toArray()[2].firstChild.data.match('~[0-9]+~')) {
                    /*fs.writeFile('tmp/' + ctx.query.date + '.txt', JSON.stringify(data), function (err) {
                        if (err) throw err;*/
                        //console.log('Saved!');
                        if (ctx.query.from !== undefined) {
                            switch (ctx.query.date.substr(2, 2)) {
                                case '01': monthtext = "มกราคม"; break;
                                case '02': monthtext = "กุมภาพันธ์"; break;
                                case '03': monthtext = "มีนาคม"; break;
                                case '04': monthtext = "เมษายน"; break;
                                case '05': monthtext = "พฤษภาคม"; break;
                                case '06': monthtext = "มิถุนายน"; break;
                                case '07': monthtext = "กรกฎาคม"; break;
                                case '08': monthtext = "สิงหาคม"; break;
                                case '09': monthtext = "กันยายน"; break;
                                case '10': monthtext = "ตุลาคม"; break;
                                case '11': monthtext = "พฤศจิกายน"; break;
                                case '12': monthtext = "ธันวาคม"; break;
                            }

                            data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
                        }
                        //res.send(data)
                        ctx.body = JSON.stringify(data);
                        ctx.status = 200;
                    //});
                } else {
                    if (ctx.query.from !== undefined) {
                        switch (ctx.query.date.substr(2, 2)) {
                            case '01': monthtext = "มกราคม"; break;
                            case '02': monthtext = "กุมภาพันธ์"; break;
                            case '03': monthtext = "มีนาคม"; break;
                            case '04': monthtext = "เมษายน"; break;
                            case '05': monthtext = "พฤษภาคม"; break;
                            case '06': monthtext = "มิถุนายน"; break;
                            case '07': monthtext = "กรกฎาคม"; break;
                            case '08': monthtext = "สิงหาคม"; break;
                            case '09': monthtext = "กันยายน"; break;
                            case '10': monthtext = "ตุลาคม"; break;
                            case '11': monthtext = "พฤศจิกายน"; break;
                            case '12': monthtext = "ธันวาคม"; break;
                        }

                        data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
                    }
                    //res.send(data)
                    ctx.body = JSON.stringify(data);
                    ctx.status = 200;
                }
            })
            .catch((err) => {
                let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                //res.send(data)
                ctx.body = JSON.stringify(data);
                ctx.status = 200;
                console.log(err)
            });
    //}
});

addEventListener('fetch', event => {
    event.respondWith(router.resolve(event));
})