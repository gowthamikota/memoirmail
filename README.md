# Digital Time Capsule

A web application that allows users to create digital time capsules with messages and media, set delivery dates, and receive them via email when the time comes.

## Features

- User authentication (register/login)
- Create time capsules with text messages and media
- Set future delivery dates
- View and manage your time capsules
- Automatic email delivery on the specified date
- Responsive design for all devices

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Axios
- date-fns

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digital-time-capsule.git
cd digital-time-capsule
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/time-capsule
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

5. Start the development servers:

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
digital-time-capsule/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       └── App.js         # Main application component
├── server/                 # Node.js backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Time Capsules
- GET /api/capsules - Get all user's time capsules
- POST /api/capsules - Create a new time capsule
- GET /api/capsules/:id - Get a single time capsule
- PUT /api/capsules/:id - Update a time capsule
- DELETE /api/capsules/:id - Delete a time capsule

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 