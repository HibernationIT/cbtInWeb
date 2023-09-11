class Problem {
  #section = document.querySelector("#problem")
  #title = document.querySelector("#problemTitle")
  #content = document.querySelector("#problemContent")
  #example = document.querySelector("#problemExample")
  #problemNext = document.querySelector("#problemNext")
  #help = document.querySelector("#problemHelp")
  #answer = document.querySelector("#problemAnswer")

  #problems
  #problemCount

  #pickProblem
  #answerCount = 0
  #wrongCount = 0
  #isNext = false
  #doneProblems = []

  constructor(problems, problemCount, fisishFunction) {
    this.#problems = problems
    this.#problemCount = problemCount
    const checkAnswer = () => {
      if (this.#isNext) {
        this.#problemNext.innerText = "확인"
        this.#answer.readOnly = false
        this.#answer.className = null
        this.#answer.value = ""
        this.#isNext = false
        this.#removeImage()
        if (!this.#problems.length || this.#doneProblems.length === parseInt(this.#problemCount)) {
          fisishFunction()
          return
        }
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
  getAnswerCount() {
    return this.#answerCount
  }
  getWrongCount() {
    return this.#wrongCount
  }
  next() {
    this.#title.innerText = String(this.#doneProblems.length + 1).padStart(2, "0") + "."
    this.#pickProblem = this.#problems[parseInt(Math.random() * this.#problems.length)]
    this.#problems = this.#problems.filter((p) => p !== this.#pickProblem)

    this.#content.innerText = this.#pickProblem.problem
    this.#example.innerHTML = this.#pickProblem.example.replaceAll("\\n", "<br />")
    switch (this.#pickProblem.type) {
      case "1": this.#help.innerText = "영문 o 또는 x 를 입력해주세요."; break
      case "2": this.#help.innerText = "단어를 입력하세요."; break
      case "3": this.#help.innerText = "','를 사용하여 단어를 분리하여 입력해주세요."; break
      case "4": this.#help.innerText = "','를 사용하여 단어를 분리하여 입력해주세요."; break
    }
  }
  check() {
    this.#doneProblems.push(this.#pickProblem)
    let isAnswer
    if (this.#answer.value === undefined || this.#answer.value === "") isAnswer = false
    else if (this.#pickProblem.type === "3") {
      let answerCount = 0
      const answers = this.#pickProblem.answer.replaceAll(" ", "").split(",")
      this.#answer.value.replaceAll(" ", "").split(",").forEach((text) => {
        if (!answers.includes(text)) answerCount++
      })
      isAnswer = answerCount === this.#pickProblem.answer.split(",").length
    } else {
      isAnswer = this.#answer.value.replaceAll(" ", "") === this.#pickProblem.answer.replaceAll(" ", "")
        || this.#answer.value.toUpperCase() === this.#pickProblem.answer.toUpperCase()
    }

    if (isAnswer) {
      this.#createImage(true)
      this.#answerCount++
    } else {
      this.#createImage(false)
      this.#answer.value = this.#pickProblem.answer
      this.#answer.className = "wrong"
      this.#wrongCount++
    }
    this.#problemNext.innerText = "다음"
    this.#answer.readOnly = true
    this.#isNext = true
  }

  #createImage(isAnswer) {
    let src
    if (isAnswer) src = "static/images/answer.svg"
    else src = "static/images/wrong.svg"

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