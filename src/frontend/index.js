google.script.run
  .withSuccessHandler((items) => {
    const elements = items.map(((i) => {
      const li = document.createElement('li')
      li.innerHTML = i.title
      return li
    }))
    const list = document.getElementById('inbox-list')
    list.innerHTML = ''
    elements.forEach(el => list.appendChild(el))
  })
  .withFailureHandler((err) => {
    const list = document.getElementById('inbox-list')
    list.innerHTML = `<li>${String(err)}</li>`
  })
  .withUserObject(this)
  .inbox_getItems()