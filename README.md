# Device Control WebSocket Server

A WebSocket server for the Device Control application, enabling real-time communication between controller and target devices.

## Features

- Real-time WebSocket communication
- Client connection management
- Message broadcasting
- Connection health monitoring
- Automatic reconnection handling
- CORS enabled
- Health check endpoints

## Deployment Guide (Render.com)

1. Sign up at [Render.com](https://render.com) (No credit card required)

2. Create a new Web Service:
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the branch to deploy

3. Configure the service:
   - Name: `device-control-server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free

4. Environment Variables (optional):
   - `PORT`: Will be set automatically by Render

5. Click "Create Web Service"

Your server will be deployed at `https://device-control-server.onrender.com`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## API Endpoints

- `GET /`: Server information
- `GET /health`: Server health status
- `WSS /`: WebSocket endpoint

## WebSocket Events

- `CONNECTION_SUCCESS`: Sent when a client successfully connects
- `ERROR`: Sent when an error occurs processing a message

## Notes

- The free tier may have some limitations on bandwidth and uptime
- The server automatically handles disconnections and reconnections
- Includes ping-pong mechanism to keep connections alive
