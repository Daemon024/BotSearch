var google = require('google');
//var sleep = require('sleep');
var wait = require('wait.for');
var request = require("request");
var cheerio = require("cheerio");
var hma = require('hma-proxy-scraper');
var extractor = require('email-extractor').Extractor;
var fs = require('fs');
// Google Params //
google.resultsPerPage = 100
var nextCounter = 0
var emailBis = "";
//////////////////
var argv = require('minimist')(process.argv.slice(1));

// Proxies for google /////////////////////////////////
// var proxieslist = {};
// var proxies = hma.getProxies(function (err,proxies) {
//     if(err)
//         throw err
// });
// console.log(proxies);
///////////////////////////////////////////////////////
orange();

function orange () {
//console.log("Keyword in use: ", argv.k);
// var str = argv.k;
// str = str.replace(/\s+/g, '');
// console.log("File for save: ", str);
// fs.writeFile(str+'.txt', '');
request({
  uri: "http://lemoteur.orange.fr/?module=orange&bhv=web_fr&kw=Agence%20de%20communication%20contact&profil=orange2",
}, function(error, response, body) {
  var $ = cheerio.load(body);

  $(".ellipsisLine").each(function() {
    var link = $(this);
    var text = link.text();
    var href = link.attr("href");

	extractor(text,function(url,email){
	    console.log(url,email);
	});
  });
});
}
/////////////////////////////////////////////////////////
// function google (argv) {
// console.log("Keyword in use: ", argv.k);
// var str = argv.k;
// str = str.replace(/\s+/g, '');
// console.log("File for save: ", str);
// fs.writeFile(str+'.txt', '');
// google(argv.k+' inurl:contact site:.fr', function (err, next, links){
// 	if (err) console.error(err)
// 	for (var i = 0; i < links.length; ++i) {
// 	  	extractor(links[i].link,function(url, email){
// 	  		var match = email.match(/(gif|png|jpg|jpeg)$/);
// 	  		if (email !== emailBis && match == null) {

// 			  	fs.appendFile(str+'.txt', email + "\n", function (err) {
// 				});
// 				emailBis = email;
// 			}
// 		});
// 	}
// 	if (nextCounter < 5) {
// 	    nextCounter += 1
// 	    sleep.sleep(120);
// 	    google.requestOptions = {
// 		  proxy: 'http:'+proxies[1],
// 		  timeout: 30000,
// 		  jar: true,
// 		  headers: {
// 		    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
// 		    'Accept-Encoding': 'gzip, deflate',
// 		    'Accept-Language': 'en;q=0.5',
// 		    'Cache-Control': 'max-age=0',
// 		    'Connection': 'keep-alive',
// 		    'DNT': 1
// 		  }
// 		}
// 		if (next) next()
// 	}
// })
// }