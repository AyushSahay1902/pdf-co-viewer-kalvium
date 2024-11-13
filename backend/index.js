const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public folder
app.use(express.static('public'));

// Track current page to sync across viewers
let currentPage = 1;

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the current page to the newly connected user
    socket.emit('page-change', currentPage);

    // Listen for page change requests from the admin
    socket.on('change-page', (pageNumber) => {
        currentPage = pageNumber;
        io.emit('page-change', currentPage); // Broadcast the change to all users
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
