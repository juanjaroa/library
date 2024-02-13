# Casa Jaguar Online Catalog

This repository contains an online book catalog application for Casa Jaguar Tienda Andina, where users can browse available books for sale.

## Technologies Used

- Vue3
- Vite
- Pinia
- Supabase Database
- Supabase Auth
- Router
- PrimeVue

## Features

The application provides a complete CRUD functionality to manage the Casa Jaguar book catalog. Users can:

- Browse listings of available books.
- View details of each book.
- Authenticated users can:
  - Add new books.
  - Update existing book information.
  - Delete books from the catalog.

## Authenticated User Access

Authenticated users with administration permissions receive a manually generated password, linked to their email, to access book management functions.

## Contributions and Development

The recommended workflow for contributing to the project includes cloning the repository, installing dependencies, and running the development server.

To run the project locally in a development environment, follow these steps:

1.  Clone the repository.
2.  Install project and dependencies with `npm install`.
3.  Create a `.env` file in the project root with the following environment variables:
    ```
    //.env
    VITE_SUPABASE_URL = Supabase project URL
    VITE_SUPABASE_KEY = Anon public key
    ```
4.  Run the development server with `npm run dev`.
