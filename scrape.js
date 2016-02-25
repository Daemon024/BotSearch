var google = require('google');
var neek = require('neek');
// var wait = require('wait.for');
var request = require('request');
var cheerio = require('cheerio');
// var hma = require('hma-proxy-scraper');
var extractor = require('email-extractor').Extractor;
var fs = require('fs');
// Google Params //
google.resultsPerPage = 100
var nextCounter = 0
var emailBis = "";
var str = process.argv[2];
var str2 = process.argv[3]
var str3 = process.argv[4]
var str4 = process.argv[5]
if (str2 != null & str3 == null & str4 == null) {
  str = str+str2;
};
if (str2 != null & str3 != null & str4 == null ) {
  str = str+str2+str3;
};
if (str2 != null & str3 != null & str4 != null ) {
  str = str+str2+str3+str4;
};
//
str = str.replace(/\s+/g, '%20');
console.log(str);

free(str);
function free (str) {
  console.log("Keyword in use: ", str);
  console.log("-----------");
  file = str.replace(/\s+/g, '');
  console.log("File for save: ", file);
  console.log("-----------");
  file = file + '.txt';
  //
  var readable = file+'.txt';
  var writable = file+'.txt';
  var tmp = ""
  var links = [];
  var emailB = "";
  str = str.replace(/\s+/g, '%20');
  //
    for (i = 0; i < 100; i++) {
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
              //console.log(email);
              fs.appendFileSync(file, email+'\n', "UTF-8",{'flags': 'a+'});
              neek.unique(readable, writable, function(){
              });
              emailB = email;
            }
          });
        }
      });
    }
}

//free('Developpement web agency website contact');

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
