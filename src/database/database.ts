import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/authToken', {
    
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));