
var arrfeed = $('div.WB_feed>div');

for (var i = 0; i < arrfeed.length; i++) {
  var feed=arrfeed[i];
  var author=$('.WB_info',feed).text();
  console.log('author:' + i +',' + author);
}
 
