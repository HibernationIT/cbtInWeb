let main
let sub
let option

window.onload = async () => {
  main = new Main(selectMain)
  await main.loadData()
  main.createRow()

  document.querySelector("#home").addEventListener("click", () => main.open())
}


const selectMain = async () => {
  sub = new Sub(main.getCategory(), selectSub)
  await sub.loadData()
  sub.createRow()
  sub.open()
}
const selectSub = async () => {
  option = new Option(main.getCategory(), sub.getCategory())
  await option.loadData()
  document.querySelector("#allCount").innerText = option.getProblemsCount()
  option.open()
}