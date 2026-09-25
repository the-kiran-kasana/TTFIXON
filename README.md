# TTFixon 🚀

TTFixon is an on-demand service booking platform that connects customers with available service providers based on their location. The platform allows users to browse services, find nearby service providers, book services, and make online payments.



## 🌐 Live Website

     https://ttfixon.in/

     

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


