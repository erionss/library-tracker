import { books } from "../data/books.js";

export function getTheBook(title) {
    return books.find(book => book.title === title);
}

function getTheSum(ratings) {
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i];
    }
    return sum;
}

export function addBook(book) {
    books.push(book);
};

export const removeBook = (title) => {
    const index = books.findIndex(book => book.title === title);
    if (index !== -1) {
        books.splice(index, 1); 
    }
};

export function toggleAvailability(title) {
    const selectedBook = getTheBook(title);
    selectedBook.isAvailable = !selectedBook.isAvailable;
}

export function addRating(title, rating) {
    const selectedBook = getTheBook(title);
    selectedBook.ratings.push(rating);
}

export function getAverageRating(title) {
    const selectedBook = getTheBook(title);
    const selectedBookRatings = selectedBook.ratings;
    const numberOfRatings = selectedBookRatings.length;
    const ratingsSum = getTheSum(selectedBookRatings);
    return ratingsSum / numberOfRatings;
}

export function getAvailableBooks() {
    const availableBooks = books.filter(book => book.isAvailable);
    return availableBooks;
}