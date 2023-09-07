class Sub {
  #section = document.querySelector("#sub")
  #listElement = document.querySelector("#subList")
  #backButton = document.querySelector("#subBack")

  #list
  #main
  #selectFunction
  #category;

  constructor(main, selectFunction) {
    this.#backButton.addEventListener("click", () => this.close())
    this.#main = main
    this.#selectFunction = selectFunction
  }

  async loadData() {
    await fetch("static/data/"+this.#main+"/과목.csv")
      .then((res) => res.text())
      .then((text) => this.#list = text.split("\n"))
  }
  createRow() {
    this.#list.forEach((text) => {
      this.#listElement.append(this.#craeteRow(text))
    })
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