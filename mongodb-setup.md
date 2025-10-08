# MongoDB Setup for Deployment

## Option 1: MongoDB Atlas (Recommended for Production)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace in environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecoexchange
   ```

## Option 2: Local MongoDB (for testing)

If you want to test with local MongoDB first:
```
MONGODB_URI=mongodb://localhost:27017/ecoexchange
```

## JWT Secret

Generate a strong JWT secret:
```
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-12345
```
