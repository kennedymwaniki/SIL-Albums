# 📸 PhotoAlbum - Modern Photo Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![Hono.js](https://img.shields.io/badge/Hono.js-4.8.3-orange)](https://hono.dev/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44.2-green)](https://orm.drizzle.team/)
[![Neon Database](https://img.shields.io/badge/Neon-PostgreSQL-blue)](https://neon.tech/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0.0-purple)](https://next-auth.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-cyan)](https://tailwindcss.com/)

## 🌟 Overview

PhotoAlbum is a modern, full-stack photo management platform built with cutting-edge technologies. It provides users with an intuitive interface to organize, manage, and share their precious memories through beautifully designed photo albums.

### ✨ Key Features

- 🔐 **Secure Google OAuth Authentication** - Quick and secure sign-in with Google
- 👥 **User Management** - Comprehensive user profiles with avatar support
- 📂 **Album Organization** - Create, manage, and organize photo albums
- 🖼️ **Photo Management** - Upload, edit, and manage photos within albums
- 🌐 **Community Discovery** - Explore other users' photo collections
- 📱 **Responsive Design** - Beautiful, mobile-first UI with Tailwind CSS
- 🛡️ **Protected Routes** - Secure API endpoints with NextAuth middleware
- ⚡ **Real-time Updates** - Instant UI updates with Next.js revalidation

## 🏗️ Tech Stack

### Frontend

- **Next.js 14.2.5** - Full-stack React framework with App Router
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### Backend

- **Hono.js 4.8.3** - Fast, lightweight web framework for API routes
- **NextAuth.js 5.0.0** - Complete authentication solution
- **Drizzle ORM 0.44.2** - Type-safe SQL ORM
- **Neon Database** - Serverless PostgreSQL database

### Authentication & Security

- **Google OAuth** - Secure authentication provider
- **NextAuth.js Middleware** - Route protection and session management
- **CORS Protection** - Cross-origin resource sharing security

## 🚀 Getting Started

### Prerequisites

- Node.js 18.11.18 or later
- PostgreSQL database (Neon recommended)
- Google OAuth credentials
- pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd silfrontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=postgresql://username:password@host:port/database

   # NextAuth
   NEXT_PUBLIC_AUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # Google OAuth
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   ```

4. **Set up the database**

   ```bash
   # Generate migration files
   pnpm gen

   # Run migrations
   pnpm migrate
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📖 How It Works

Our platform follows a simple, intuitive workflow designed for seamless photo management:

### 1. 🔐 **Sign In with Google**

- Quick and secure authentication using Google OAuth
- No additional passwords to remember
- Automatic user profile creation with Google account data

### 2. 👥 **Explore the Community**

- Browse through registered users and their photo collections
- Discover amazing userss and their work
- View user profiles with album counts and join dates

### 3. 📂 **View Albums & Photos**

- Navigate through organized photo albums
- View detailed album information including creation dates
- Browse photos within each album with a clean, gallery-like interface

### 4. 🎨 **Create Your Own Albums**

- Design custom albums with meaningful titles and descriptions
- Organize photos by events, dates, or themes
- Track album creation dates and photo counts

### 5. 📸 **Add & Manage Photos**

- Upload photos to your albums
- Edit photo titles and descriptions
- Organize your memories with intuitive management tools

## 🗄️ Database Schema

### Users Table

```sql
users (
  id: serial PRIMARY KEY,
  firstname: varchar(100) NOT NULL,
  lastname: varchar(50) NOT NULL UNIQUE,
  email: varchar(255) NOT NULL UNIQUE,
  avatar_url: text,
  created_at: timestamp DEFAULT NOW()
)
```

### Albums Table

```sql
albums (
  id: serial PRIMARY KEY,
  user_id: integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title: varchar(255) NOT NULL,
  description: text,
  created_at: timestamp DEFAULT NOW()
)
```

### Photos Table

```sql
photos (
  id: serial PRIMARY KEY,
  album_id: integer NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  title: varchar(255) NOT NULL,
  url: text NOT NULL,
  uploaded_at: timestamp DEFAULT NOW()
)
```

## 🛠️ API Endpoints

All API endpoints are built with Hono.js and protected by NextAuth.js middleware. Base URL: `http://localhost:3000/api`

### 👥 Users API

#### Get All Users

```http
GET /api/users
```

**Response:**

```json
{
  "message": "Fetch all users",
  "data": [
    {
      "id": 1,
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "avatarUrl": "https://...",
      "createdAt": "2023-01-01T00:00:00Z",
      "albums": [...]
    }
  ]
}
```

#### Get User by ID

```http
GET /api/users/:id
```

**Response:**

```json
{
  "message": "Fetch user with ID: 1",
  "data": {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "albums": [...]
  }
}
```

#### Find User by Email

```http
POST /api/users/findByEmail
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Create User

```http
POST /api/users
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "avatarUrl": "https://..."
}
```

#### Update User

```http
PATCH /api/users/:id
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Smith"
}
```

### 📂 Albums API

#### Get All Albums

```http
GET /api/albums
```

**Optional Query Parameters:**

- `userId` - Filter albums by user ID

**Response:**

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "My Vacation",
    "description": "Summer vacation photos",
    "createdAt": "2023-01-01T00:00:00Z",
    "photos": [...]
  }
]
```

#### Get Album by ID

```http
GET /api/albums/:id
```

#### Create Album

```http
POST /api/albums
Content-Type: application/json

{
  "userId": 1,
  "title": "My New Album",
  "description": "Album description"
}
```

