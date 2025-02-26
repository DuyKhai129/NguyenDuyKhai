ExpressJS + TypeScript + MongoDB CRUD API

1. Install dependencies
    cd src/problem5 if clone project NguyenDuyKhai
    run: npm i

2. Create a MongoDB Atlas account
   - Visit MongoDB Atlas and sign up for a free account.
   - Create a new Cluster (choose Free Tier).
   - Get the connection url and assign it to step 3 

3. Setup environment variables
   - Create a .env file in the project root and add the following:

     PORT=8000
     MONGO_URI=mongodb+srv://khai123:dk12345@cluster0.kdnbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

* Replace MONGO_URI with your MongoDB Atlas connection string.

4. Run the development server
   npm run dev

    The server should now be running at http://localhost:8000

Testing the API

You can test the API using Postman or cURL.

- Create a new resource
  curl --location 'localhost:8000/api/resources/' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Example0",
  "description": "This is a test resource"
  }'

- Get all resources
  curl -X GET http://localhost:8000/api/resources

- Get a resource by ID
  curl -X GET http://localhost:8000/api/resources/{id}

- Update a resource
  curl --location --request PATCH 'localhost:8000/api/resources/{id}' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Example",
  "description": "This is a test resource"
  }'

- Delete a resource
  curl -X DELETE http://localhost:8000/api/resources/{id}