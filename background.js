// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  //var action_url = "javascript:window.print();";
  //chrome.tabs.update(tab.id, {url: action_url});
  //chrome.tabs.executeScript(null, {file: "script/jquery-2.1.4.min.js.js"});
  //chrome.tabs.executeScript(null,  {code:"document.body.bgColor='red'"});
  console.log("I received the following DOM content:\n" + tab.id);

  chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                doStuffWithDOM);

});
/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
    console.log("I received the following DOM content:\n" + domContent);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // LOG THE CONTENTS HERE
    console.log('on message')
    console.log(request);
  }
);