#### Update Album

```http
PATCH /api/albums/:id
Content-Type: application/json

{
  "title": "Updated Album Title",
  "description": "Updated description"
}
```

### 🖼️ Photos API

#### Get All Photos

```http
GET /api/photos
```

**Response:**

```json
[
  {
    "id": 1,
    "albumId": 1,
    "title": "Beautiful Sunset",
    "url": "https://...",
    "uploadedAt": "2023-01-01T00:00:00Z",
    "album": {...}
  }
]
```

#### Get Photo by ID

```http
GET /api/photos/:id
```

#### Create Photo

```http
POST /api/photos
Content-Type: application/json

{
  "albumId": 1,
  "title": "New Photo",
  "url": "https://example.com/photo.jpg"
}
```

#### Update Photo

```http
PATCH /api/photos/:id
Content-Type: application/json

{
  "title": "Updated Photo Title",
  "url": "https://example.com/new-photo.jpg"
}
```

## 🔒 Authentication & Security

### Google OAuth Integration

The application uses **NextAuth.js** with Google OAuth provider for secure authentication:

```typescript
// lib/auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // Custom callbacks for user creation and session management
  },
});
```

### Middleware Protection

All protected routes and API endpoints are secured using NextAuth.js middleware:

```typescript
// middleware.ts
export const middleware = auth;
export const config = {
  matcher: ["/users", "/albums", "/photos"], // Protected routes
};
```

### Session Management

- **Automatic user creation** on first Google sign-in
- **Session persistence** across page refreshes
- **User data synchronization** with database
- **Secure session handling** with NextAuth.js

## 📁 Project Structure

```
silfrontend/
├── app/                          # Next.js App Router pages
│   ├── albums/                   # Album-related pages
│   │   ├── page.tsx             # Albums listing page
│   │   └── [albumId]/           # Dynamic album pages
│   ├── api/                     # API routes (Hono.js)
│   │   ├── (modules)/           # API modules
│   │   │   ├── albums.ts        # Albums API endpoints
│   │   │   ├── photos.ts        # Photos API endpoints
│   │   │   └── users.ts         # Users API endpoints
│   │   ├── [...route]/          # Catch-all API route
│   │   └── auth/                # NextAuth.js configuration
│   ├── how-it-works/            # How it works page
│   ├── login/                   # Login page
│   ├── photos/                  # Photo-related pages
│   ├── users/                   # User-related pages
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── AlbumCard.tsx            # Album display component
│   ├── AlbumForm.tsx            # Album creation form
│   ├── Navbar.tsx               # Navigation component
│   ├── SignInButton.tsx         # Google sign-in button
│   ├── UserAlbums.tsx           # User's albums display
│   └── UsersComponent.tsx       # Users listing component
├── db/                          # Database configuration
│   ├── db.ts                    # Database connection (Neon)
│   └── schema.ts                # Drizzle ORM schema
├── lib/                         # Utility functions
│   ├── actions.ts               # Server actions
│   ├── auth.ts                  # NextAuth.js configuration
│   └── services.ts              # API service functions
├── drizzle/                     # Database migrations
├── public/                      # Static assets
└── package.json                 # Dependencies and scripts
```

## 🎨 UI Components

### Key Components

- **AlbumCard** - Displays album information with photo counts
- **AlbumForm** - Interactive form for creating new albums
- **UserAlbums** - Grid layout for user's album collection
- **UsersComponent** - Community users display with avatars
- **Navbar** - Responsive navigation with authentication status

### Design System

- **Color Palette** - Blue and purple gradients with gray accents
- **Typography** - Clean, modern fonts with proper hierarchy
- **Spacing** - Consistent spacing using Tailwind's scale
- **Shadows** - Subtle shadows for depth and card elevation
- **Responsive** - Mobile-first design with breakpoint optimization

## 🚀 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Generate database migrations
pnpm gen

# Run database migrations
pnpm migrate

# Push schema changes to database
pnpm push

# Run linting
pnpm lint
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth Configuration
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth Credentials
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

## 📚 API Documentation

### Authentication Flow

1. **User clicks "Sign in with Google"**
2. **Redirect to Google OAuth**
3. **Google returns user data**
4. **Check if user exists in database**
5. **Create new user if needed**
6. **Generate NextAuth session**
7. **Redirect to dashboard**

### Database Relations

- **Users** have many **Albums** (one-to-many)
- **Albums** belong to one **User** (many-to-one)
- **Albums** have many **Photos** (one-to-many)
- **Photos** belong to one **Album** (many-to-one)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] **Photo Upload** - Direct photo upload functionality
- [ ] **Album Sharing** - Share albums with other users
- [ ] **Photo Editing** - Basic photo editing tools
- [ ] **Search & Filter** - Advanced search and filtering options
- [ ] **Bulk Operations** - Bulk photo management
- [ ] **Photo Comments** - Commenting system for photos
- [ ] **Album Templates** - Pre-designed album templates
- [ ] **Export Options** - Export albums as PDFs or slideshows

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing full-stack framework
- [Hono.js](https://hono.dev/) for the fast and lightweight API framework
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [NextAuth.js](https://next-auth.js.org/) for seamless authentication
- [Neon](https://neon.tech/) for serverless PostgreSQL hosting
- [Tailwind CSS](https://tailwindcss.com/) for beautiful, responsive styling

---

**Built with ❤️ by [Your Name]**

_PhotoAlbum - Where memories live forever_ 📸✨
