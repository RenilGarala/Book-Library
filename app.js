// define Globel variable which store array of books
let bookData;

//get Book Data from API
async function getBook() {
  //fetch function return promises
  //take time so i write "await"
  await fetch("https://api.freeapi.app/api/v1/public/books")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      bookData = data.data.data;
    })
    .catch(() => {
      alert("Something Wants wrong in Fetching Data");
    });
  setBooks(bookData);
}
getBook();

//desplay book data in frontend
async function setBooks(boookData) {
  const bookList = document.querySelector(".book-list");

  bookData.forEach((element) => {
    //create div to display single book detail
    const bookCard = document.createElement("div");
    bookCard.className = "book";

    //Store book information in variable
    const bookTitle = element.volumeInfo.title;
    const imagePath = element.volumeInfo.imageLinks.thumbnail;
    const bookAuthor = element.volumeInfo.authors[0];
    const bookPublisher = element.volumeInfo.publisher;
    const publishDate = element.volumeInfo.publishedDate;
    

    bookCard.innerHTML = `
      <div class="thumbnail">
        <img src="${imagePath}">
      </div>
      <div class="book-title">
        ${bookTitle}
      </div>
      <div class="book-author">
        ${bookAuthor}
      </div>
      <div class="publish-info">
        <div class="publisher">
          ${bookPublisher}
        </div>
        <div class="published-date">
          ${publishDate}
        </div>
      </div>
    `;
    bookList.appendChild(bookCard);
  });
}

//call search funtion on every chnage inpute value
const search = document.querySelector('.searchBook');
search.addEventListener("input", ()=>{
  searchBook();
})

function searchBook() {
  const input = document.querySelector(".searchBook").value.toLowerCase();
  const bookList = document.querySelectorAll(".book");

  bookList.forEach((book) => {
  
    const title = book.querySelector(".book-title").textContent.toLowerCase();
    const author = book.querySelector(".book-author").textContent.toLowerCase();

    if (title.includes(input) || author.includes(input)) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}
