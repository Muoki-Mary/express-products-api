# Express Products API

This is a RESTful API built with Express.js to manage products.

## Features

- Create, read, update, delete (CRUD) products
- Middleware for:
  - JSON parsing
  - Logging
  - Authentication
  - Validation
- Error handling
- Filtering, searching, pagination (optional)

## How to Run

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd express-api-assignment

2. Install dependencies:

npm install

3.Start the server:

node server.js

The server will run at: http://localhost:3000
Environment Variables

Create a .env file and add:

PORT=3000
API_KEY=mytoken

(You can also include this in a .env.example file for reference.)
API Endpoints
Create Product

    Method: POST

    URL: /api/products

    Headers:

        Authorization: Bearer mytoken

    Body:

{
  "name": "Laptop",
  "description": "Powerful machine",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}

Get All Products

    Method: GET

    URL: /api/products

Get Single Product

    Method: GET

    URL: /api/products/:id

Update Product

    Method: PUT

    URL: /api/products/:id

    Headers:

        Authorization: Bearer mytoken

    Body: Same as Create

Delete Product

    Method: DELETE

    URL: /api/products/:id

    Headers:

        Authorization: Bearer mytoken

Tested With

    Postman

Author

Mary Muoki – GitHub
```
