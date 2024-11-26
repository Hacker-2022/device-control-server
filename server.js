const express = require('express');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Store connected clients
const clients = new Map();

// Create HTTP server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create WebSocket server with ping-pong
const wss = new WebSocketServer({ server });

function heartbeat() {
    this.isAlive = true;
}

// Ping all clients every 30 seconds
const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            clients.delete(ws);
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);

// Handle WebSocket connections
wss.on('connection', (ws) => {
    const clientId = uuidv4();
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    
    clients.set(ws, { id: clientId });
    console.log(`Client connected: ${clientId}`);

    // Send initial connection success message
    ws.send(JSON.stringify({
        type: 'CONNECTION_SUCCESS',
        clientId: clientId
    }));

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            // Broadcast message to all other clients
            const messageStr = message.toString();
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === ws.OPEN) {
                    client.send(messageStr);
                }
            });
        } catch (error) {
            console.error('Error handling message:', error);
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Failed to process message'
            }));
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        const clientInfo = clients.get(ws);
        console.log(`Client disconnected: ${clientInfo?.id}`);
        clients.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        ws.close();
    });
});

wss.on('close', () => {
    clearInterval(interval);
});

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        connections: clients.size,
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Device Control WebSocket Server',
        status: 'running',
        connections: clients.size,
        endpoints: {
            health: '/health',
            websocket: 'ws://[host]:[port]'
        }
    });
});

// Error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
