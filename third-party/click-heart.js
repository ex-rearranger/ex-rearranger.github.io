! function(e, t) {
  if ("false" === t.getElementById("click-heart")
    .getAttribute("mobile") && /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) return;
  const a = [];

  function n() {
    for (let e = 0; e < a.length; e++) a[e].alpha <= 0 ? (t.body.removeChild(a[e].el), a.splice(e, 1)) : (a[e].y--, a[e].scale += .004, a[e].alpha -= .013, a[e].el.style.cssText = "left:" + a[e].x + "px;top:" + a[e].y + "px;opacity:" + a[e].alpha + ";transform:scale(" + a[e].scale + "," + a[e].scale + ") rotate(45deg);background:" + a[e].color);
    requestAnimationFrame(n)
  }

  function o() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
  }
  e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
      setTimeout(e, 1e3 / 60)
    },
    function(e) {
      const a = t.createElement("style");
      try {
        a.appendChild(t.createTextNode(e))
      } catch (t) {
        a.styleSheet.cssText = e
      }
      t.getElementsByTagName("head")[0].appendChild(a)
    }(".heart{width: 10px;height: 10px;position: fixed;background: #f00;z-index: 99999999;transform: rotate(45deg);}.heart::after,.heart::before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;position: absolute;}.heart::after{top: -5px;}.heart::before{left: -5px;}"),
    function() {
      const n = "function" == typeof e.onclick && e.onclick;
      e.onclick = function(e) {
        n && n(),
          function(e) {
            const n = t.createElement("div");
            n.className = "heart", a.push({
              el: n,
              x: e.clientX - 5,
              y: e.clientY - 5,
              scale: 1,
              alpha: 1,
              color: o()
            }), t.body.appendChild(n)
          }(e)
      }
    }(), n()
}(window, document);