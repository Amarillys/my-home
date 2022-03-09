import { initTheme, fetchUserData, initUI } from './script/main.js'

async function main() {
  let userData = await fetchUserData()
  initTheme(userData)
  initUI(userData.ui)
}

main()