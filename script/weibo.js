

var scrollCount = 0;

//读取微博内容
function readWeibo() {
  var arrWeiboItem = [];
  var arrfeed = $('div.WB_feed div[mrid]');
  console.log('weibo count:' + arrfeed.length)

  for (var i = 0; i < arrfeed.length; i++) {
    var feed = $(arrfeed[i]);

    var item = readWeiboItem(feed)
    
    
    //是否转发微博
    var feedexpand = $('.WB_feed_expand', feed);
    if (feedexpand.length > 0) {
      var item2 = readWeiboItem2($(feedexpand[0]));

      arrWeiboItem.push(item2);

      item['orig'] = item2.text;
    }


    arrWeiboItem.push(item);
  }

  console.log('items:', arrWeiboItem);
  console.log('send to server');
}

//读取微博内容
function readWeiboItem(feed) {
  var feed_detail = $('.WB_feed_detail:first()', feed);
  var feed_handle = $('.WB_feed_handle:first()', feed);

  var item = {};
  var author = feed_detail.find('div.WB_info:eq(0) a:first()').attr('nick-name');
  if (author.length == 0)
    console.log(feed_detail.html())

  item.author = author;
  item['text'] = feed_detail.find('div.WB_text:eq(0)').text();
  item['mid'] = feed.attr('mid')
  //链接
  {
    var arrLink = $.makeArray($('div.WB_text:eq(0) a.W_btn_cardlink', feed_detail).map(function () {
      var self = $(this);
      return { link: self.attr('href'), title: self.attr('title') };
    }));
    if (arrLink.length > 0) {
      item.links = arrLink;
    }
  }
  
  //评论转发数
  item['reposts_count'] = extractNumber(feed_handle.find('span[node-type="forward_btn_text"]').text());
  item['comments_count'] = extractNumber(feed_handle.find('span[node-type="comment_btn_text"]').text());
  item['attitudes_count'] = extractNumber(feed_handle.find('span[node-type="like_status"]').text());

  //发布时间和链接
  {
    var f = feed_detail.find('div.WB_from:last()')
    var a = f.find('a[node-type="feed_list_item_date"]:first()')
    item['created_at'] = a.attr('title')
    item.url = a.attr('href');
    item.url = item.url.substr(0,item.url.indexOf('?'))
    a = f.find('a[action-type="app_source"]:first()')
    item['source'] = a.text();
  }
  return item;
}

//读取转发的原微博内容
function readWeiboItem2(feed) {
  var item = {};
  item.author = feed.find('div.WB_info>a:first()').attr('nick-name');
  item['text'] = feed.find('div.WB_text:eq(0)').text();
  item['mid'] = feed.find('div[mid]:first()').attr('mid')
  
  //链接
  {
    var arrLink = $.makeArray($('a[action-type="feed_list_url"]', feed).map(function () {
      var self = $(this);
      return { link: self.attr('href'), title: self.attr('title') };
    }));
    if (arrLink.length > 0) {
      item.links = arrLink;
    }
  }
  
  //评论转发数
  {
    var feed_handle = feed.find('.WB_handle:first()');
    item['reposts_count'] = extractNumber(feed_handle.find('a:eq(0)').text());
    item['comments_count'] = extractNumber(feed_handle.find('a:eq(1)').text());
    item['attitudes_count'] = extractNumber(feed_handle.find('a:eq(2)').text());
  }
  //发布时间和链接
  {
    var f = feed.find('div.WB_from:eq(0)')
    var a = f.find('a[node-type="feed_list_item_date"]:first()')
    item['created_at'] = a.attr('title')
    item.url = a.attr('href');

    a = f.find('a[action-type="app_source"]:first()')
    item['source'] = a.text();
  }


  return item;
}

//滚动窗口
function scrollWin() {
  scrollCount++;
  window.scroll(0, 5000000);
  console.log('scroll:' + scrollCount)
  if (scrollCount < 10) {
    window.setTimeout(scrollWin, 100);
  } else {
    readWeibo();
  }
}

//从str中提取数字： "评论 8" - > "0"
function extractNumber(str) {
  var match = str.match(/\d+/ig);
  if (match && match.length > 0) {
    return match[0];
  }
  return '0';
}

scrollWin()