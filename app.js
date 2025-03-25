// Define global variable to store array of books
let bookData;

// Get Book Data from API
async function getBook() {
  await fetch("https://api.freeapi.app/api/v1/public/books")
    .then((res) => res.json())
    .then((data) => {
      bookData = data.data.data;
    })
    .catch(() => {
      alert("Something went wrong in fetching data");
    });
  setBooks(bookData);
}
getBook();

// Display book data in frontend
async function setBooks(bookData) {
  const bookList = document.querySelector(".book-list");
  bookList.innerHTML = ""; // Clear previous content

  bookData.forEach((element) => {
    // Create div to display single book detail
    const bookCard = document.createElement("div");
    bookCard.className = "book";

    // Store book information in variables
    const bookTitle = element.volumeInfo.title || "No Title";
    const imagePath = element.volumeInfo.imageLinks?.thumbnail || "";
    const bookAuthor = element.volumeInfo.authors?.[0] || "Unknown Author";
    const bookPublisher = element.volumeInfo.publisher || "Unknown Publisher";
    const publishDate = element.volumeInfo.publishedDate || "No Date";
    const infoLink = element.volumeInfo.infoLink
    console.log(infoLink);
    
    bookCard.innerHTML = `
      <div class="thumbnail">
        <a href="${infoLink}" target="_blank">
          <img src="${imagePath}" alt="${bookTitle}">
        </a>
      </div>

      <a href="${infoLink}" target="_blank">
        <div class="book-info">
          <div class="book-author">
            By ${bookAuthor}
          </div>
          <div class="book-title">
            ${bookTitle}
          </div>
          <div class="publisher">
            <b>Seller:</b> ${bookPublisher}
          </div>
          <div class="published-date">
            <b>Date:</b> ${publishDate}
          </div>
        </div>
      </a>
    `;
    bookList.appendChild(bookCard);
  });

  setView();
}

// Search function to filter by title and author
const search = document.querySelector(".searchBook");
search.addEventListener("input", () => {
  searchBook();
});

function searchBook() {
  const input = search.value.toLowerCase();
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

// Sort books by title or date
const sortTitleBtn = document.getElementById("sortTitle");
const sortDateBtn = document.getElementById("sortDate");

sortTitleBtn.addEventListener("click", () => {
  sortBooks();
});

sortDateBtn.addEventListener("click", () => {
  sortBookByDate();
});

//sort with book title
function sortBooks() {
  bookData.sort((a, b) => {
    const titleA = a.volumeInfo.title.toLowerCase();
    const titleB = b.volumeInfo.title.toLowerCase();
    return titleA.localeCompare(titleB);//it's compare two strings 
  });
  setBooks(bookData);
}

//sort with book published date
function sortBookByDate() {
  bookData.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate );
    const dateB = new Date(b.volumeInfo.publishedDate );
    return dateA - dateB;
  });
  setBooks(bookData);
}


function sortBookByDate() {
  bookData.sort((a, b) => {
    const dateA = new Date(a.volumeInfo.publishedDate || "1970-01-01");
    const dateB = new Date(b.volumeInfo.publishedDate || "1970-01-01");
    return dateA - dateB;
  });
  setBooks(bookData);
}

// Keep setView() as it is
function setView() {
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
    } else {
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
