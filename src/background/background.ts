
chrome.runtime.onMessage.addListener((msg, sender, sendRepsonse) => {
  console.log(msg)
  console.log(sender)
  sendRepsonse("From the background script!")
})