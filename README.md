### **Book Management API**  

This is a Node.js RESTful API for managing a collection of books. It supports user authentication via JWT (JSON Web Tokens) and includes features for managing user roles and access control. The data is stored in-memory, so no database is required.

---

### **Features**  

- **User Authentication**:  
  - Register new users with a username and password.  
  - Login to receive a JWT for authenticated requests.  

- **Book Management**:  
  - Retrieve all books or a specific book by ID.  
  - Add, update, and delete books (admin-only for deletions).  

- **Data Validation**:  
  - Ensures all required fields are provided for creating or updating books.  

- **Role-Based Access Control (RBAC)**:  
  - Admin users can delete books.  
  - Regular users can perform other actions except deletions.  

---

### **API Endpoints**  

#### **Authentication**  
- `POST /register` - Register a new user (provide username and password).  
- `POST /login` - Authenticate a user and return a JWT.  

#### **Books** (Authenticated users only)  
- `GET /books` - Retrieve all books.  
- `GET /books/:id` - Retrieve a specific book by ID.  
- `POST /books` - Add a new book (requires `title`, `author`, and `year` in the body).  
- `PUT /books/:id` - Update an existing book by ID (requires `title`, `author`, and `year` in the body).  
- `DELETE /books/:id` - Delete a book by ID (admin users only).  

---

### **Usage**  

1. Clone the repository:  
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the server:  
   ```bash
   npm start
   ```

4. Use a tool like Postman or cURL to interact with the API.  

---

### **Authentication**  

- After logging in, include the JWT as a **cookie** for protected routes:  
  The token will be sent as a cookie with the key `token`.
  
  Example:  
  ```
  Cookie: token=<your_token>
  ```

---

### **Technologies Used**  

- **Node.js** with **Express**  
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **Middleware** for authentication and role-based access control  