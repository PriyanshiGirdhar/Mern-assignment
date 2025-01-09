import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { taskRouter } from './routes/task.js';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');//call back on krne m bad dekhna ki on hu aya nhi 
});
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error); 
});


app.use("/api/auth", authRouter); //api - bridge between server and client  
app.use("/api", taskRouter);


app.listen(3001, () => {
    console.log('Server is running!');
})