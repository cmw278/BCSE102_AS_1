class View { // eslint-disable-line no-unused-vars
  static makeTable (array) {
    let table = document.createElement(`table`)
    for (let x of array) {
      let rowElem = document.createElement(`tr`)
      rowElem.setAttribute(`class`, `row-${array.indexOf(x)}`) // tag row numbers
      for (let y of x) {
        let colElem = document.createElement(`td`)
        colElem.setAttribute(`class`, `column-${x.indexOf(y)}`) // tag column numbers
        if (!y && y !== 0) {
          colElem.setAttribute(`class`, `empty column-${x.indexOf(y)}`) // tag empty cells
        }
        colElem.innerHTML = y
        rowElem.appendChild(colElem)
      }
      table.appendChild(rowElem)
    }
    return table
  }
  static makeList (array, type = `ul`) {
    let list = document.createElement(type)
    for (let listItem of array) {
      if (!listItem) {
        break // If slot is empty do not add to output
      }
      let li = document.createElement(`li`)
      li.innerHTML = listItem
      list.appendChild(li)
    }
    return list
  }
}
