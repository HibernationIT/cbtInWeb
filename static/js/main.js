class Main {
  #section = document.querySelector("#main")
  #listElement = document.querySelector("#mainList")

  #list
  #selectFunction
  #category

  constructor(selectFunction) {
    this.#selectFunction = selectFunction
  }

  async loadData() {
    await fetch("static/data/교과.csv")
      .then((res) => res.text())
      .then((text) => this.#list = text.split("\n"))
  }
  createRow() {
    this.#list.forEach((text) => {
      this.#listElement.append(this.#createRow(text))
    })
  }
  open() {
    this.#section.style.opacity = "100%"
    this.#section.style.left = "0px"
  }
  getCategory() {
    return this.#category
  }
  #createRow(text) {
    const element = document.createElement("button")
    element.addEventListener("click", () => {
      this.#category = text
      this.#selectFunction()
    })
    element.innerText = text
    return element
  }
}