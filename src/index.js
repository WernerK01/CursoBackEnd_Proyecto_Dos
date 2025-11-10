import express from "express";
import session from 'express-session'
import connectMongo from 'connect-mongo'
import 'dotenv/config';
import passport from './config/passport.js';

import { router as sessionRouter } from "./routes/session.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: connectMongo.create({ mongoUrl: process.env.MONGO_URL, dbName: process.env.MONGO_DB_NAME, ttl: 3600 }),
}));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/api/sessions', sessionRouter);

const connectToDatabase = async () => {
    try {
        const mongoose = await import('mongoose');
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.MONGO_DB_NAME
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

await connectToDatabase();