async function fetchUserData() {
  let data = await (await fetch('./data/user-data.json')).json()
  if (data.server != 'local') data = await (await fetch(data.server)).json()
  return data
}

function generateDefaultData() {
  return {
  }
}

function initTheme(uiData) {
  const header = document.querySelector("head")
  const styleEl = document.createElement('link')
  styleEl.href = `./theme/${uiData.theme}/index.css`
  styleEl.rel = "stylesheet"
  header.appendChild(styleEl)
}

function initUI(uiData) {
  const container = document.querySelector("main")
  uiData.forEach(ui => {
    ui.path = ui.path || ui.name
    let div = document.createElement('div')
    let pos = ui.position
    div.style.display = 'block'
    div.style.position = 'fixed'
    div.style.width = pos.w
    div.style.height = pos.h
    div.style.left = pos.x
    div.style.top = pos.y
    div.style.background = ui.bg
    div.style.padding = ui.padding
    div.style.opacity = ui.opacity
    if (ui.position.type === 'relative') {
      div.style.left = window.innerWidth + ui.position.x
      div.style.top = window.innerHeight + ui.position.y
    }
    if (ui.type === 'inject') {
      fetch(`./plugin/${ui.path}/index.html`).then(h => h.text()).then(html => {
        div.innerHTML = html
        ui.script.forEach(script => {
          const scriptEl = document.createElement('script')
          scriptEl.src = `./plugin/${ui.path}/${script}`
          scriptEl.type = `module`
          scriptEl.onload = () => {
            typeof window[ui.entry] === "function" && window[ui.entry](ui)
          }
          div.appendChild(scriptEl) 
        })
        container.appendChild(div)
      })
    }
  })
}

function initDefaultUI() {

}

const I18N = {}
window.language = window.navigator.language
function registerI18N (i18nObject) {
  for (let key in i18nObject) {
    I18N[key] = I18N[key] || {}
    Object.assign(I18N[key], i18nObject[key])
  }
}

function getI18N(key) {
  if (!I18N[window.language]) I18N[window.language] = I18N[window.language.slice(0, 2)]
  if (!I18N[window.language]) return key
  return I18N[window.language][key] || key
}

function getParameters() {
  let queryDict = {}
  window.location.search.substr(1).split("&").filter(k => k).forEach(
    function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]}
  )
  return queryDict;
}

export {
  fetchUserData, generateDefaultData, initDefaultUI, initUI, initTheme, registerI18N, getI18N, getParameters
}