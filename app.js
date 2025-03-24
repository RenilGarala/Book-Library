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
      <div class="book-info">
        <div class="book-author">
          By ${bookAuthor}
        </div>
        <div class="book-title">
          ${bookTitle}
        </div>
        <div class="publisher">
          <b>Saler :</b> ${bookPublisher}
        </div>
        <div class="published-date">
          <b>Date :</b> ${publishDate}
        </div>
      </div>
    `;
    bookList.appendChild(bookCard);
  });

  setView();
}

//call search funtion on every chnage inpute value
const search = document.querySelector(".searchBook");
search.addEventListener("input", () => {
  searchBook();
});

//search funtion it's campare with title and author both
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

function setView() {
  //Toggle btn for grid view and list view
  const toggleBtn = document.getElementById("toggleBtn");
  const bookContainer = document.querySelector(".book-list");
  const bookList = document.querySelectorAll(".book");
  let isGridView = false;

  toggleBtn.addEventListener("click", () => {
    isGridView = !isGridView;

    if (isGridView) {
      toggleBtn.innerText = "Grid View";
      bookList.forEach((book) => {
        book.style.flexDirection = "initial"; 
        bookContainer.style.display = "flex";
        bookContainer.style.flexDirection = "column"; 
        book.style.width = "700px";
        bookContainer.style.alignItems = "center";
      });
    }
    else{
      toggleBtn.innerText = "List View";
      bookList.forEach((book) => {
        book.style.flexDirection = "column"; 
        bookContainer.style.display = "grid";
        bookContainer.style.flexDirection = "row";
        book.style.width = "100%"; 
        bookContainer.style.alignItems = "normal"; 
      });
    }
  });
}

//toggle between list view and grid is crazy.