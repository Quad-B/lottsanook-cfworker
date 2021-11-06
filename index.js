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
        var raw
    if (!req.query.date) {
        raw = JSON.stringify({
            date: padLeadingZeros(new Date().getDate(), 2),
            month: padLeadingZeros((new Date().getMonth() + 1), 2),
            year: new Date().getFullYear()
        });
    } else {
        raw = JSON.stringify({
            date: req.query.date.substr(0, 2),
            month: req.query.date.substr(2, 2),
            year: parseInt(req.query.date.substr(4, 4)) - 543
        });
    }
    var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: 'follow'
    };

    fetch("https://www.glo.or.th/api/lottery/getLotteryAward", requestOptions)
        .then(response => response.json())
        .then(result => {
            let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            data[0][1] = result["response"]["data"]["first"]["number"][0]["value"]
            for (let [index, val] of result["response"]["data"]["last3f"]["number"].entries()) {
                data[1][index + 1] = val["value"]
            }
            for (let [index, val] of result["response"]["data"]["last3b"]["number"].entries()) {
                data[2][index + 1] = val["value"]
            }
            data[3][1] = result["response"]["data"]["last2"]["number"][0]["value"]
            for (let [index, val] of result["response"]["data"]["near1"]["number"].entries()) {
                data[4][index + 1] = val["value"]
            }
            for (let [index, val] of result["response"]["data"]["second"]["number"].entries()) {
                data[5][index + 1] = val["value"]
            }
            for (let [index, val] of result["response"]["data"]["third"]["number"].entries()) {
                data[6][index + 1] = val["value"]
            }
            for (let [index, val] of result["response"]["data"]["fourth"]["number"].entries()) {
                data[7][index + 1] = val["value"]
            }
            for (let [index, val] of result["response"]["data"]["fifth"]["number"].entries()) {
                data[8][index + 1] = val["value"]
            }
            if (req.query.from !== undefined) {
                switch (req.query.date.substr(2, 2)) {
                    case '01':
                        monthtext = "มกราคม";
                        break;
                    case '02':
                        monthtext = "กุมภาพันธ์";
                        break;
                    case '03':
                        monthtext = "มีนาคม";
                        break;
                    case '04':
                        monthtext = "เมษายน";
                        break;
                    case '05':
                        monthtext = "พฤษภาคม";
                        break;
                    case '06':
                        monthtext = "มิถุนายน";
                        break;
                    case '07':
                        monthtext = "กรกฎาคม";
                        break;
                    case '08':
                        monthtext = "สิงหาคม";
                        break;
                    case '09':
                        monthtext = "กันยายน";
                        break;
                    case '10':
                        monthtext = "ตุลาคม";
                        break;
                    case '11':
                        monthtext = "พฤศจิกายน";
                        break;
                    case '12':
                        monthtext = "ธันวาคม";
                        break;
                }

                data[0][0] = req.query.date.substring(0, 2) + monthtext + req.query.date.substring(4, 8)
            }
            //res.send(data)
            ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
            ctx.body = JSON.stringify(data);
            ctx.status = 200;
        })
        .catch(error => {
            /*let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            res.send(data)*/
            if (req.query.from !== undefined) {
                fetch('https://lottsanook.vercel.app/api/index2?date=' + req.query.date + '&from')
                    .then(res => res.json())
                    .then((body) => {
                        //res.send(body)
                        ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                        ctx.body = JSON.stringify(data);
                        ctx.status = 200;
                    })
            } else {
                fetch('https://lottsanook.vercel.app/api/index2?date=' + req.query.date)
                    .then(res => res.json())
                    .then((body) => {
                        //res.send(body)
                        ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                        ctx.body = JSON.stringify(data);
                        ctx.status = 200;
                    })
            }
        });
});

