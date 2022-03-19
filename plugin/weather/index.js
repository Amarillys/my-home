import text from './i18n.js'
import { registerI18N, getI18N } from '../../script/main.js'

registerI18N(text)

window.initWeather = function (comp) {
  const config = comp.data
  fetch(`${config.now}?key=${config.apiKey}&location=${config.latitude},${config.longitude}&lang=${config.lang}`)
  .then(r => r.json()).then(data => {
    const { code, now, fxLink } = data
    if (code != 200) return
    console.log(now)
    document.getElementById('now-temp').innerText = now.temp + '℃'
    document.getElementById('weather-icon').classList.add('qi-' + now.icon)
    document.getElementById('wind-text').innerText = `${now.windDir} ${now.windScale} ${getI18N('level')}`
  })

  fetch(`${config.sevenDay}?key=${config.apiKey}&location=${config.latitude},${config.longitude}&lang=${config.lang}`)
  .then(r => r.json()).then(data => {
    const { code, daily, fxLink } = data
    if (code != 200) return
    console.log(daily)
    daily.forEach((day, index) => {
      if (index === 0) {
        document.getElementById('today-min-max').innerText = `${day.tempMin} ~ ${day.tempMax}℃`
      }
    })
    // document.getElementById('temp-text').innerText = now.temp
  })

  fetch(`${config.recent}?key=${config.apiKey}&location=${config.latitude},${config.longitude}&lang=${config.lang}`)
  .then(r => r.json()).then(data => {
    const { code, summary } = data
    if (code != 200) return
    document.getElementById('rain-text').innerText = summary
  })

  window.WIDGET = {
    "CONFIG": {
      "layout": "2",
      "width": 230,
      "height": 270,
      "background": "1",
      "dataColor": "FFFFFF",
      "borderRadius": "5",
      "key": "de3a6a243a93434dbc4d33489fe00026"
    }
  }
  const script = document.createElement('script')
  script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
  document.querySelector('#weather-predict').appendChild(script)
}