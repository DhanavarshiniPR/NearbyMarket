# EcoExchange Deployment Guide

## Prerequisites

1. **MongoDB Database**: You'll need a MongoDB database. You can use:
   - MongoDB Atlas (cloud): https://www.mongodb.com/atlas
   - Local MongoDB instance

2. **Environment Variables**: Set up the following environment variables in your deployment platform:

### Backend Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecoexchange
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

## Deployment Steps

### 1. Deploy Backend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `DhanavarshiniPR/NearbyMarket`
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. Add environment variables (see above)
6. Deploy

### 2. Deploy Frontend to Vercel

1. Create another Vercel project
2. Import the same GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add environment variables:
   - `VITE_API_URL`: Your backend URL + `/api`
5. Deploy

### 3. Update Configuration

After both deployments:
1. Copy your frontend URL
2. Update the backend's `FRONTEND_URL` environment variable
3. Redeploy the backend

## Local Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## Production URLs

- Frontend: `https://your-frontend-project.vercel.app`
- Backend API: `https://your-backend-project.vercel.app/api`
