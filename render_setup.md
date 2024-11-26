# Render.com Deployment Guide

## Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign Up"
3. Choose "Sign up with GitHub"
4. Authorize Render to access your GitHub

## Step 2: Create New Web Service
1. Once logged in, click "New +" in the top right
2. Select "Web Service"
3. Find and select your `device-control-server` repository
4. Click "Connect"

## Step 3: Configure Web Service
Fill in these settings:
- **Name**: `device-control-server`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: Free

## Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (about 2-3 minutes)
3. You'll get a URL like: `https://device-control-server-xxxx.onrender.com`

## Step 5: Verify Deployment
1. Click the generated URL
2. You should see the server information
3. Test the `/health` endpoint by adding `/health` to the URL

## Step 6: Update Your Apps
Update the WebSocket URL in your Android apps:
1. Controller App: Change `wss://device-control-server.glitch.me` to your new Render URL
2. Target App: Do the same update

## Troubleshooting
- If deployment fails, check the logs in Render dashboard
- Make sure all dependencies are in package.json
- Verify that server.js is in the root directory
- Check if the port is being set from process.env.PORT

## Notes
- Your free instance will sleep after 15 minutes of inactivity
- It will wake up automatically when receiving a request
- You get 750 hours of runtime per month free
