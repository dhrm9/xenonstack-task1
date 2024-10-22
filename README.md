# xenonstack-task1


# Real Estate Dashboard

This project is a web-based Real Estate Dashboard that allows users to browse properties, filter listings, and view detailed information about each property. The website provides various property types including houses, apartments, and condos, with options to filter properties by price range.

## Features

- *User Authentication*: Checks if a user is logged in using a token from localStorage. If no token is present, the user is redirected to the login page.
- *Property Listings*: Display properties fetched from an API (/api/getDummy/data).
- *Image Dropdown Menu*: The top-right corner contains a dropdown menu with an image acting as the profile/option icon.
- *Filtering*: Filter properties based on price (e.g., below $300,000, between $300,000 and $600,000, or above $600,000).
- *Responsive Design*: The dashboard is built using Bootstrap and is fully responsive.
- *Property Details*: Each property has its own card with a title, description, price, and image. A "View Details" button allows for future expansion into more detailed views.

## Technologies Used

- *Frontend*: 
  - React.js
  - Bootstrap 4
- *Backend*: 
  - Express.js (for API routes)
  - MongoDB (for storing property data)
  - Axios (for making API requests)
