

var scrollCount = 0;

//读取微博内容
function readWeibo() {
  var arrfeed = $('div.WB_feed div[mrid]');
  console.log('weibo count:' + arrfeed.length)
  for (var i = 0; i < arrfeed.length; i++) {
    var feed = arrfeed[i];
    var author = $('.WB_detail', feed).text().replace(/\s/g, '');
 
    console.log('WB_detail:' + i + ',' + author);
  }
}

//滚动窗口
function scrollWin() {
  scrollCount++;
  window.scroll(0, 5000000);
  console.log('scroll:' + scrollCount)
  if (scrollCount < 10) {
    window.setTimeout(scrollWin, 500);
  } else {
    readWeibo();
  }
}

readWeibo()