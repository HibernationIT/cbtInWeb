class Problem {
  #section = document.querySelector("#problem")
  #title = document.querySelector("#problemTitle")
  #content = document.querySelector("#problemContent")
  #example = document.querySelector("#problemExample")
  #problemNext = document.querySelector("#problemNext")
  #answer = document.querySelector("#problemAnswer")

  #problems
  #pickProblem
  #answerCount
  #wrongCount
  #isNext = false
  #doneProblems = []

  constructor(problems) {
    this.#problems = problems
    const checkAnswer = () => {
      if (this.#isNext) {
        if (!this.#problems.length) {
          return
        }
        this.#problemNext.innerText = "확인"
        this.#answer.readOnly = false
        this.#answer.className = null
        this.#answer.value = ""
        this.#isNext = false
        this.#removeImage()
        this.next()
        this.#answer.focus()
      } else {
        this.check()
      }
    }

    this.#problemNext.addEventListener("click", checkAnswer)
    this.#answer.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        checkAnswer()
      }
    })
  }

  open() {
    this.#section.style.left = "0px"
  }
  close() {
    this.#section.style.left = null
  }
  next() {
    this.#title.innerText = String(this.#doneProblems.length + 1).padStart(2, "0") + "."
    this.#pickProblem = this.#problems[parseInt(Math.random() * this.#problems.length)]
    this.#problems = this.#problems.filter((p) => p !== this.#pickProblem)

    this.#content.innerText = this.#pickProblem.problem
    this.#example.innerText = this.#pickProblem.example
  }
  check() {
    this.#doneProblems.push(this.#pickProblem)

    if (
      this.#answer.value.replaceAll(" ", "") === this.#pickProblem.answer.replaceAll(" ", "")
      && this.#answer.value !== undefined && this.#answer.value !== ""
    ) {
      this.#createImage(true)
    } else {
      this.#createImage(false)
      this.#answer.value = this.#pickProblem.answer
      this.#answer.className = "wrong"
    }
    this.#problemNext.innerText = "다음"
    this.#answer.readOnly = true
    this.#isNext = true
  }

  #createImage(isAnswer) {
    let src
    if (isAnswer) src = "/static/images/answer.svg"
    else src = "/static/images/wrong.svg"

    const img = document.createElement("img")
    img.id = "problemImage"
    img.src = src
    img.alt = isAnswer ? "answer" : "wrong"

    this.#section.querySelector("div").append(img)
  }
  #removeImage() {
    document.querySelector("#problemImage").remove()
  }
}