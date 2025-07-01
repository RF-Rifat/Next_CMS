# Changelog

## [1.0.1] - 2025-06-26

### ✅ Complete Dynamic Page Management System

---

#### 🔧 API Routes Created:
- `GET /api/page` – Fetch all pages  
- `POST /api/page` – Create a new page  
- `GET /api/page/[id]` – Fetch a single page  
- `PUT /api/page/[id]` – Update a page  
- `DELETE /api/page/[id]` – Delete a page  

---

#### 📦 Updated Components:

**Page List** (`app/nx-admin/page/page.tsx`):
- ✅ Fetches pages from MongoDB API  
- ✅ Displays dynamic page data with status badges  
- ✅ Handles delete operations with confirmation  
- ✅ Shows loading and error states  
- ✅ Links to edit and view pages  

**Form Component** (`app/nx-admin/page/Form.tsx`):
- ✅ Supports both create and edit modes  
- ✅ Connects to API for form submission  
- ✅ Manages form state using TypeScript  
- ✅ Supports all fields: title, slug, content, meta tags, images, layouts  

**Edit Page** (`app/nx-admin/page/[id]/page.tsx`):
- ✅ Fetches existing page data by ID  
- ✅ Passes data to Form component for editing  

**Add Page** (`app/nx-admin/page/add/page.tsx`):
- ✅ Uses Form component to create new pages  

---

#### 🎨 Enhanced UI Components:

- **Text** – Added `onChange` prop  
- **Slug** – Added `onChange` with auto-generation  
- **Content** – Added `defaultValue` and `onChange` props  
- **MetaTag** – Added change handlers for title, description, and keywords  
- **Submit** – Added status selection and submit handler  
- **Select** – Added `defaultValue` and `onChange` props  

---

#### 🗂 Database Schema: `pages` collection

- `title` – Page title  
- `slug` – URL-friendly slug  
- `content` – Rich text content  
- `meta_title`, `meta_description`, `meta_keywords` – SEO metadata  
- `featured_image`, `gallery_images` – Media support  
- `layout_top`, `layout_bottom` – Layout selections  
- `status` – draft / published / archived  
- `created_at`, `updated_at` – Timestamps  

---

#### 🚀 Features Implemented:

- ✅ **Create** – Add new pages using a full form  
- ✅ **Read** – List all pages with search and pagination  
- ✅ **Update** – Edit existing pages via form  
- ✅ **Delete** – Remove pages with confirmation  
- ✅ **Status Management** – Draft / Published / Archived  
- ✅ **SEO Support** – Meta tags and descriptions  
- ✅ **Media Support** – Featured images and gallery  
- ✅ **Layout Support** – Top and bottom layout sections  

---

#### ✅ Usage Summary:

- ➕ Add new pages: `/nx-admin/page/add`  
- 📄 View all pages: `/nx-admin/page`  
- ✏️ Edit a page: Click the edit button  
- ❌ Delete a page: Use delete with confirmation  
- 🔗 View live page: Click external link button  

All operations are fully connected to MongoDB, with real-time interface updates for all CRUD operations.


# USER AUTHENTICATION


## [1.1.0] - 2025-07-01

### 🚀 WordPress-like Authentication, User Management, and Role-Based Access

---

#### 🔒 Authentication & Session
- Session-based authentication using secure HTTP-only cookies
- Admin login via credentials in `.env` (`ADMIN_EMAIL`, `ADMIN_PASS`)
- All other users authenticate via MongoDB
- Login UI supports only email and password (no mobile/OTP)

#### 👤 User Management (Admin Area)
- Dynamic user list with real-time CRUD (add, edit, delete, assign roles)
- Add/Edit user form supports:
  - Username (required)
  - Email (required)
  - First Name
  - Last Name
  - Website
  - Password (required for add, optional for edit)
  - Send User Notification (checkbox, placeholder)
  - Role(s) (multi-select, default Subscriber)
- Unique username and email enforced
- Passwords are securely hashed
- Env admin user is protected from edit/delete

#### 🛡️ Role-Based Access (WordPress-style)
- `/nx-admin` area protected for all users with allowed roles (Administrator, Editor, Author, Contributor, Subscriber)
- Only users with Administrator role can manage users
- Role checks are performed on the backend and frontend
- Utility for checking allowed roles in layouts
- Foundation for per-page/per-action role/capability checks (WordPress-style granularity)

#### 🧩 UI/UX Improvements
- User management UI is fully dynamic and matches WordPress admin experience
- Add/Edit user modal supports all fields and multi-role assignment
- Success/error messages and redirects for all user actions

#### 🗂 Database Schema: `users` collection
- `username`, `email`, `firstName`, `lastName`, `website`, `password`, `roles` (array), `role` (first role), `createdAt`

---

#### ✅ Usage Summary:
- ➕ Add new users: `/nx-admin/users/add`
- 👥 View/manage users: `/nx-admin/users`
- ✏️ Edit user: Inline modal in user list
- ❌ Delete user: Button in user list (except env admin)
- 🔐 Login: `/auth` (admin via .env, others via MongoDB)
- 🛡️ Role-based access: All admin pages protected by role

---
