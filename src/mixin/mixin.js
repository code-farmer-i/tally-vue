export const windowScroll = {
  directives:{
    'window-scroll': {
      bind: (el, binding)=>{
        window.addEventListener('scroll', ()=>{
            binding.value(document.body.scrollTop)
        },false)
      }
    }
  }
}
