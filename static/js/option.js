class Option {
  #section = document.querySelector("#option")
  #backButton = document.querySelector("#optionBack")

  #main
  #sub
  #problems = []
  #problemsCount
  #selectProblemCount

  constructor(main, sub) {
    this.#backButton.addEventListener("click", () => this.close())
    this.#main = main
    this.#sub = sub
  }

  async loadData() {
    await fetch("/static/data/" + this.#main + "/" + this.#sub + ".csv")
      .then((res) => res.text())
      .then((text) => {
        const problems = text.split("\n")
        this.#problemsCount = problems.length

        problems.forEach((problem) => {
          const values = problem.split(",")
          this.#problems.push({
            problem: values[0],
            example: values[1],
            answer: values[2],
            type: values[3]
          })
        })
      })
  }
  open() {
    this.#section.style.left = "0px"
  }
  close() {
    this.#section.style.left = null
    this.#problems = []
    this.#problemsCount = undefined
  }
  getProblems() {
    return this.#problems
  }
  getProblemsCount() {
    return this.#problemsCount
  }
  setSelectProblemsCount(selectProblemCount) {
    this.#selectProblemCount = selectProblemCount
  }
  getSelectProblemsCount() {
    return this.#selectProblemCount
  }
}