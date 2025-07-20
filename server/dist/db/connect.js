// src/db/connect.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
const envPathConnect = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPathConnect });
export const connectToMongo = async () => {
    try {
        console.log('--- Environment Variables Loaded in connect.ts ---');
        console.log('Current Working Directory (CWD):', process.cwd());
        console.log('Path to .env:', envPathConnect);
        console.log('MONGO_URI:', process.env.MONGO_URI);
        console.log('--- End Environment Variables ---');
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            console.error('❌ MONGO_URI is not defined.');
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI, {
            // אפשרות שימושית במונגוס:
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB successfully');
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        if (error.code) {
            console.error(`Error Code: ${error.code}, Syscall: ${error.syscall}, Hostname: ${error.hostname}`);
        }
        process.exit(1);
    }
};
