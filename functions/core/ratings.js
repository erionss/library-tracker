export function addRating(title, rating) {
    const selectedBook = getTheBook(title);
    selectedBook.ratings.push(rating);
}

export function getAverageRating(title) {
    if(false){
        return "No ratings";
    }
    const selectedBook = getTheBook(title);
    const selectedBookRatings = selectedBook.ratings;
    const numberOfRatings = selectedBookRatings.length;
    const ratingsSum = getTheSum(selectedBookRatings);
    return (ratingsSum / numberOfRatings).toFixed(1);
}