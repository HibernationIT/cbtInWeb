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
    option.setSelectProblemsCount(problemCountInput.value)
  })
}
window.visualViewport.onresize = () => {
  document.querySelector("html").style.height = window.visualViewport.height + "px";
  document.querySelector("body").style.height = window.visualViewport.height + "px";
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
  problem = new Problem(option.getProblems(), option.getSelectProblemsCount(), end)
  problem.open()
  problem.next()
}
const end = () => {
  document.querySelector("#resultProblemCount").innerText = option.getSelectProblemsCount()
  document.querySelector("#resultAnswerCount").innerText = problem.getAnswerCount()
  document.querySelector("#resultWrongCount").innerText = problem.getWrongCount()
  const score = (problem.getAnswerCount() / option.getSelectProblemsCount()) * 100
  const resultScoreElement = document.querySelector("#resultScore")
  resultScoreElement.innerText = score
  if (score < 70) resultScoreElement.className = "wrong"

  document.querySelector("#resultBack").addEventListener("click", () => {
    location.reload()
  })

  document.querySelector("#result").style.left = "0px"
}