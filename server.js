const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
// get html of the page

const url = "https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list";

request(url, (err, response, html) => {
    if(!err) {
        const $ = cheerio.load(html);
        const plantInfo = $("#content").children();
        let items = [];
        plantInfo.each((index) => {
           const result = items.push($("#content").children().eq(index).children().eq(0).find("span.field-content").text());
            if(result !== ""){
                items.push(result);
            }
        });
        // console.log(items);
        fs.writeFile("output.txt", JSON.stringify(items, null, 4), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data has been added to output file.");
            }
        });
    }
    
});