router.get('/index2', async (ctx) => {
    if (!ctx.query.date) {
        ctx.query.date = padLeadingZeros(new Date().getDate(), 2) + '' + padLeadingZeros((new Date().getMonth() + 1), 2) + '' + (new Date().getFullYear() + 543)
    }
    if (ctx.query.date.substring(4, 8) == new Date().getFullYear() + 543) {
        if (ctx.query.from !== undefined) {
            await fetch('https://lottsanook.vercel.app/api/index3?date=' + ctx.query.date + '&from')
                .then(res => res.json())
                .then((body) => {
                    //res.send(body)
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                    ctx.body = JSON.stringify(body);
                    //ctx.body = body;
                    ctx.status = 200;
                    /*ctx.body = 'test';
                    ctx.status = 200;*/
                })
        } else {
            await fetch('https://lottsanook.vercel.app/api/index3?date=' + ctx.query.date)
                .then(res => res.json())
                .then((body) => {
                    //res.send(body)
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                    ctx.body = JSON.stringify(body);
                    //ctx.body = body;
                    ctx.status = 200;
                    /*ctx.body = 'test';
                    ctx.status = 200;*/
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
        await fetch('https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%87%E0%B8%A7%E0%B8%94-' + ctx.query.date.substring(0, 2) + '-' + encodeURI(monthtext) + '-' + ctx.query.date.substring(4, 8) + '.aspx', { redirect: "error" })
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
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
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
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                    ctx.body = JSON.stringify(data);
                    ctx.status = 200;
                    //});
                } else {
                    if (ctx.query.from !== undefined) {
                        data[0][0] = ctx.query.date.substring(0, 2) + monthtext + ctx.query.date.substring(4, 8)
                    }
                    //res.send(data)
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                    ctx.body = JSON.stringify(data);
                    ctx.status = 200;
                }
            }).catch(error => {
                //console.log(error);
                data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
                /*res.writeHead(200, { 'content-type': 'application/json; charset=utf-8','access-control-allow-origin': '*' });
                res.write(JSON.stringify(data));
                res.end();*/
                //res.send(data)
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(data);
                ctx.status = 200;
            });
        //}
    }
});

router.get('/index3', async (ctx) => {
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
    await fetch('https://news.sanook.com/lotto/check/' + ctx.query.date + '/', { redirect: "error" })
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
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
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
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(data);
                ctx.status = 200;
            }
        })
        .catch((err) => {
            let data = [["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0], ["\u0e40\u0e25\u0e02\u0e2b\u0e19\u0e49\u0e323\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e223\u0e15\u0e31\u0e27", 0, 0], ["\u0e40\u0e25\u0e02\u0e17\u0e49\u0e32\u0e222\u0e15\u0e31\u0e27", 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e02\u0e49\u0e32\u0e07\u0e40\u0e04\u0e35\u0e22\u0e07\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e481", 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e482", 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e483", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e484", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e17\u0e35\u0e485", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
            //res.send(data)
            ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
            ctx.body = JSON.stringify(data);
            ctx.status = 200;
            console.log(err)
        });
    //}
});

router.get('/reto', async (ctx) => {
    if (!ctx.query.date) {
        ctx.query.date = padLeadingZeros(new Date().getDate(), 2) + '' + padLeadingZeros((new Date().getMonth() + 1), 2) + '' + (new Date().getFullYear() + 543)
    }
    await fetch('https://news.sanook.com/lotto/check/' + ctx.query.date + '/', { redirect: "error" })
        .then(res => res.text())
        .then((body) => {
            ctx.body = 'yes';
            ctx.status = 200;
        })
        .catch((err) => {
            ctx.body = 'no';
            ctx.status = 200;
        });
});

router.get('/god', async (ctx) => {
    if (ctx.query.format == "thtext") {
        await fetch('https://raw.githubusercontent.com/boyphongsakorn/testrepo/main/godthtext')
            .then(res => res.json())
            .then((body) => {
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(body);
                ctx.status = 200;
            })
    } else if (ctx.query.format == "combothtext") {
        await fetch('https://raw.githubusercontent.com/boyphongsakorn/testrepo/main/godcombothtext')
            .then(res => res.json())
            .then((body) => {
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(body);
                ctx.status = 200;
            })
    } else {
        await fetch('https://raw.githubusercontent.com/boyphongsakorn/testrepo/main/god')
            .then(res => res.json())
            .then((body) => {
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(body);
                ctx.status = 200;
            })
    }
});

