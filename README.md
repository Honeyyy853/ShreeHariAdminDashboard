# Shree Hari Admin Dashboard

## 📋 Project Description
A comprehensive React-based admin dashboard for e-commerce management with full CRUD functionality for products, categories, orders, users, and more. Features a responsive sidebar with collapsible menu items and modern UI design.

## ⚙️ Tech Stack
- **Frontend**: React.js with React Router DOM v6
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **State Management**: React Hooks (useState, useEffect, useLocation, useNavigate)
- **Build Tool**: Vite
- **Data Fetching**: Axios
- **Validation**: Zod (for form validation)
- **Charts**: Recharts (for data visualization)

## 📁 Directory Structure
```
src/
├── api/                 # API service files
│   └── api.jsx
├── components/          # Reusable UI components
│   ├── Card.jsx
│   ├── Sidebar.jsx
│   └── Topbar.jsx
├── modules/             # Feature-based modules
│   ├── auth/           # Authentication pages
│   │   └── Login.jsx
│   ├── dashboard/      # Main dashboard
│   │   └── Dashboard.jsx
│   ├── categories/     # Category management
│   │   ├── AddCategory.jsx
│   │   ├── EditCategory.jsx
│   │   ├── ListCategories.jsx
│   │   └── ViewCategory.jsx
│   ├── products/       # Product management
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ListProducts.jsx
│   │   └── ViewProduct.jsx
│   ├── orders/         # Order management
│   │   ├── Orders.jsx
│   │   └── Payments.jsx
│   ├── users/          # User management
│   │   ├── Inquiries.jsx
│   │   └── Users.jsx
│   ├── settings/       # System settings
│   │   └── Settings.jsx
├── App.jsx             # Main application router
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## 🗄️ Database Schema

### Core Tables:
1. **Users Table** - Manages admin and customer accounts
2. **Categories Table** - Product category hierarchy
3. **Products Table** - Product inventory with category relationships
4. **Orders Table** - Customer orders linked to users
5. **Payments Table** - Payment records linked to orders
6. **Inquiries Table** - Customer support tickets
7. **Settings Table** - System configuration

### Key Relationships:
- Products → Categories (Many-to-One)
- Orders → Users (Many-to-One)
- Payments → Orders (Many-to-One)

## 🎨 UI Features

### Sidebar Functionality:
- Collapsible design (expanded: w-64, collapsed: w-16)
- Parent menu items with dropdown submenus
- Visual indicators for active states
- Chevron icons that change direction based on dropdown state
- Tooltips for collapsed menu items
- Fully responsive design

### Dashboard Components:
- **Product Management**: Add, Edit, View, Delete products with modal detail views
- **Category Management**: Create and organize product categories
- **Order Tracking**: Monitor customer orders and payment status
- **User Management**: View customer database and inquiries
- **Payment Records**: Track financial transactions
- **Settings Panel**: Configure system parameters

## 🚀 Development Setup

### Prerequisites:
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation:
```bash
npm install
```

### Development Server:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```

## 🔧 Key Functionalities

### Authentication:
- Secure login system
- Token-based session management

### Product Management:
- Full CRUD operations for products
- Category association
- Image upload support
- Stock level tracking
- Modal-based detailed views

### Category Management:
- Hierarchical category organization
- Add/Edit/Delete capabilities
- Real-time data fetching from API

### Order Management:
- Status tracking (Pending, Processing, Shipped, Delivered, Cancelled)
- Payment status monitoring
- Customer information display

### User Management:
- Customer database viewing
- Support ticket management
- Inquiry tracking system

This dashboard provides a complete administrative interface for managing an e-commerce platform with intuitive navigation and responsive design.


GTI COMMIT:
git add .
git commit -m "update"
git push origin main
