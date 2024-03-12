OMDB_API_KEY = '28c53fba';
const OMDB_API_URL = 'http://www.omdbapi.com/';
const btnSubmitReview = document.getElementById('btnSubmitReview');
const movieTitleInput = document.getElementById('movieTitle');
const userReviewInput = document.getElementById('userReview');
const userRatingInput = document.getElementById('userRating');
const reviewContainer = document.getElementById('reviewContainer');
const suggestionsContainer = document.getElementById('suggestions');
let reviews = [];

// Function to fetch movie details by title from OMDB API
function fetchMovieDetails(title) {
    return fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching movie details:', error);
            return null;
        });
}

// Event listener for input field to display movie title suggestions
movieTitleInput.addEventListener('input', function() {
    const searchQuery = movieTitleInput.value;
    if (searchQuery.length > 2) {
        fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    const suggestions = data.Search.map(movie => movie.Title);
                    displaySuggestions(suggestions);
                } else {
                    hideSuggestions();
                }
            })
            .catch(error => console.error('Error fetching movie suggestions:', error));
    } else {
        hideSuggestions();
    }
});

// Function to display movie title suggestions
function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(title => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = title;
        suggestionElement.addEventListener('click', function() {
            movieTitleInput.value = title;
            hideSuggestions();
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
    suggestionsContainer.style.display = 'block';
}

// Function to hide movie title suggestions
function hideSuggestions() {
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
}

// Event listener for submit button to add a new review
btnSubmitReview.addEventListener('click', async function() {
    const movieTitle = movieTitleInput.value;
    const userReview = userReviewInput.value;
    const userRating = userRatingInput.value;
    const movieDetails = await fetchMovieDetails(movieTitle);
    if (movieDetails) {
        const { Title, Poster } = movieDetails;
        const review = { Title, Review: userReview, Rating: userRating, Poster };
        reviews.push(review);
        displayReviews();
        saveReviewsToFile();
    } else {
        console.log('Movie not found.');
    }
});

// Define the button element
const btnLoadReviews = document.createElement('button');
btnLoadReviews.textContent = 'Load Reviews';
btnLoadReviews.id = 'btnLoadReviews';
btnLoadReviews.classList.add('btn-default');
// Append the button to the wrapper div
document.querySelector('.wrapper').appendChild(btnLoadReviews);

// Event listener for the load reviews button
btnLoadReviews.addEventListener('click', function() {
    loadReviewsFromFile();
    btnLoadReviews.style.display = 'none'; // Hide the button after it's clicked
});

// Function to load existing reviews from localStorage
function loadReviewsFromFile() {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
        displayReviews();
    } else {
        console.log('No reviews found.');
    }
}

// Function to display reviews
function displayReviews() {
    reviewContainer.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <img src="${review.Poster}" alt="${review.Title} Poster" />
            <div class="details">
                <p class="title"><strong></strong> ${review.Title}</p>
                <p><strong>Your Review:</strong> ${review.Review}</p>
                <p><strong>Rating:</strong> ${review.Rating}</p>
                <button class="delete-btn" onclick="deleteReview(${index})">Delete</button>
                <button class="update-btn" onclick="displayUpdateForm(${index})">Update</button>
            </div>
        `;
        reviewContainer.appendChild(reviewElement);
    });
}

// Function to display update form
function displayUpdateForm(index) {
    const reviewToUpdate = reviews[index];
    const updateForm = document.createElement('div');
    updateForm.classList.add('update-form');
    // Add update-form class
    updateForm.innerHTML = `
        <img src="${reviewToUpdate.Poster}" alt="${reviewToUpdate.Title} Poster" />
        <div class="details-review">
            <label for="updatedReview">Update Review:</label>
            <input type="text" id="updatedReview" value="${reviewToUpdate.Review}">
            <label for="updatedRating">Update Rating:</label>
            <input type="text" id="updatedRating" value="${reviewToUpdate.Rating}">
            <button onclick="updateReview(${index})">Submit Update</button>
        </div>
    `;
    reviewContainer.replaceChild(updateForm, reviewContainer.children[index]);
}

// Function to update a review
function updateReview(index) {
    const updatedReview = document.getElementById('updatedReview').value;
    const updatedRating = document.getElementById('updatedRating').value;
    // Validate updatedRating to ensure it's a valid decimal between 0.0 and 10.0
    if (isValidRating(updatedRating)) {
        reviews[index].Review = updatedReview;
        reviews[index].Rating = updatedRating;
        displayReviews();
        saveReviewsToFile();
    } else {
        console.log('Invalid input. Please enter a valid review and rating.');
    }
}

// Function to validate rating input
function isValidRating(rating) {
    const parsedRating = parseFloat(rating);
    return !isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 10;
}

// Function to delete a review
function deleteReview(index) {
    const confirmation = window.confirm("Are you sure you want to delete this review?");
    if (confirmation) {
        reviews.splice(index, 1);
        displayReviews();
        saveReviewsToFile();
    }
}

// Function to save reviews to localStorage
function saveReviewsToFile() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Call loadReviewsFromFile to load reviews when the page loads
window.addEventListener('load', function() {
    loadReviewsFromFile(); // Load reviews when the page loads
    reviewContainer.innerHTML = ''; // Clear review container initially
});
