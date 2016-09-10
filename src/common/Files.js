import Config from '../Config.js'

const generateUUID = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const loadBook = function() {
  return JSON.parse(localStorage.getItem(Config.STORAGE_KEY)) || []
}

const saveBook = function (book) {
  localStorage.setItem(Config.STORAGE_KEY, [JSON.stringify(book)])
}

export default {
  create() {
    return {
      file: {
        title: 'New File',
        id: generateUUID(),
        content: ''
      }
    }
  },

  save(file) {
    let book = loadBook()
    let currentId = file.id
    let found = book.findIndex(function (item) {
      return currentId === item.file.id
    })
    if (found >= 0) {
      book[found] = { file: file }
    } else {
      book.push({ file: file })
    }
    saveBook(book)
  },

  load(id) {
    let book = loadBook()
    return book.find(function (item) {
      return item.file.id === id
    })
  },

  deleteFile(id) {
    let book = loadBook()
    book = book.filter(function(item) {
      return item.file.id !== id
    })
    saveBook(book)
  },

  openFirst() {
    let book = loadBook()
    if (book && book.length > 0) {
      return book[0]
    } else {
      return this.create()
    }
  }
}