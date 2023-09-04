class Sub {
  #section = document.querySelector("#sub")
  #listElement = document.querySelector("#subList")
  #backButton = document.querySelector("#subBack")
  #selectFunction

  #category;

  constructor(main, selectFunction) {
    this.#backButton.addEventListener("click", () => this.close())

    fetch("/static/data/"+main+"/과목.csv")
      .then((res) => res.text())
      .then((text) => {
        text.split("\n").forEach((value) => this.#listElement.append(this.#craeteRow(value)))
      })

    this.#selectFunction = selectFunction
  }

  open() {
    this.#section.style.left = "0px"
  }
  close() {
    this.#section.style.left = null
    this.#listElement.innerHTML = ""
  }
  getCategory() {
    return this.#category
  }

  #craeteRow(text) {
    const element = document.createElement("button")
    element.addEventListener("click", () => {
      this.#category = text
      this.#selectFunction()
    })
    element.innerText = text
    return element
  }
}