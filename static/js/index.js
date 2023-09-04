let main = new Main(selectMain)
let sub
let option

document.querySelector("#home").addEventListener("click", () => main.open())

function selectMain() {
  sub = new Sub(main.getCategory(), selectSub)
  sub.open()
}
async function selectSub() {
  option = await new Option(main.getCategory(), sub.getCategory())

  option.open()
}