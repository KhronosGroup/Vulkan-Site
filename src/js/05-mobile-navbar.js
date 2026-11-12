;(function () {
  'use strict'

  initDropdowns()

  var navbarBurger = document.querySelector('.navbar-burger')
  if (!navbarBurger) return
  navbarBurger.addEventListener('click', toggleNavbarMenu.bind(navbarBurger))

  // Dropdown menus open on click/Enter/Space as well as hover, and close on Escape or when focus leaves.
  function initDropdowns () {
    var items = [].slice.call(document.querySelectorAll('.navbar-item.has-dropdown'))
    var desktop = window.matchMedia('(min-width: 1024px)')
    function setOpen (item, open) {
      item.classList.toggle('is-open', open)
      item.querySelector('.navbar-link').setAttribute('aria-expanded', open)
    }
    function syncMode () {
      // below 1024px the dropdown links are always visible inside the burger menu
      items.forEach(function (item) { setOpen(item, !desktop.matches && item.classList.contains('is-open')) })
      if (!desktop.matches) {
        items.forEach(function (item) { item.querySelector('.navbar-link').setAttribute('aria-expanded', 'true') })
      }
    }
    items.forEach(function (item) {
      var link = item.querySelector('.navbar-link')
      link.addEventListener('click', function (e) {
        e.stopPropagation()
        if (!desktop.matches) return
        var open = !item.classList.contains('is-open')
        items.forEach(function (other) { setOpen(other, false) })
        setOpen(item, open)
      })
      item.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || !item.classList.contains('is-open')) return
        setOpen(item, false)
        link.focus()
      })
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) setOpen(item, false)
      })
    })
    document.addEventListener('click', function () {
      items.forEach(function (item) { setOpen(item, false) })
    })
    if (desktop.addEventListener) desktop.addEventListener('change', syncMode)
    syncMode()
  }

  function toggleNavbarMenu (e) {
    e.stopPropagation() // trap event
    document.documentElement.classList.toggle('is-clipped--navbar')
    navbarBurger.setAttribute('aria-expanded', this.classList.toggle('is-active'))
    var menu = document.getElementById(this.getAttribute('aria-controls') || this.dataset.target)
    if (menu.classList.toggle('is-active')) {
      menu.style.maxHeight = ''
      var expectedMaxHeight = window.innerHeight - Math.round(menu.getBoundingClientRect().top)
      var actualMaxHeight = parseInt(window.getComputedStyle(menu).maxHeight, 10)
      if (actualMaxHeight !== expectedMaxHeight) menu.style.maxHeight = expectedMaxHeight + 'px'
    }
  }
})()
