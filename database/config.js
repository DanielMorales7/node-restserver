import mongoose from "mongoose";

const dbConnection = async() =>{

    try {
        
        mongoose.set('strictQuery', false);
        const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
       });

       const url = `${db.connection.host}:${db.connection.port}`;
       
       console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD')
    }

}

export {dbConnection}