# ShopSwift - Modern MERN E-Commerce Platform

ShopSwift is a full-featured, responsive e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless shopping experience for users and a robust management dashboard for administrators.

## 🚀 Key Features

### 👤 User Features
- **Authentication & Authorization:** Secure registration and login using JWT with HTTP-only cookies.
- **Product Discovery:** Browse products by category, search functionality, and advanced filtering.
- **Shopping Cart:** Persistent cart management (add, update, remove items) across sessions.
- **Address Management:** Multiple shipping addresses per user.
- **Checkout Flow:** Integrated PayPal payment gateway for secure transactions.
- **Order Tracking:** View order history and detailed order status.
- **Product Reviews:** Rate and review products after purchase.

### 🛠 Admin Features
- **Dashboard:** Overview of sales and platform performance.
- **Product Management:** Full CRUD operations for products, including image uploads via Cloudinary.
- **Order Management:** Track and update the status of all user orders.
- **Featured Management:** Control promotional banners and featured content on the home page.

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS v4
- **Components:** Radix UI primitives
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT & Bcryptjs
- **Image Handling:** Cloudinary & Multer
- **Payments:** PayPal REST SDK

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- PayPal Developer account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/e-commerce-app.git
cd e-commerce-app
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory (if needed for API base URL):
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application
- **Backend:** `npm run dev` (from /server)
- **Frontend:** `npm run dev` (from /client)

## 🧩 Technical Case Study: The PayPal Integration

One of the most significant technical challenges in this project was integrating the PayPal payment gateway. The implementation moved away from outdated patterns toward a more resilient integration flow.

**The Challenge:**
The initial integration faced issues with deprecated SDK patterns and inconsistent API responses. Relying solely on tutorials proved difficult as third-party services like PayPal frequently update their SDKs and documentation.

**The Solution:**
Instead of forcing a tutorial-based approach, the integration was rebuilt by studying the official PayPal REST SDK documentation. This involved:
- Implementing a robust order creation and capture flow.
- Handling redirect URLs for payment success and cancellation.
- Verifying transactions on the server-side to ensure security.

This experience reinforced a core engineering value: **Official documentation is the ultimate source of truth.**

## 📄 License
ISC License - Feel free to use this project for your own learning!

---
*Developed with ❤️ by Kaushik Chowdhury*
