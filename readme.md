# Location Monitoring Project

## Overview

The **Location Monitoring** project tracks and displays the user's recent location history. The system consists of a **client** (frontend) and **server** (backend). The client allows users to view their location history, while the server handles data storage and user authentication.

---

## Features

- **Track User Location**: Continuously monitor and record the user’s geographical data (latitude and longitude).
- **Location History**: View the list of previously recorded locations with timestamps.
- **Authentication**: Use JWT tokens to securely authenticate users.
- **Responsive Design**: User-friendly and mobile-optimized frontend.

---

## Technologies Used

### Frontend:
- React.js
- HTML5 & CSS3
- React Router
- Axios or Fetch API

### Backend:
- Node.js
- Express
- MongoDB (for database storage)

### Geolocation API:
- Used for tracking the user's location.

---

## Installation

### For the Client (Frontend)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/location-monitoring.git

2. **Navigate to the Client Directory**:

    ```bash
    cd location-monitoring/client
    
3. **Install Dependencies**:

    ```bash
    npm install
4. Start the Client:


    ```bash
    npm start
This will start the development server on http://localhost:3000.


### For the Server (Backend)

1. **Clone the repository** (if not already cloned):

   ```bash
   git clone https://github.com/yourusername/location-monitoring.git

2. **Navigate to the Server Directory**:

   ```bash
    cd location-monitoring/server

3. **Create and Configure the .env File**:

Create a .env file in the server directory and add the following values:

env

    PORT=8000

    MONGO_URI=mongodb://localhost:27017

    CORS_ORIGIN=http://localhost:3000

    ACCESS_TOKEN_SECRET=4b88befdfd8f16f2beb1914fd6f0e2252fad4654a67b13b70052d5e2b7085c34
    ACCESS_TOKEN_EXPIRY=1d

    COOKIE_EXPIRE=1

4. **Install Dependencies**:

   ```bash
    npm install

5. **Start the Server**:

   ```bash
    npm run dev

### Admin Credentials for Testing

For testing purposes, the following **admin credentials** can be used:

- **Username**: `admin`
- **Password**: `123456`

**Note**: These credentials should only be used in a testing environment. Make sure to remove them from the source code before deploying to production.

---

### Important: Remove Hardcoded Credentials from Code

In the `server` folder, under `src/controllers/user.controller.js`, **lines 20 to 24** of the `register` controller contain hardcoded admin credentials, which should be removed before deployment.

Here’s what you should **remove** from the code:

```js
// In user.controller.js, lines 20 to 24 (do not deploy these hardcoded credentials):

    const admin = await User.exists({username:"admin"})
    if(!admin){
        const user = await User.create({ name:"ADMIN", username:"admin", password:"123456", role:"ADMIN" });
    }
