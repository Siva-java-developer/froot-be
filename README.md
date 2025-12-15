# FrootFast Backend API

## Setup Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Setup**
Create `.env` file:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key
MONGO_URL=mongodb://127.0.0.1:27017/frootfast
```

3. **Initialize SuperAdmin**
```bash
npm run setup
```

4. **Start Server**
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Login
- **POST** `/api/login`
- **Body:**
```json
{
    "email": "",
    "password": ""
}
```

#### Logout
- **POST** `/api/logout`
- **Auth:** Required

### User Management

#### Create User (SuperAdmin Only)
- **POST** `/api/register`
- **Auth:** Required (SuperAdmin)
- **Body:**
```json
{
    "name": "Admin User",
    "email": "admin@example.com",
    "mobileNumber": "9876543210",
    "password": "Admin@123",
    "role": "admin",
    "outletId": "outlet_id_here"
}
```

#### Get All Users
- **GET** `/api/user`
- **Auth:** Required

#### Get User by ID
- **GET** `/api/user/:id`
- **Auth:** Required

#### Update User
- **PUT** `/api/user/:id`
- **Auth:** Required
- **Body:**
```json
{
    "name": "Updated Name",
    "email": "updated@example.com",
    "mobileNumber": "9876543211",
    "role": "admin",
    "outletId": "outlet_id_here",
    "status": true
}
```

#### Delete User
- **DELETE** `/api/user/:id`
- **Auth:** Required

#### Change Password
- **PUT** `/api/change-password`
- **Auth:** Required
- **Body:**
```json
{
    "currentPassword": "current_password_here",
    "newPassword": "new_password_here"
}
```

### Outlet Management

#### Create Outlet
- **POST** `/api/outlet`
- **Auth:** Required
- **Body:**
```json
{
    "name": "Downtown Store",
    "city": "New York"
}
```

#### Get All Outlets
- **GET** `/api/outlet`
- **Auth:** Required

#### Get Outlet by ID
- **GET** `/api/outlet/:id`
- **Auth:** Required

#### Update Outlet
- **PUT** `/api/outlet/:id`
- **Auth:** Required
- **Body:**
```json
{
    "name": "Updated Store Name",
    "city": "Updated City"
}
```

#### Delete Outlet
- **DELETE** `/api/outlet/:id`
- **Auth:** Required

### Event Management

#### Create Event (Public)
- **POST** `/api/event`
- **Auth:** Not Required
- **Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "feedback": "Great service!",
    "greetings": "Happy New Year!" // Optional
}
```

#### Get All Events
- **GET** `/api/event`
- **Auth:** Required

### Contact Us

#### Submit Contact Message (Public)
- **POST** `/api/contact`
- **Auth:** Not Required
- **Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "number": "9876543210",
    "message": "I need help with my order"
}
```

#### Get All Contact Messages (SuperAdmin Only)
- **GET** `/api/contact`
- **Auth:** Required (SuperAdmin)

### Reviews

#### Submit Review (Public)
- **POST** `/api/review`
- **Auth:** Not Required
- **Body:**
```json
{
    "name": "John Doe",
    "number": "9876543210",
    "rating": 5,
    "reviewText": "Excellent service and quality!"
}
```

#### Get All Reviews (SuperAdmin Only)
- **GET** `/api/review`
- **Auth:** Required (SuperAdmin)

### Finance Management (SuperAdmin Only)

#### Create Finance Record
- **POST** `/api/finance`
- **Auth:** Required (SuperAdmin)
- **Body:**
```json
{
    "name": "Office Supplies",
    "amount": 1500.50,
    "spendBy": "John Admin",
    "description": "Monthly office supplies purchase"
}
```

#### Get All Finance Records
- **GET** `/api/finance`
- **Auth:** Required (SuperAdmin)

#### Get Finance Record by ID
- **GET** `/api/finance/:id`
- **Auth:** Required (SuperAdmin)

#### Update Finance Record
- **PUT** `/api/finance/:id`
- **Auth:** Required (SuperAdmin)
- **Body:** Same as create

#### Delete Finance Record
- **DELETE** `/api/finance/:id`
- **Auth:** Required (SuperAdmin)

### Prebook

#### Create Prebook (Public)
- **POST** `/api/prebook`
- **Auth:** Not Required
- **Body:**
```json
{
    "name": "John Doe",
    "number": "9876543210",
    "boxType": "Large Box",
    "date": "2024-01-15",
    "outletId": "outlet_id_here"
}
```

#### Get All Prebooks
- **GET** `/api/prebook`
- **Auth:** Required

## API Documentation

Interactive API documentation available at:
- **Swagger UI**: `http://localhost:5000/api-docs`

## Authentication

All protected endpoints require Bearer token in header:
```
Authorization: Bearer <your_jwt_token>
```

## User Roles

- **SuperAdmin**: Can create users, manage all resources (only one allowed)
- **Admin**: Can manage outlets and events (mapped to specific outlet)

## Logging

- **Application Logs**: `logs/application-YYYY-MM-DD.log`
- **Access Logs**: `logs/access-YYYY-MM-DD.log`
- **Log Rotation**: Daily with 14-day retention

## File Upload

Static files served from `/uploads` directory with 20MB limit supporting:
- Images (jpeg, png, jpg, webp)
- Excel files
- CSV files
- ZIP files

## Error Handling

All endpoints return consistent error format:
```json
{
    "error": "Error message"
}
```

## Success Response Format

```json
{
    "status": true,
    "message": "Success message",
    "data": {}
}
```