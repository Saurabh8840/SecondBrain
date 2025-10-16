🧠 SecondBrain — Your Smart Knowledge Organizer

SecondBrain is a full-stack productivity app that helps users save and organize their digital content — including articles, tweets, YouTube videos, and documents — all in one place.
It allows secure login, smart categorization by tags, and easy content sharing with others.

🚀 Features

🔐 Authentication System — Secure login & signup using JWT and middleware protection

🧩 Add & Manage Content — Save tweets, videos, documents, and links

🏷️ Tag Filtering — Organize content using smart tags

🧠 Share Your Brain — Generate a shareable link of all your content

🎨 Modern UI — Sleek dark theme with smooth gradients and responsive design

⚡ Optimized with Axios — For efficient data fetching & API integration

🖼️ Project Demo

Here’s how SecondBrain looks in action 👇

Dashboard	Add Content

	
Share Brain	Authentication	Responsive UI

	
	
🏗️ Tech Stack
🖥️ Frontend

React + TypeScript

Axios (API calls)

Tailwind CSS (styling)

Lucide-React Icons

⚙️ Backend

Node.js + Express

Prisma ORM + PostgreSQL

JWT Authentication

Zod Validation


⚡ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/yourusername/secondbrain.git
cd secondbrain

2️⃣ Backend setup
cd backend
npm install
npx prisma migrate dev
npm run dev

3️⃣ Frontend setup
cd frontend
npm install
npm run dev

4️⃣ Environment Variables

Make sure to create a .env file in both backend and frontend folders.

Example backend .env:

DATABASE_URL=postgresql://user:password@localhost:5432/secondbrain
JWT_SECRET=your_secret_key
PORT=3000


Example frontend .env:

VITE_API_URL=http://localhost:3000/api

🔐 Authentication Flow

User registers or logs in.

A JWT token is saved in localStorage.

All subsequent API calls include the Authorization: Bearer <token> header.

Logout removes token and redirects to login.

🧩 API Endpoints
Endpoint	Method	Description
/api/auth/register	POST	Register new user
/api/auth/login	POST	Login existing user
/api/auth/logout	POST	Logout user
/api/content/addContent	POST	Add a new content item
/api/content/fetchContent	GET	Fetch all user contents
/api/content/delete/:id	DELETE	Delete content by ID
/api/brain/all	POST	Generate shareable brain link
🧠 Future Improvements

🔍 Global search by tags or title

📅 Content scheduling / reminders

📎 File upload support

🌐 Public profile pages for shared brains

💡 Author

👩‍💻 Created by Sakshi
Frontend + Backend Developer | Passionate about building efficient and clean full-stack products

⭐ Support

If you like this project, please star ⭐ the repository and share it!
Feedback and contributions are welcome 💬