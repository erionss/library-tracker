export function getTheBook(title) {
    return books.find(book => book.title === title);
}
