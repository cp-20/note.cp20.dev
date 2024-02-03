window.twttr = (function (t, e, r) {
  var n,
    d = t.getElementsByTagName(e)[0],
    i = window.twttr || {}
  return (
    t.getElementById(r) ||
      (((n = t.createElement(e)).id = r),
      (n.src = "https://platform.twitter.com/widgets.js"),
      d.parentNode.insertBefore(n, d),
      (i._e = []),
      (i.ready = function (t) {
        i._e.push(t)
      })),
    i
  )
})(document, "script", "twitter-wjs")

window.twttr.ready(() => {
  const theme = document.documentElement.getAttribute("saved-theme")
  document.querySelectorAll(".tweet-embed").forEach((el) => {
    const tweetId = el.getAttribute("data-twee-id")
    window.twttr.widgets.createTweet(tweetId, el, { theme }).then((t) => {
      t.querySelector("iframe").style.colorScheme = "normal"
    })
  })
})
