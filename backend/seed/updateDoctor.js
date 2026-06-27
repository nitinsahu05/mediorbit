import mongoose from 'mongoose'
import dotenv from 'dotenv'
import doctorModel from '../models/doctorModel.js'

dotenv.config({ path: '../.env' })

await mongoose.connect(process.env.MONGODB_URI, { dbName: 'appointy' })
console.log('Database Connected')

const result = await doctorModel.findOneAndUpdate(
    { email: 'suresh.babu@mediorbit.com' },
    { image: 'https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg' },
    { new: true }
)

if (result) {
    console.log(`✅ Photo updated: ${result.name}`)
} else {
    console.log('❌ Doctor not found')
}

process.exit(0)
