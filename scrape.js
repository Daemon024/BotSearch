var google = require('google');
// var wait = require('wait.for');
var request = require("request");
var cheerio = require("cheerio");
// var hma = require('hma-proxy-scraper');
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
// orange();

function orange (str) {
// //console.log("Keyword in use: ", argv.k);
// // var str = argv.k;
// // str = str.replace(/\s+/g, '');
// // console.log("File for save: ", str);
// // fs.writeFile(str+'.txt', '');
  var tmp = ""
  var links = [];
  var emailB = "";
  var ap = 1;
  str = str.replace(/\s+/g, '%20');
  console.log(str);
     for (var i = 0; i < 49; i++) {
      console.log(i);
        request({
    uri: "http://lemoteur.orange.fr/?module=lemoteur&bhv=web_fr&kw="+str+"&profil=orange2&ap="+i,
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".ellipsisLine").each(function() {
      var link = $(this);
      var text = link.text();
      tmp = text;
      tmp = tmp.replace(/(\r\t|\t|\r)/gm,"");
      tmp = tmp.replace(/(\r\n|\n|\r)/gm,"");
      tmp = "http://" + tmp;
      links.push(tmp);
    });
    for (var i = 0; i < links.length; i++) {
      console.log(links[i]);
      extractor(links[i], function (url, email){
        if (email !== emailB){
          console.log("email: ", email);
          emailB = email;
        }
      });
    }
    //console.log(links);
  });
    };

}

orange('Agence de communication Test');
/////////////////////////////////////////////////////////

// console.log("Keyword in use: ", argv.k);
// var str = argv.k;
// str = str.replace(/\s+/g, '');
// console.log("File for save: ", str);
// fs.writeFile(str+'.txt', '');
// google(argv.k+' inurl:contact site:.fr', function (err, next, links){
//  if (err) console.error(err)
//  for (var i = 0; i < links.length; ++i) {
//    console.log("link: ", links[i].link);
//      extractor(links[i].link,function(url, email){
//        var match = email.match(/(gif|png|jpg|jpeg)$/);
//        if (email !== emailBis && match == null) {
//          fs.appendFile(str+'.txt', email + "\n", function (err) {
//        });
//        emailBis = email;
//      }
//    });
//  }
//  if (nextCounter < 5) {
//     nextCounter += 1
//    if (next) next()
//  }
// })
// (err) console.error(err)
// 	for (var i = 0; i < links.length; ++i) {
// 		console.log("link: ", links[i].link);
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
//     nextCounter += 1
// 		if (next) next()
// 	}
// })
