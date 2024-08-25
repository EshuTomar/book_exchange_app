# Book Exchange Platform Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [User Interface Design](#user-interface-design)
4. [Features and Functionality](#features-and-functionality)
   - [User Authentication](#user-authentication)
   - [Book Management](#book-management)
   - [Book Discovery](#book-discovery)
   - [Matchmaking](#matchmaking)
   - [Exchange Requests](#exchange-requests)
5. [Database Integration](#database-integration)
6. [Edge Case Handling](#edge-case-handling)
7. [Installation and Setup](#installation-and-setup)
8. [Usage Guide](#usage-guide)
9. [Tech Stack](#tech-stack)
10. [Contributing](#contributing)
11. [License](#license)
12. [FAQ](#faq)

---

## Introduction

The **Book Exchange Platform** is a web application designed for book lovers to connect and exchange books. Users can list books they own, browse through books listed by others, find matches based on their preferences, and initiate exchange requests.

## Project Structure

The project is structured as follows:

book-exchange-platform/ <br/>
├── public/     <br/>                                      
├── src/<br/>
│   ├── assets/ <br/>  
│   ├── components/ <br/>  
│   │   ├── Navbar/ <br/>  
│   │   ├── BookListing/ <br/>  
│   │   ├── BookDiscovery/<br/>  
│   │   ├── Matchmaking/<br/>  
│   │   ├── Authentication/<br/>  
│   │   └── ExchangeRequests/<br/>  
│   ├── firebaseConfig.js<br/>  
│   ├── App.js<br/>  
│   ├── index.js<br/>  
│   └── styles/<br/>  
├── .gitignore<br/>  
├── package.json<br/>  
├── README.md<br/>  
└── LICENSE<br/>  



- **`public/`**: Contains static assets.
- **`src/`**: Contains the main application code, including components, styles, and Firebase configuration.
- **`firebaseConfig.js`**: Firebase configuration file for database and authentication integration.
- **`components/`**: Contains React components for various features of the app.
- **`styles/`**: Contains global CSS and component-specific styling files.

## User Interface Design

The UI is designed to be clean and user-friendly. It uses an existing CSS library for styling and includes the following pages:

- **User Registration and Login**: Pages for users to sign up, log in, and log out.
- **Book Listing**: A page where users can list books they own and want to exchange.
- **Book Discovery**: A page for browsing books listed by others, with filters for genre, author, etc.
- **Matchmaking Page**: A page where users can see potential matches based on their book preferences.
- **Exchange Requests**: A page for managing book exchange requests.

## Features and Functionality

### User Authentication

- **Registration and Login**: Users can register and log in securely using Firebase Authentication.
- **Session Management**: User sessions are managed to persist authentication state across page reloads.
- **Logout**: Users can log out of their accounts, which redirects them to the homepage.

### Book Management

- **Add a Book**: Users can add books they want to exchange, including details like title, author, genre, and cover image.
- **Edit a Book**: Users can edit the details of books they have listed.
- **Delete a Book**: Users can remove books they no longer wish to exchange.

### Book Discovery

- **Browse Books**: Users can browse books listed by others, with options to filter by genre, author, etc.
- **Search Bar**: A search bar allows users to quickly find specific books based on title or author.

### Matchmaking

- **Find Matches**: A matching algorithm suggests potential book exchanges based on user preferences.
- **View Matches**: Users can view detailed information about matched books and initiate an exchange request.

### Exchange Requests

- **Request Exchange**: Users can send requests to other users to exchange books.
- **Manage Requests**: Users can view incoming and outgoing exchange requests and respond to them.

## Database Integration

The application uses Firebase Firestore for data storage. It stores:

- **User Information**: User profiles, authentication data, and preferences.
- **Book Listings**: Information about books listed by users, including title, author, genre, and cover image.
- **Exchange Requests**: Data related to exchange requests between users, including status and timestamps.

### Database Schema

- **Users Collection**: Stores user data including user ID, email, and preferences.
- **Books Collection**: Stores book data including title, author, genre, cover image URL, and owner ID.
- **Requests Collection**: Stores exchange request data including sender ID, receiver ID, book IDs, and request status.

## Edge Case Handling

The application includes handling for various edge cases:

- **Input Validation**: Ensures that users provide all necessary information when listing a book.
- **Duplicate Prevention**: Prevents users from listing the same book multiple times.
- **No Matches Found**: Provides feedback to users when no matching books are found.
- **Image Upload**: Ensures that users upload a valid image file for book cover images.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your local machine.
- A Firebase project set up with Firestore and Authentication.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/EshuTomar/book_exchange_platform.git
   cd book_exchange_platform