router.get('/gdpy', async (ctx) => {
    let peryear = []
    let yearlist = []
    /*var fileContents = null;
    try {
        if (ctx.query.year == new Date().getFullYear() + 543) {
            fs.unlinkSync('tmp/' + ctx.query.year + '.txt');
            console.log('yes this year')
        }
        fileContents = fs.readFileSync('tmp/' + ctx.query.year + '.txt');
    } catch (err) {

    }
    if (fileContents) {
        res.send(JSON.parse(fileContents));
    } else {*/
    await fetch('https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%9B%E0%B8%B5-' + ctx.query.year + '.aspx')
        .then(res => res.text())
        .then((body) => {
            var $ = cheerio.load(body);
            for (const val of $('font').toArray()) {
                if (val.firstChild.data.indexOf("ตรวจสลากกินแบ่งรัฐบาล") > -1) {
                    let day = val.firstChild.data.split(" ").splice(2)
                    let monthnum
                    switch (day[2]) {
                        case 'มกราคม': monthnum = "01"; break;
                        case 'กุมภาพันธ์': monthnum = "02"; break;
                        case 'มีนาคม': monthnum = "03"; break;
                        case 'เมษายน': monthnum = "04"; break;
                        case 'พฤษภาคม': monthnum = "05"; break;
                        case 'มิถุนายน': monthnum = "06"; break;
                        case 'กรกฎาคม': monthnum = "07"; break;
                        case 'สิงหาคม': monthnum = "08"; break;
                        case 'กันยายน': monthnum = "09"; break;
                        case 'ตุลาคม': monthnum = "10"; break;
                        case 'พฤศจิกายน': monthnum = "11"; break;
                        case 'ธันวาคม': monthnum = "12"; break;
                    }
                    peryear.unshift(padLeadingZeros(day[0], 2) + monthnum + day[3])
                }
            }
            for (const val of peryear) {
                yearlist.push(val)
            }
            //fs.writeFile('tmp/' + ctx.query.year + '.txt', JSON.stringify(yearlist), function (err) {
            //if (err) throw err;
            //res.send(yearlist)
            ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
            ctx.body = JSON.stringify(yearlist);
            ctx.status = 200;
            //});
        })
    //}
});

router.get('/checklottery', async (ctx) => {
    let result = ""
    await fetch('https://lottsanook.vercel.app/api/?date=' + ctx.query.by)
        .then(res => res.json())
        .then((body) => {
            body.forEach(function (val, x) {
                val.forEach(function (superval, y) {
                    if (superval == ctx.query.search || superval == ctx.query.search.substr(0, 3) || superval == ctx.query.search.substr(3, 6) || superval == ctx.query.search.substr(4, 6) && y != 0) {
                        if (x == 0) {
                            result = result + "111111,";
                        }
                        if (x == 1) {
                            result = result + "333000,";
                        }
                        if (x == 2) {
                            result = result + "000333,";
                        }
                        if (x == 3) {
                            result = result + "000022,";
                        }
                        if (x == 4) {
                            result = result + "111112,";
                        }
                        if (x == 5) {
                            result = result + "222222,";
                        }
                        if (x == 6) {
                            result = result + "333333,";
                        }
                        if (x == 7) {
                            result = result + "444444,";
                        }
                        if (x == 8) {
                            result = result + "555555,";
                        }
                    }
                })
            })
            ctx.body = result.substring(0, result.length - 1);
            ctx.status = 200;
            //res.send(result.substring(0, result.length - 1))
        })
});

