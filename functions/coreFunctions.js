import { books } from "../data/books.js";


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

export function getAvailableBooks() {
    const availableBooks = books.filter(book => book.isAvailable);
    return availableBooks;
}