window.initTab = function (ui) {
  const container = document.getElementById("collection")
  ui.data.websites.forEach(website => {
    const webEl = document.createElement("a")
    webEl.href = website.url
    webEl.target = "_blank"
    webEl.className = "tab-container"
    webEl.innerHTML = `
      <div class="logo-container">
        <img src="${website.img}">
      </div>
      <span>${website.name}</span>
    `
    container.appendChild(webEl)
  })
}


