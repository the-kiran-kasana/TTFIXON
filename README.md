# TTFixon – On-Demand Service Booking Platform 🚀

**TTFixon** is an on-demand service booking platform designed to make it easier for users to find and book service providers based on their location.
The application allows users to browse available services, find service providers operating in their area, select a suitable provider, schedule a service, and complete the booking through an online payment system.
The project was developed to provide a simple and convenient service-booking experience while giving service providers and administrators tools to manage bookings and services.


## 🌐 Live Website

     https://ttfixon.in/

### 🎯 Core Objectives

- Make local service booking simple and convenient.
- Connect customers with available service providers.
- Provide location-based service discovery.
- Allow users to schedule and manage bookings.
- Support secure online payments.
- Provide an administration interface for managing the platform.


## 📌 Features

- User registration and authentication
- Browse available services
- Location-based service provider discovery
- Service provider availability
- Online service booking
- Booking management
- Razorpay payment integration
- Admin dashboard
- REST API integration
- Responsive user interface
- Database management with MongoDB



  

## 🛠️ Tech Stack

### Frontend : Next.js ,React.js ,JavaScript ,HTML5 ,CSS3, Axios
### Backend : Node.js ,Express.js, REST APIs
### Database: MongoDB
### Payment : Razorpay
### Tools :Git,GitHub ,Postman ,VS Code


## 🔐 Security

Authentication and authorization
Environment variables for sensitive credentials
Backend-side payment verification
API validation
Protected routes
Secure database access


🚧 Challenges

      One of the main technical challenges was implementing the complete booking and payment flow. The frontend had to communicate with the backend APIs, create the booking, initiate the Razorpay payment, verify the payment response, and update the booking status correctly.Another challenge was handling location-based service provider availability while keeping the user experience simple and responsive.


###📈 Future Improvements

Real-time booking status
Real-time notifications
Service provider mobile application
Ratings and reviews
Online chat between users and service providers
Advanced search and filtering
Improved location-based matching
Payment history
Analytics and reporting


🚀 Setup & Installation

1. Clone the Repository
2. git clone <https://github.com/the-kiran-kasana/TTFIXON/>
3. cd TTFixon
4. cd frontend
5. npm install
7. cd backend
8. npm install

▶️ Running the Project
               
    npm run dev
## 📂 Project Structure

      TTFixon/
      │
      ├── frontend/
      │   ├── components/
      │   ├── pages/
      │   ├── services/
      │   ├── hooks/
      │   └── ...
      │
      ├── backend/
      │   ├── controllers/
      │   ├── models/
      │   ├── routes/
      │   ├── middleware/
      │   ├── services/
      │   └── ...
      │
      ├── README.md
      └── package.json



## 🏗️ Application Flow

```text
User
  │
  ▼
Browse Services
  │
  ▼
Select Service
  │
  ▼
Find Available Service Providers
  │
  ▼
Choose Date / Time
  │
  ▼
Create Booking
  │
  ▼
Razorpay Payment
  │
  ▼
Booking Confirmation


