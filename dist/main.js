var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let books = [];
const bookCase = document.querySelector('#book-case');
bookCase.addEventListener('click', (e) => {
    const clicked = e.target;
    const bookId = +clicked.dataset.bookId || +clicked.parentElement.dataset.bookId;
    if (bookId) {
        const selectedBook = findBookById(bookId);
        displaySingleBook(selectedBook);
    }
});
const search = document.querySelector('#search');
search.addEventListener('input', (event) => {
    const query = search.value.toLowerCase();
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(query));
    displayBookCase(filteredBooks);
});
search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const firstBook = document.querySelector('.book-case__book');
        const bookId = +firstBook.dataset.bookId;
        if (bookId) {
            const selectedBook = findBookById(bookId);
            displaySingleBook(selectedBook);
        }
    }
});
const starBook = document.querySelector('#wanna-read');
starBook.addEventListener('click', (event) => {
    starBook.classList.toggle('wanna-read--true');
    const bookIndex = books.findIndex((book) => book.id === +starBook.dataset.bookId);
    books[bookIndex].stared = !books[bookIndex].stared;
});
fetchBooks().then(cacheBooks).then(displayBookCase);
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            const books = yield response.json();
            return books;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function cacheBooks(downloadedBooks) {
    books = downloadedBooks;
    return books;
}
function displayBookCase(showBooks) {
    bookCase.innerHTML = '';
    showBooks.forEach((book) => {
        const h3 = document.createElement('h3');
        h3.textContent = book.title;
        h3.className = 'book-case__title';
        const h4 = document.createElement('h4');
        h4.textContent = book.author;
        h4.className = 'book-case__author';
        const div = document.createElement('div');
        div.className = 'book-case__book';
        div.style.backgroundColor = book.color;
        div.dataset.bookId = `${book.id}`;
        div.append(h3);
        div.append(h4);
        bookCase.append(div);
    });
    let unrenderdBooks = books.length - showBooks.length;
    while (unrenderdBooks) {
        const div = document.createElement('div');
        div.className = 'book-case__book';
        div.style.backgroundColor = 'none';
        div.style.boxShadow = 'none';
        div.style.cursor = 'default';
        bookCase.append(div);
        unrenderdBooks--;
    }
}
function displaySingleBook(book) {
    const singleBook = sel('#single-book');
    const closeModal = sel('#single-book__close');
    closeModal.addEventListener('click', () => singleBook.close());
    document.querySelector(':root').style.setProperty('--book-color', book.color);
    sel('#single__cover__title').innerText = book.title;
    sel('#single__cover__author').innerText = book.author;
    sel('#single__title').innerText = book.title;
    sel('#single__author').innerText = book.author;
    sel('#summary').innerText = book.plot;
    sel('#single__audience').innerText = book.audience;
    sel('#single__published').innerText = `${book.year}`;
    sel('#single__pages').innerText = `${book.pages ? book.pages : '-'}`;
    sel('#single__publisher').innerText = book.publisher;
    sel('#wanna-read').dataset.bookId = `${book.id}`;
    sel('#wanna-read').className = book.stared ? 'wanna-read--true' : '';
    singleBook.showModal();
}
function sel(query) {
    return document.querySelector(query);
}
function findBookById(id) {
    return books.find((book) => book.id === id) || {};
}
export {};
