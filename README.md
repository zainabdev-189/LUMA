# LUMA Ecommerce

A modern editorial ecommerce frontend built with React, React Router and the DummyJSON Products API.

## Features

- Editorial LUMA homepage inspired by minimalist luxury fashion layouts
- Explore/Collections page
- Product categories from DummyJSON
- Category-specific product listings
- API-based pagination using `limit` and `skip`
- Product detail pages
- Product image gallery
- Ratings and reviews
- Search with pagination
- Shopping bag/cart using localStorage
- Responsive design
- External editorial imagery from Unsplash
- DummyJSON product imagery used for product cards/details

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Main routes

- `/`
- `/categories`
- `/category/:category`
- `/product/:id`
- `/search?q=phone`
- `/cart`

## API

The project uses:

https://dummyjson.com/products

DummyJSON supports pagination through `limit` and `skip`, which is used by the category and search pages.
