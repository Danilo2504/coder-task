class Book {
  constructor(title, author, editorial, genre = [], stock, isBorrowed = false) {
    this.title = title;
    this.author = author;
    this.editorial = editorial;
    this.genre = genre;
    this.isBorrowed = isBorrowed;
    this.stock = stock;
  }
}

class BorrowedBook {
  constructor(book, loanStartDate = null, loanEndDate = null) {
    this.book = book;
    this.loanStartDate = loanStartDate;
    this.loanEndDate = loanEndDate;
  }
}

class Library {
  constructor() {
    this.bookList = [];
  }
}

const library = new Library();

const foo1 = new Book(
  "El nombre de las rosas",
  "Umberto Eco",
  "Della Republicca",
  ["Misterio", "Histórico"],
  5
);
const foo2 = new Book(
  "Código Da Vinci",
  "Dan Brown",
  "Engima",
  ["Novela", "Misterio", "Thriller", "Policial", "Ficción conspirativa"],
  10
);
const foo3 = new Book(
  "El hombre ilustrado",
  "Ray Bradbury",
  "minotauro",
  ["Cuento", "Ciencia ficción", "Literatura fantástica"],
  7
);
const foo4 = new Book(
  "Cien años de soledad",
  "Gabriel García Márquez",
  "Sudamericana",
  ["Novela", "Realismo mágico", "Ficción épica"],
  2
);

library.bookList.push(foo1, foo2, foo3, foo4);

window.onload = function () {
  const storedBooks = localStorage.getItem("rented-books");
  if (storedBooks) {
    const storedBookList = JSON.parse(storedBooks);
    if (storedBookList.length) {
      storedBookList.map((item) => cardBorrowedBook(item));

      const booksNotBorrowed = library.bookList.filter((item) =>
        storedBookList.every(({ book }) => book.title !== item.title)
      );

      storedBookList.map(({ book }) => booksNotBorrowed.push(book));

      library.bookList = booksNotBorrowed;
    } else {
      const borrowedBooksContainer = document.getElementById(
        "borrowed-books-container"
      );
      borrowedBooksContainer.innerHTML = "<p>No tienes libros prestados</p>";
    }
  } else {
    localStorage.setItem("rented-books", JSON.stringify([]));
    borrowedBooksContainer.innerHTML = "<p>No tienes libros prestados</p>";
  }
};

function searchBook(keyWord, filter) {
  const matches = library.bookList.filter((item) =>
    item[filter.toLowerCase()].toLowerCase().startsWith(keyWord.toLowerCase())
  );
  return matches;
}

function borrowBook(book) {
  const startDate = new Date();
  let formattedEndDate = new Date();
  formattedEndDate.setDate(formattedEndDate.getDate() + 30);

  book.stock--;
  book.isBorrowed = true;

  const borrowedBook = new BorrowedBook(book, startDate, formattedEndDate);

  const storedBooks = JSON.parse(localStorage.getItem("rented-books"));

  storedBooks.push(borrowedBook);
  localStorage.setItem("rented-books", JSON.stringify(storedBooks));

  borrowedBooksContainer.innerHTML = "";
  booksContainer.innerHTML = "";
  titleSection.textContent = "";
  storedBooks.map((item) => cardBorrowedBook(item));
}

function returnBook(title) {
  const storedBooks = JSON.parse(localStorage.getItem("rented-books"));
  const newList = storedBooks.filter((item) => item.book.title !== title);

  localStorage.setItem("rented-books", JSON.stringify(newList));

  library.bookList.map((item) => {
    if (item.title === title) {
      item.stock++;
      item.isBorrowed = false;
    }
    return item;
  });

  borrowedBooksContainer.innerHTML = "";
  booksContainer.innerHTML = "";
  titleSection.textContent = "";

  if (newList.length) {
    newList.map((item) => cardBorrowedBook(item));
  } else {
    borrowedBooksContainer.innerHTML = "<p>No tienes libros prestados</p>";
  }
}

const storedBooks = JSON.parse(localStorage.getItem("rented-books"));

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchFilter = document.getElementById("search-filter");
const titleSection = document.getElementById("title-section");
const booksContainer = document.getElementById("books-container");
const borrowedBooksContainer = document.getElementById(
  "borrowed-books-container"
);

function cardBook(book) {
  const bookCard = document.getElementById("book-template");
  const newCard = bookCard.content.cloneNode(true);

  newCard.querySelector(
    ".title-author"
  ).textContent = `${book.title} - ${book.author}`;
  const genreFormatted = book.genre.join(", ").trimEnd();
  newCard.querySelector(
    ".genre-list"
  ).textContent = `Generos: ${genreFormatted}`;
  newCard.querySelector(".stock-text").textContent = `Stock: ${book.stock}`;
  const borrowButton = newCard.querySelector(".borrow-button");

  if (book.isBorrowed) {
    borrowButton.disabled = true;
    const disabledText = newCard.querySelector(".disabled-text");

    disabledText.textContent =
      "No podras pedir libros hasta devolver el prestado";
  }

  book.stock === 0 && (borrowButton.disabled = true);

  borrowButton.addEventListener("click", (event) => {
    event.preventDefault();
    borrowBook(book);
  });

  booksContainer.appendChild(newCard);
}

function cardBorrowedBook(borrowedBook) {
  const borrowedBookCard = document.getElementById("borrowed-book-template");
  const newCard = borrowedBookCard.content.cloneNode(true);

  newCard.querySelector(
    ".title-author"
  ).textContent = `${borrowedBook.book.title} - ${borrowedBook.book.author}`;

  const genreFormatted = borrowedBook.book.genre.join(", ").trimEnd();
  newCard.querySelector(
    ".genre-list"
  ).textContent = `Generos: ${genreFormatted}`;

  const currentDate = new Date();
  const loanEndDate = new Date(borrowedBook.loanEndDate);
  const period = loanEndDate - currentDate;
  const aux = 1000 * 60 * 60 * 24;
  const loanPeriod = Math.round(period / aux);

  if (Number(loanPeriod) <= 0) {
    newCard.querySelector(
      ".date-range"
    ).textContent = `Plazo a devolver: 0 dias`;
    library.bookList.map((item) => (item.isBorrowed = true));
  } else {
    newCard.querySelector(".date-range").textContent = `Plazo a devolver: ${
      loanPeriod === 1 ? loanPeriod + " dia" : loanPeriod + " dias"
    }`;
  }

  const returnButton = newCard.querySelector(".return-button");

  returnButton.addEventListener("click", (event) => {
    event.preventDefault();
    returnBook(borrowedBook.book.title);
  });

  borrowedBooksContainer.appendChild(newCard);
}

searchFilter.addEventListener("change", () => {
  titleSection.textContent = "";
  booksContainer.innerHTML = "";
});

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const data = searchBook(searchInput.value, searchFilter.value);
  titleSection.textContent = "Resultados";
  if (data.length) {
    booksContainer.innerHTML = "";
    data.map((item) => cardBook(item));
  } else {
    booksContainer.innerHTML = `no se encontraron resultados para: '${searchInput.value}'`;
  }
});
