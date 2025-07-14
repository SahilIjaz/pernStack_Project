import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { arcjet } from './lib/arcJet.js';
const PORT = process.env.PORT || 3000;

dotenv.config();
const app= express();

app.use(helmet())
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


import { sql } from './config/db.js';

// app.use(async (req,res,next)=>{
//     try {
//         const decision = await arcjet.protect(req,
//             {
//                 requested:1
//             }
//         );

//         if(decision.isDenied){
//             if(decision.resason.isRateLimit()){
//             return res.status(429).json({message: 'Access denied'});
//         }else if(decision.reason.isBot()){
//             return res.status(403).json({message: 'Access denied for bots'});
//         }else{
//             return res.status(403).json({message: 'Access denied'});
//         }
//         return;
//     }

//     if(decision.result.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
//         return res.status(403).json({message: 'Access denied for spoofed bots'});
//     }
//     next();
//     } catch (error) {
//         console.error('Error in middleware ArcJet:', error);
//       next(error);
//     }
// })

import productRoutes from './routes/productRoutes.js';




app.use('/api/v1/products', productRoutes);


async function initDb() {
    try {
        await sql`
        create table if not exists products (
            id serial primary key,
            name varchar(255) not null,
            image varchar(255) not null,
            price decimal(10,2) not null,
            created_at timestamp default current_timestamp
            
        )
        `;
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
        console.log('ERRO SI : ',error)
        process.exit(1);
    }
    
}

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
});