window.addEventListener('load', () => {
  // bubble tag
  const bubbleWidthFn = (tags) => {
    tags.forEach((item) => {
      // get nearest parent card widget   
      const $bubbleNotation = item.querySelector('.bubble-notation > .bubble-item')
      const $bubbleContent = item.querySelector('.bubble-content')
      const parentCard = item.closest('.card-widget')
      if (!parentCard) return
      
      const eleOffset = btf.getEleLeft($bubbleContent)
      const bubbleWidth = $bubbleContent.offsetWidth
      if (eleOffset + bubbleWidth < window.innerWidth / 2) {
        const leftPos = item.offsetLeft + bubbleWidth - 30
        const maxWidth = (btf.getEleLeft(parentCard) + parentCard.offsetWidth) + 30 - (eleOffset + bubbleWidth) - 10
        const mask = 'polygon(5px 10px,20px 10px,30px 0,40px 10px,calc(100% - 5px) 10px,100% 15px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px),0 15px,5px 10px)'
        $bubbleNotation.style.maxWidth = (maxWidth <= 400) ? `${maxWidth}px` : '400px'
        $bubbleNotation.style.clipPath = mask
        $bubbleNotation.style.left = `${leftPos}px`
        $bubbleNotation.style.removeProperty('right')
      } else {
        const maxWidth = (eleOffset + bubbleWidth) + 30 - btf.getEleLeft(parentCard) - 10
        const p = item.closest('p')
        const rightPos = (btf.getEleLeft(p) + p.offsetWidth) - (eleOffset + bubbleWidth) - 30
        const mask = 'polygon(5px 10px, calc(100% - 20px) 10px, calc(100% - 30px) 0, calc(100% - 40px) 10px, calc(100% - 5px) 10px, 100% 15px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 15px, 5px 10px)'
        $bubbleNotation.style.maxWidth = (maxWidth <= 400) ? `${maxWidth}px` : '400px'
        $bubbleNotation.style.clipPath = mask
        $bubbleNotation.style.right = `${rightPos}px`
        $bubbleNotation.style.removeProperty('left')
      }
      $bubbleNotation.style.top = `calc(${item.offsetTop}px + 1.1em)`
    })
  }

  const $bubbleTags = document.querySelectorAll('.bubble')
  if (!$bubbleTags.length) return

  bubbleWidthFn($bubbleTags)

  var timer = null;
  window.addEventListener('resize', e => {
    clearTimeout(timer);
    timer = setTimeout(function(){
      bubbleWidthFn($bubbleTags)
    }, 500);
  })
})