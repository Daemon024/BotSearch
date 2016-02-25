var google = require('google');
// var wait = require('wait.for');
var request = require("request");
var cheerio = require("cheerio");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// var hma = require('hma-proxy-scraper');
var extractor = require('email-extractor').Extractor;
var fs = require('fs');
// Google Params //
google.resultsPerPage = 100
var nextCounter = 0
var emailBis = "";
// var url = 'mongodb://localhost:27017/mail';

// //connect away
// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
//   if (err) throw err;
//   console.log("Connected to Database");

//   //simple json record
//   var document = {name:"David", title:"About MongoDB"};
  
//   //insert record
//   db.collection('test').insert(document, function(err, records) {
//     if (err) throw err;
//     console.log("Record added as "+records[0]._id);
//   });
// });

//////////////////
// Proxies for google /////////////////////////////////
// var proxieslist = {};
// var proxies = hma.getProxies(function (err,proxies) {
//     if(err)
//         throw err
// });
// console.log(proxies);
///////////////////////////////////////////////////////
// orange();

function free (str) {
  console.log("Keyword in use: ", str);
  console.log("-----------");
  file = str.replace(/\s+/g, '');
  console.log("File for save: ", file);
  console.log("-----------");
  fs.writeFile(file+'.txt', '');
  //
  var tmp = ""
  var links = [];
  var emailB = "";
  str = str.replace(/\s+/g, '%20');
  //
    for (i = 0; i < 50; i++) {
      request({   
        uri: "http://search.free.fr/google.pl?page="+i+"&qs="+str,
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        $(".linkgoogle").each(function() {
          var link = $(this);
          var text = link.text();
          tmp = text;
          links.push(tmp);
        });
        for (var i = 0; i < links.length; i++) {
          extractor(links[i], function (url, email){
          var match = email.match(/(gif|png|jpg|jpeg)$/);
            if (email !== emailB && match == null){
              console.log(email);
              // fs.appendFile(file+'.txt', email + "\n", function (err) {
              //    if(err) {
              //       return console.log(err);
              //      }
              //     console.log("The file was saved!");
              // }); 
              emailB = email;
            }
          });
        }
      });
    }
}

free('Pressing contact');

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
