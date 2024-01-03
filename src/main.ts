import { Book } from './interfaces/book'

let books: Book[] = []

/*
 * EVENT LISTENERS
 */

const bookCase = document.querySelector<HTMLDivElement>('#book-case')
bookCase.addEventListener('click', (e) => {
  const clicked = e.target as HTMLElement
  const bookId = +clicked.dataset.bookId || +clicked.parentElement.dataset.bookId
  if (bookId) {
    const selectedBook = findBookById(bookId)
    displaySingleBook(selectedBook)
  }
})

const search = document.querySelector<HTMLInputElement>('#search')
search.addEventListener('input', (event) => {
  const query = search.value.toLowerCase()
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(query))
  displayBookCase(filteredBooks)
})

search.addEventListener('keydown', (event) => {
  // Search for the first book in bookcase when we press enter
  if (event.key === 'Enter') {
    event.preventDefault()
    const firstBook = document.querySelector<HTMLDivElement>('.book-case__book')
    const bookId = +firstBook.dataset.bookId
    if (bookId) {
      const selectedBook = findBookById(bookId)
      displaySingleBook(selectedBook)
    }
  }
})

const starBook = document.querySelector<HTMLButtonElement>('#wanna-read')
starBook.addEventListener('click', (event) => {
  starBook.classList.toggle('wanna-read--true')
  const bookIndex = books.findIndex((book) => book.id === +starBook.dataset.bookId)
  books[bookIndex].stared = !books[bookIndex].stared
})

/*
 * RUN
 */

fetchBooks().then(cacheBooks).then(displayBookCase)

/*
 * GET BOOK-LIST
 */

async function fetchBooks() {
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'
    )
    const books: Book[] = await response.json()
    return books
  } catch (error) {
    console.error(error)
  }
}

function cacheBooks(downloadedBooks: Book[]) {
  books = downloadedBooks
  return books
}

/*
 * DISPLAY LIST OF BOOKS
 */

function displayBookCase(showBooks: Book[]) {
  bookCase.innerHTML = ''
  showBooks.forEach((book) => {
    const h3 = document.createElement('h3')
    h3.textContent = book.title
    h3.className = 'book-case__title'

    const h4 = document.createElement('h4')
    h4.textContent = book.author
    h4.className = 'book-case__author'

    const div = document.createElement('div')
    div.className = 'book-case__book'
    div.style.backgroundColor = book.color
    div.dataset.bookId = `${book.id}`
    div.append(h3)
    div.append(h4)

    bookCase.append(div)
  })

  let unrenderdBooks: number = books.length - showBooks.length

  while (unrenderdBooks) {
    const div = document.createElement('div')
    div.className = 'book-case__book'
    div.style.backgroundColor = 'none'
    div.style.boxShadow = 'none'
    div.style.cursor = 'default'

    bookCase.append(div)
    unrenderdBooks--
  }
}

/*
 * DISPLAY SINGLE BOOK
 */

function displaySingleBook(book: Book) {
  const singleBook = sel<HTMLDialogElement>('#single-book')
  const closeModal = sel<HTMLButtonElement>('#single-book__close')
  closeModal.addEventListener('click', () => singleBook.close())

  document.querySelector<HTMLElement>(':root').style.setProperty('--book-color', book.color)

  // sel<HTMLDivElement>('#single__cover').style.backgroundColor = book.color
  // sel<HTMLDivElement>('#single__cover').style.setProperty('--book-color', book.color)

  sel<HTMLHeadingElement>('#single__cover__title').innerText = book.title
  sel<HTMLHeadingElement>('#single__cover__author').innerText = book.author

  sel<HTMLHeadingElement>('#single__title').innerText = book.title
  sel<HTMLHeadingElement>('#single__author').innerText = book.author
  sel<HTMLParagraphElement>('#summary').innerText = book.plot

  sel<HTMLSpanElement>('#single__audience').innerText = book.audience
  sel<HTMLSpanElement>('#single__published').innerText = `${book.year}`
  sel<HTMLSpanElement>('#single__pages').innerText = `${book.pages ? book.pages : '-'}`
  sel<HTMLSpanElement>('#single__publisher').innerText = book.publisher

  sel<HTMLButtonElement>('#wanna-read').dataset.bookId = `${book.id}`
  sel<HTMLButtonElement>('#wanna-read').className = book.stared ? 'wanna-read--true' : ''

  singleBook.showModal()
}

/*
 * HELPER FUNCTIONS
 */

function sel<T>(query: string): T {
  return document.querySelector(query) as T
}

function findBookById(id: number): Book {
  return books.find((book) => book.id === id) || ({} as Book)
}
