!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");e.setAttribute("disabled",""),t.addEventListener("click",(function(){n.start()})),e.addEventListener("click",(function(){n.stop()}));var n={bgColorInterval:null,start:function(){var t=this;o(),this.bgColorInterval=setInterval((function(){!function(t){document.body.style.backgroundColor=t}("#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))),t.isActive=!0}),1e3)},stop:function(){clearInterval(this.bgColorInterval),o()}};function o(){t.toggleAttribute("disabled"),e.toggleAttribute("disabled")}}();
//# sourceMappingURL=01-color-switcher.8cce8c62.js.map
