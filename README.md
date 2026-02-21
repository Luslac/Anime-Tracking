<div align="center">

# 🏯 Anime Tracking Project

**Track, manage, and explore the world of anime — all in one place.**

[![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-v5.22.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📖 About the Project

**Anime Tracking** is a full-stack web application that allows users to search, track, and manage their personal anime list. With a clean and responsive interface, you can effortlessly monitor your watching progress, give ratings, and organize your favorite anime in one centralized dashboard.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure registration & login using JWT and Bcrypt encryption |
| 🔍 **Anime Search** | Browse anime catalog via Jikan/MyAnimeList API integration |
| 📋 **My List** | Add, edit, and remove anime from your personal list |
| 🎯 **Watch Status** | `WATCHING` · `COMPLETED` · `PLAN_TO_WATCH` · `ON_HOLD` · `DROPPED` |
| 📊 **Episode Progress** | Track watched episodes in real-time |
| ⭐ **Rating & Notes** | Give personal ratings and write notes for each anime |
| ❤️ **Favorites** | Mark your all-time favorite anime |
| 📅 **Statistics** | View your anime list grouped by watch status |

---

## 🛠️ Tech Stack

### 🎨 Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | v19 | Main UI library |
| Vite | Latest | Fast build tool |
| Tailwind CSS | Latest | Responsive & modern styling |
| React Router | v7 | Client-side navigation |
| Axios | Latest | HTTP client for Backend API |
| Fetch API | Latest | HTTP client for Jikan API |

### ⚙️ Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | v22 | Runtime environment |
| Express.js | Latest | Web framework |
| Prisma ORM | v5.22.0 | Database management & queries |
| Zod | Latest | Input schema validation |
| Winston | Latest | Server logging |
| JWT + Bcrypt | Latest | Authentication & security |

### 🗄️ Database
| Technology | Purpose |
|---|---|
| MySQL | Primary relational database |

---

## 📋 Prerequisites

Make sure the following tools are installed on your system before getting started:

- ✅ **[Node.js v22](https://nodejs.org/)** — JavaScript runtime
- ✅ **[MySQL](https://www.mysql.com/)** — Database server
- ✅ **npm** — Package manager (comes bundled with Node.js)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Luslac/Anime-Tracking.git
cd Anime-Tracking
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/anime_tracking_db"

# Server Configuration
PORT=8080

# JWT Configuration
JWT_SECRET="your_jwt_secret"
```

Run the database migration with Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Frontend Setup

```bash
cd ../movie-and-anime-list
npm install
```

---

## 💻 Running the Application

Open **two terminals** simultaneously and run the following commands:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
> Server running at: `http://localhost:8080`

**Terminal 2 — Frontend:**
```bash
cd movie-and-anime-list
npm run dev
```
> Application running at: `http://localhost:5173`

---

## 🗺️ How to Use

```
1. Open http://localhost:5173 in your browser
2. Register a new account on the Register page
3. Log in to access the tracking features
4. Search for anime you want to watch and click "Add to List"
5. Update episode progress and status on the My List page
6. Give ratings and write notes for anime you've finished watching
```

---

## 📂 Project Structure

```
Anime-Tracking/
│
├── 📁 backend/                     # Server-side application
│   ├── 📁 prisma/
│   │   ├── schema.prisma           # Database model definitions
│   │   └── migrations/             # Database migration history
│   ├── 📁 src/
│   │   ├── controller/             # HTTP request handlers
│   │   ├── service/                # Business logic
│   │   ├── repo/                   # Database interactions
│   │   ├── middleware/             # Auth & validation middleware
│   │   └── routes/                 # API endpoint definitions
│   ├── 📁 test/                    # Unit & integration tests
│   └── .env                        # Environment variables
│
├── 📁 movie-and-anime-list/        # Client-side application
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 pages/               # Main pages (Home, List, etc.)
│   │   ├── 📁 ui/                  # Global layout & UI elements
|   │   └── 📁 utils/               # Helper Function
│   └── 📁 public/                  # Static assets
│
└── README.md
```

---

## 🤝 Contributing

Contributions are always welcome and appreciated! Follow these steps to contribute:

1. **Fork** this repository
2. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add some amazing feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a **Pull Request** and describe the changes you've made

---
## 🙏 Acknowledgements

- **[Jikan API](https://jikan.moe/)** — Unofficial MyAnimeList REST API used to fetch anime data. This project wouldn't be possible without their free and open API.
- **[MyAnimeList](https://myanimelist.net/)** — The source of all anime data served through Jikan.

---
## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

<div align="center">

Made by **[byu](https://github.com/Luslac)**

</div>
