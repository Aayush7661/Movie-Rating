Movie Rating App - API Documentation

This document provides step-by-step details about the APIs and middleware used in the Movie Rating App.

APIs List

1. Authentication APIs
1.1 Signup:
  - Method: POST
  - URL: /api/users/signup
  - Description: Create a new user.
  - Request Body: { username, password, email, mobile, age }
  - Response: { message, user, token }

1.2 Login:
  - Method: POST
  - URL: /api/users/login
  - Description: Admin and user use this api for Log purpose and get a JWT token in response.
  - Request Body: { email, password }
  - Response: { message, user, token }

2. Movie APIs
2.1 Get All Movies:
  - Method: GET
  - URL: /api/movies
  - Description: Fetch all movies.
  - Response: [ { id, title, description, releaseYear, imageUrl } ]

2.2 Get Movie Details:
  - Method: GET
  - URL: /api/movies/:id
  - Description: Fetch details of a specific movie.
  - Response: { id, title, description, releaseYear, imageUrl, reviews }

3. Review APIs
3.1 Add a Review:
  - Method: POST
  - URL: /api/reviews
  - Description: Add a review for a movie.
  - Request Body: { movieId, rating, comment }
  - Response: { id, rating, comment, MovieId, UserId }

3.2 Edit a Review:
  - Method: PUT
  - URL: /api/reviews/:id
  - Description: Edit a review.
  - Request Body: { rating, comment }
  - Response: { id, rating, comment, MovieId, UserId }

3.3 Delete a Review:
  - Method: DELETE
  - URL: /api/reviews/:id
  - Description: Delete a review.
  - Response: { message }

3.4 Like a Review:
  - Method: POST
  - URL: /api/reviews/:id/like
  - Description: Like a review.
  - Response: { id, rating, comment, likes, MovieId, UserId }

3.5 Get Sorted Reviews:
  - Method: GET
  - URL: /api/reviews/movie/:movieId?sortBy=popular
  - Description: Fetch reviews sorted by popularity or most recent.
  - Query Parameters: sortBy (popular or recent)
  - Response: [ { id, rating, comment, likes, User } ]

4. Admin APIs
4.1 Add a Movie:
  - Method: POST
  - URL: /api/admin/movies
  - Description: Add a new movie (admin only).
  - Request Body: { title, description, releaseYear, image (file upload) }
  - Response: { message, movie }

4.2 Update a Movie:
  - Method: PUT
  - URL: /api/admin/movies/:id
  - Description: Update a movie (admin only).
  - Request Body: { title, description, releaseYear, image (file upload) }
  - Response: { message, movie }

4.3 Delete a Movie:
  - Method: DELETE
  - URL: /api/admin/movies/:id
  - Description: Delete a movie (admin only).
  - Response: { message }

5. User APIs
5.1 Get User Profile:
  - Method: GET
  - URL: /api/users/profile
  - Description: Fetch the logged-in user's profile.
  - Response: { user }

 Middleware Used

1. Joi Validation
- Used to validate request data (e.g., signup, login, movie creation).
- Ensures that the data meets specific criteria (e.g., email format, password length).

2. JWT Authentication
- Used to authenticate users and protect routes.
- A token is generated during login and must be included in the `Authorization` header for protected routes.

3. Role-Based Authentication
- Ensures that only admin users can access certain routes (e.g., add, update, delete movies).
- The user's role is checked using middleware (`isAdmin`).

4. Multer
- Used to handle file uploads (e.g., movie images).
- Saves only the image's last name in the database (e.g., `image.jpg`).
- The full image URL is constructed using the `MOVIE_IMAGES_BASE_URL` environment variable.

---

How to Use

1. Signup: Create a new user.
2. Login: Log in and get a JWT token.
3. Movies: Fetch all movies or details of a specific movie.
4. Reviews: Add, edit, delete, or like reviews.
5. Admin: Add, update, or delete movies (admin only).
6. User: Fetch, update, or delete the logged-in user's profile.

---
Notes

- All protected routes require a valid JWT token in the `Authorization` header.
- Admin routes require the user to have the `admin` role.
- Images are stored in the `uploads/movieImages` folder, and only the image's last name is saved in the database.

---

This document provides a complete overview of the project, including all APIs, their functionalities, and related details. Additionally, I am sharing the Postman collection for the APIs within the project to facilitate easy testing and integration.