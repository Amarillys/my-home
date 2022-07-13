window.initTab = function (ui) {
  const container = document.getElementById("collection")
  ui.data.websites = ui.data.websites.sort((p, q) => p.name > q.name ? 1: -1);
  ui.data.websites.forEach(website => {
    const webEl = document.createElement("a")
    webEl.href = website.url
    webEl.target = "_blank"
    webEl.className = "tab-container"
    webEl.innerHTML = `
      <div class="logo-container">
        <img src="${website.icon || `./plugin/collection/static/icons/${website.name.split('-')[0].toLowerCase()}.png`}">
      </div>
      <span style="color: ${website.color}">${website.name}</span>
    `
    container.appendChild(webEl)
  })
}


