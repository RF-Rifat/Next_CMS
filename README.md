# NX-CMS: Next.js Headless CMS

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?logo=next.js)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-47A248?logo=mongodb)](https://www.mongodb.com)

A WordPress-inspired headless CMS built with Next.js, MongoDB, and Tailwind CSS.

## Table of Contents
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Plugin System](#-plugin-system)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- WordPress-like admin interface
- Modular plugin architecture
- Role-based access control (Admin, Editor, Author, Subscriber)
- Custom post types and taxonomies
- Media library with Cloudinary integration
- WYSIWYG editor with shortcode support
- SEO-friendly URLs and metadata

### Technical Stack
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- MongoDB (Mongoose ODM)
- NextAuth.js (JWT & OAuth)
- Cloudinary CDN
- Vercel deployment ready

## 🖥 Demo

**Admin Dashboard:** `https://demo.cmsx.app/admin`  
**Frontend:** `https://demo.cmsx.app`

> Demo credentials:  
> Email: `admin@demo.com`  
> Password: `demo123`

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- Cloudinary account

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cms.git
cd cmsx