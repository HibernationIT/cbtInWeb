let main
let sub
let option
let problem

const homeSection = document.querySelector("#home")
const problemCountInput = document.querySelector("#problemsCount")
const startButton = document.querySelector("#start")

window.onload = async () => {
  main = new Main(selectMain)
  await main.loadData()
  main.createRow()

  homeSection.addEventListener("click", () => main.open())
  startButton.addEventListener("click", start)
  problemCountInput.addEventListener("focusout", () => {
    if (problemCountInput.value > option.getProblemsCount())
      problemCountInput.value = option.getProblemsCount()
  })
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
const start = () => {
  problem = new Problem(option.getProblems())
  problem.open()
  problem.next()
}