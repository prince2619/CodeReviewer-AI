
```markdown
# 🤖 Review-It: AI Code Reviewer Web App

> 🚀 A full-stack web application that leverages Google's Gemini Pro API to review code with precision and depth—just like a senior software engineer with 7+ years of experience.

---

## 🧠 Features

- ✅ Submit any code snippet and get an AI-generated review
- ✅ Feedback covers performance, readability, scalability, and security
- ✅ Intuitive editor powered by `prismjs` and `react-simple-code-editor`
- ✅ Clean UI with real-time Markdown rendering of the review
- ✅ Powered by Google Gemini (Gemini Pro API)

---

## 📁 Folder Structure

```bash
code-reviewer/
├── BackEnd/
│   ├── .env                        # Gemini API key
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js                  # Express server entry point
│   └── src/
│       ├── app.js                 # Express config, middleware, routes
│       ├── controllers/
│       │   └── ai.controller.js   # Controller for /get-review route
│       ├── routes/
│       │   └── ai.routes.js       # API endpoint routing
│       └── services/
│           └── ai.service.js      # Gemini API integration logic
│
├── FrontEnd/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx                # Main React component
│       ├── App.css                # Styling for editor + layout
│       ├── main.jsx               # React entry point
│       ├── index.css              # Global styles
│       └── assets/                # Assets (if any)
│
└── README.md                      # Project documentation (this file)
```

---

## 🛠️ Technologies Used

**Backend:**
- Node.js
- Express.js
- dotenv
- @google/generative-ai (Gemini API)
- CORS

**Frontend:**
- React.js
- PrismJS + react-simple-code-editor (for live syntax highlighting)
- Axios (for API calls)
- react-markdown + rehype-highlight (for markdown rendering)

---

## 🔐 Gemini API Setup

1. Get your Google Gemini API key from: [Google AI Studio](https://makersuite.google.com/app)
2. In your backend folder, create a `.env` file:
   ```
   GOOGLE_GEMINI_KEY=your-api-key-here
   ```

---

## 🧑‍💻 Local Development Guide

### ✅ Initial Setup

```bash
git clone https://github.com/your-username/code-reviewer.git
cd code-reviewer
```

### 🚀 Backend Setup

```bash
cd BackEnd
npm init -y
npm i express dotenv cors @google/generative-ai
npm i nodemon --save-dev
```

> ✅ Create `server.js` and setup `.env` file with your Gemini API key.

**Start the backend server:**

```bash
npx nodemon server.js
```

> The server runs on `http://localhost:3000`

---

### 💻 Frontend Setup

```bash
cd ../FrontEnd
npm install
npm i prismjs react-simple-code-editor axios react-markdown rehype-highlight highlight.js
```

**Start the frontend development server:**

```bash
npm run dev
```

> The frontend runs on `http://localhost:5173` (configured in CORS)

---

## 🔄 API Endpoint

### POST `/ai/get-review`

**Request:**
```json
{
  "code": "function sum() { return 1 + 1 }"
}
```

**Response:**
- AI-reviewed Markdown text with code suggestions, bugs, and improvements.

---

## 🧾 Notes from Development (Personal Reference)

- Created `code-reviewer` folder with `BackEnd` and `FrontEnd` subfolders
- Installed essential backend packages (`express`, `dotenv`, `@google/generative-ai`, etc.)
- Used `npx nodemon` for auto-restarting backend
- Installed syntax highlighters and markdown renderers on the frontend
- Connected frontend with backend using `axios` with CORS support

---

## ✨ Future Ideas

- ✅ Add language detection
- ✅ Dark/light mode toggle
- ❌ User authentication (coming soon)
- ❌ Save history of reviews
- ❌ Export review as PDF

---

## 📬 Contact

Made with 💻 by Prince Raj  
Feel free to connect on [LinkedIn](https://www.linkedin.com/in/prince-raj91/) or reach out via [email](princeraj7173@gmail.com).

---


