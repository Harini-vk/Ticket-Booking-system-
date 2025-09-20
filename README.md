A React Native Expo app with Firebase backend for managing service tickets, designed for both Admins and Users.
The app allows users to create and view tickets, while admins can also update ticket status.

Admin role is made manually in firestore 

Features:
1. User Authentication : Role-based access control (user or admin) and Firebase Authentication
2. Ticket Management : Users can create tickets with title and description, Tickets are real-time synced from Firestore, Admins can update ticket status (Open → In Progress → Closed).
3. Role-based Access
4. Passwords are stored in Firebase Auth (not visible in Firestore).

Project Structure:

/src
  /screens
    LoginScreen.js
    TicketListScreen.js
    AddTicketScreen.js
  /firebaseConfig.js
App.js

Tech Stack:

Frontend: React Native + Expo + React Native Paper
Backend: Firebase Firestore + Firebase Authentication
Real-time updates: Firestore onSnapshot

