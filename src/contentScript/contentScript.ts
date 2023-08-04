
chrome.runtime.sendMessage("From the content script!", (resp) => {
  console.log(resp)
})