let mainCategorys
let subCategorys
let problems = []

let selectMainCategory
let selectSubCategory

window.onload = getMainCategorys

// Main Catergory
document.querySelector("#main").addEventListener("click", setSelectMainCategory)
async function setSelectMainCategory() {
  const mainCategory = document.querySelector("#mainCategorys")
  mainCategorys.forEach((text) => {
    mainCategory.append(createMainCategory(text))
  })

  const list = document.querySelector("#mainCategory")
  list.style.opacity = "100%"
  list.style.left = "0px"
}
function getMainCategorys() {
  fetch("/static/data/교과.csv")
    .then((res) => res.text())
    .then((text) => mainCategorys = text.split("\n"))
}
function createMainCategory(text) {
  const row = document.createElement("button")
  row.innerText = text
  row.addEventListener("click", () => {
    selectMainCategory = text
    setSelectSubCategory()
  })
  return row
}

// Sub Categorys
async function setSelectSubCategory() {
  const subCategory = document.querySelector("#subCategorys")

  await getSubCategorys(selectMainCategory).then((categorys) => {
    categorys.forEach((value) => {
      subCategory.append(createSubCategory(value))
    })
  })

  const list = document.querySelector("#subCategory")
  list.style.left = "0px";
}
async function getSubCategorys(category) {
  return await fetch("/static/data/"+category+"/과목.csv")
    .then((res) => res.text())
    .then((text) => subCategorys = text.split("\n"))
}
function createSubCategory(text) {
  const row = document.createElement("button")
  row.innerText = text
  row.addEventListener("click", () => {
    selectSubCategory = text
  })
  return row
}

// Problems
async function getProblems() {
  return await fetch("/static/data/"+selectMainCategory+"/"+selectSubCategory+".csv")
    .then((res) => res.text())
    .then((text) => {
      const cols = text.split("\n")
      cols.split(",")
      problems.push({
        problem: cols[0],
        example: cols[1],
        answer: cols[2],
        type: cols[3]
      })
    })
}