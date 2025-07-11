import { books } from "../data/books.js";
import { addBook, addRating, getAvailableBooks, getAverageRating, removeBook, toggleAvailability } from "./coreFunctions.js";

const filterBtn = document.getElementById('filter-available');
const showAllBtn = document.getElementById('show-all');

const form = document.getElementById('add-book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    alert('Please fill in both title and author.');
    return;
  }

  if (books.some(book => book.title.toLowerCase() === title.toLowerCase())) {
    alert('This book title already exists.');
    return;
  }

  addBook({
    title,
    author,
    isAvailable: true,
    ratings: []
  });

  titleInput.value = '';
  authorInput.value = '';

  renderBooks();
});

export function renderBooks(list = books) {
  const bookListContainer = document.getElementById("book-list");

  bookListContainer.innerHTML = '';

  list.forEach(book => {
    const avgRating = getAverageRating(book.title);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.classList.add(book.isAvailable ? 'available' : 'unavailable');

    bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Ratings:</strong> ${book.ratings.join(', ') || 'No ratings yet'}</p>
            <p><strong>Average Rating:</strong> ${avgRating}</p>
            <button class="toggle-availability" data-title="${book.title}">Toggle Availability</button>
            <button class="add-rating" data-title="${book.title}">Add Rating</button>
            <button class="remove-book" data-title="${book.title}">Remove Book</button>
        `;

    bookListContainer.appendChild(bookCard);
  })
}

function addEvents() {
  const bookListContainer = document.getElementById("book-list");
  bookListContainer.addEventListener('click', event => {
    const target = event.target;
    const title = target.dataset.title;
    if (!title) return;

    if (target.classList.contains('toggle-availability')) {
      toggleAvailability(title);
      renderBooks();
    } else if (target.classList.contains('add-rating')) {
      const ratingStr = prompt('Enter rating 1-5:');
      const rating = Number(ratingStr);
      if (rating >= 1 && rating <= 5 && Number.isInteger(rating)) {
        addRating(title, rating);
        renderBooks();
      } else {
        alert('Invalid rating');
      }
    } else if (target.classList.contains('remove-book')) {
      if (confirm(`Remove "${title}"?`)) {
        removeBook(title);
        renderBooks();
      }
    }
  });
}

addEvents();

filterBtn.addEventListener('click', () => {
  const availableBooks = getAvailableBooks(books)
  renderBooks(availableBooks);
});

showAllBtn.addEventListener('click', () => {
  renderBooks(books);
});