router.get('/lastlot', async (ctx) => {
    let lastdate
    let viewer
    await fetch('https://lottsanook.vercel.app/api/gdpy?year=' + (new Date().getFullYear() + 543))
        .then(res => res.json())
        .then((body) => {
            lastdate = body[body.length - 1]
        })
    await fetch('https://lottsanook.vercel.app/api/?date=' + lastdate)
        .then(res => res.json())
        .then((body) => {
            if (ctx.query.info !== undefined) {
                viewer = {
                    info: {
                        date: lastdate
                    },
                    win: body[0][1],
                    threefirst: body[1][1] + ',' + body[1][2],
                    threeend: body[2][1] + ',' + body[2][2],
                    twoend: body[3][1]
                }
            } else {
                viewer = {
                    win: body[0][1],
                    threefirst: body[1][1] + ',' + body[1][2],
                    threeend: body[2][1] + ',' + body[2][2],
                    twoend: body[3][1]
                }
            }
            ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
            ctx.body = JSON.stringify(viewer);
            ctx.status = 200;
        })
});

router.get('/getchit', async (ctx) => {
    let a = []
    await fetch('https://www.huayvips.com/luckynumber/')
        .then(res => res.text())
        .then((body) => {
            let $ = cheerio.load(body)
            for (const val of $('img').toArray()) {
                if (val.attribs.src.indexOf('TL') > -1) {
                    a.push(val.attribs.src)
                }
                if (val.attribs.src.indexOf('DN') > -1) {
                    a.push(val.attribs.src)
                }
                if (val.attribs.src.indexOf('BT') > -1) {
                    a.push(val.attribs.src)
                }
                if (a.length == 3) {
                    ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                    ctx.body = JSON.stringify(a);
                    ctx.status = 200;
                    return
                }
            }
        })
});

router.get('/finddol', async (ctx) => {
    let channels
    let allwin = []
    if (ctx.query.search.length > 3) {
        await fetch('https://raw.githubusercontent.com/boyphongsakorn/testrepo/main/tmp/' + ctx.query.search.toString())
            .then(res => res.json())
            .then((body) => {
                //res.send(body)
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(body);
                ctx.status = 200;
            }).catch((err) => {
                //res.send(allwin)
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(allwin);
                ctx.status = 200;
                //console.log(err)
                var https = require('follow-redirects').https;

                var options = {
                    'method': 'POST',
                    'hostname': 'api.github.com',
                    'path': '/repos/boyphongsakorn/testrepo/actions/workflows/blank.yml/dispatches',
                    'headers': {
                        'Accept': 'application/vnd.github.v3+json',
                        'Authorization': 'token ' + process.env.gtoken,
                        'Content-Type': 'application/json',
                        'User-Agent': 'PostmanRuntime/7.28.4'
                    },
                    'maxRedirects': 20
                };

                var reqtwo = https.request(options, function (res) {
                    var chunks = [];

                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    res.on("end", function (chunk) {
                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                    });

                    res.on("error", function (error) {
                        console.error(error);
                    });
                });

                var postData = JSON.stringify({
                    "inputs": {
                        "number": req.query.search.toString()
                    },
                    "ref": "refs/heads/main"
                });

                reqtwo.write(postData);

                reqtwo.end();
            });
    } else {
        fetch('https://astro.meemodel.com/%E0%B8%A7%E0%B8%B4%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%B0%E0%B8%AB%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%82%E0%B8%AB%E0%B8%A7%E0%B8%A2/' + ctx.query.search, { redirect: 'error' })
            .then(res => res.text())
            .then((body) => {
                let $ = cheerio.load(body)
                $('td').toArray().forEach(element => {
                    let sl = element.firstChild.data
                    if (sl != null && sl.split(" ").length == 3 && sl.split(" ")[2] >= 2550) {
                        allwin.unshift(sl)
                    }

                });
                //res.send(allwin)
                ctx.response = { headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' } }
                ctx.body = JSON.stringify(allwin);
                ctx.status = 200;
            });
    }
});

router.allowMethods();

addEventListener('fetch', event => {
    event.respondWith(router.resolve(event));
})
