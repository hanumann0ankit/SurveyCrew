const mongoose = require('mongoose')

const connectDB =  async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected with HOST: ${conn.connection.host}`)
    }
    catch(e)
    {
        console.error(`Error connecting to MONGODB: ${e}`);
    }
}

module.exports = connectDB