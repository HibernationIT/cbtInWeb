class Main {
  #section = document.querySelector("#main")
  #listElement = document.querySelector("#mainList")
  #selectFunction

  #category;

  constructor(selectFunction) {
    fetch("/static/data/교과.csv")
      .then((res) => res.text())
      .then((text) => {
        text.split("\n").forEach((value) => this.#listElement.append(this.#createRow(value)))
      })

    this.#selectFunction = selectFunction
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