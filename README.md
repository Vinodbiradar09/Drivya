🧭 Drivya — Driver-Rider Real-Time Booking App
Drivya is a full-stack real-time ride-hailing application designed for urban commuting. It includes:

Role-based users: Riders (“Users”) and service providers (“Captains”).

Real-time location tracking and ride assignment via Socket.IO.

Secure authentication using HTTP-only JWT-based cookies.

Geolocation and address autocomplete using Google Maps APIs.

Booking flow with OTP verification, fare preview, and captain assignment.

🚀 Features
Authentication

Register and login as User or Captain.

Secure storage of access and refresh tokens via HTTP-only cookies.

Ride Flow & OTP

User enters pickup and dropoff locations (autocomplete suggestions).

Preview fare before confirming.

OTP verification for ride acceptance.

Real-Time Captain Matching

Backend finds available Captains within radius using MongoDB geospatial queries (using Earth radius = 6371 km).

Each Captain receives a new-ride socket event instantly with ride details.

Ride Lifecycle

Captains accept rides (ride-confirmed) and service begins (start-ride).

Real-time location tracking via sockets.

Socket.IO Integration

Bi-directional real-time updates: both user and captain apps communicate via socket connections.

Captains emit location updates; Users receive ride status in real time.

Google Maps Integration

Autocomplete & geocoding on backend (using API key).

Frontend shows live location/route on map.

Clean Client-side State

React Context API used to store logged-in user/captain info without exposing tokens.

No token storage in localStorage or sessionStorage—better security.

🛠️ Tech Stack
Layer	Tech/Tools
Backend	Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT
Frontend	React, React Router, Context API, Axios, Google Maps API
Auth Strategy	HTTP-only Secure Cookies with Refresh rotation
Deployment	Vercel or Netlify (frontend), Heroku/Node on AWS/GCP
Maps & Geo	Google Places Autocomplete API, Geocoding API, Maps JavaScript API
Geospatial DB	MongoDB $geoWithin + $centerSphere with earth radius = 6371km


1. Clone Repository
bash
Copy
Edit
git clone https://github.com/Vinodbiradar09/Drivya.git
cd Drivya/backend
npm install
2. Backend Environment Variables
Create a .env file:

ini
Copy
Edit
PORT=4005
MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
GOOGLE_MAPS_API=your_google_api_key
NODE_ENV=development
3. Start Backend
bash
Copy
Edit
npm run dev
4. Frontend Setup
Open another terminal:

bash
Copy
Edit
cd ../frontend
npm install
Create .env:

ini
Copy
Edit
VITE_BASE_URL=http://localhost:4005
VITE_GOOGLE_MAPS_API_KEY=your_google_api_key
Then run:

bash
Copy
Edit
npm run dev
🧠 Application Flow
User Flow:
Register → Login → Backend sets secure cookies

Enter pickup & destination → Backend geocodes address

Preview fare → Confirm → Backend creates ride

Backend matches Captains via geospatial query → Socket sends new-ride to Captains

Captain accepts → OTP verifies → ride assigned → socket confirms ride to user

Captain Flow:
Register → Login → Backend sets secure cookies

Join via socket (join event) to store socketId

Send location updates (update-location-captain) → Backend stores geolocation

Receive new-ride → Accept → confirm ride via backend call

Ride started and tracked via live location updates

