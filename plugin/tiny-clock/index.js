const timerEl = document.querySelector('#tiny-clock-number')
import text from "./i18n.js"
import { registerI18N, getI18N } from '../../script/main.js'

registerI18N(text)

setInterval(() => {
  const dayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
  timerEl.innerHTML = `${new Date().toLocaleString()}  ${getI18N(dayKey[new Date().getDay()])}`
})