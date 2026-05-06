# bfhl-api-0827AL231027 - Bajaj BFHL Challenge

A full-stack application built for the Bajaj Finserv Health Limited (BFHL) recruitment challenge. This project includes a robust Node.js/Express backend deployed on Vercel and a premium Glassmorphism frontend deployed on Netlify.

## 🌐 Live Links
- **Frontend (Netlify)**: [https://bajaj-anshika-frontend.netlify.app](https://bajaj-anshika-frontend.netlify.app)
- **Backend API (Vercel)**: [https://backend-two-plum-93.vercel.app/bfhl](https://backend-two-plum-93.vercel.app/bfhl)

## 🚀 Features
- **Data Processing**: Automatically separates numeric values from alphabets in any given JSON input.
- **Prime Detection**: Identifies if any number in the input array is a prime number.
- **Highest Lowercase Alphabet**: Finds the alphabet that comes last in the A-Z sequence (lowercase only).
- **File Validation**: Processes Base64 encoded strings to extract MIME type and calculate file size in KB.
- **Modern UI**: A fully responsive, glassmorphism-themed frontend with multi-select filtering and real-time validation.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js, CORS.
- **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Glassmorphism).
- **Deployment**: 
  - **Vercel** (Serverless Functions for Backend)
  - **Netlify** (Static Hosting for Frontend)

## 📖 API Reference

### POST `/bfhl`
Processes the input data and returns a structured response.

**Request Body:**
```json
{
  "data": ["A", "1", "334", "4", "B", "z"],
  "file_b64": "optional_base64_string_here"
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "anshika_0827AL231027",
  "email": "anshika@example.com",
  "roll_number": "0827AL231027",
  "numbers": ["1", "334", "4"],
  "alphabets": ["A", "B", "z"],
  "highest_lowercase_alphabet": ["z"],
  "is_prime_found": false,
  "file_valid": false
}
```

### GET `/bfhl`
Returns a hardcoded operation code.

**Response:**
```json
{
  "operation_code": 1
}
```

## 💻 Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/bfhl-api-0827AL231027.git
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   - Simply open `frontend/index.html` in your browser.

## 👤 Author
- **Name**: Anshika
- **Roll Number**: 0827AL231027
- **College**: [Your College Name]
