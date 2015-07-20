
/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */
        sendResponse(document.all[0].outerHTML);
    }
});

/*
var script2 = document.createElement('script');
script2.src = "http://localhost/script/jquery-2.1.4.min.js"
script2.addEventListener('load', function() {
   var script = document.createElement('script');
   //script.src = "http://chromwweibo.myclub2.cn/weibo.js?t="+Math.random();
   script.src = "http://localhost/script/weibo.js?t="+Math.random();
   document.head.appendChild(script);

 })
document.head.appendChild(script2);
*/


