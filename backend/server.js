import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import doctorModel from './models/doctorModel.js'

// app config
const app = express()
const port = process.env.PORT || 4000

const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET']
for (const name of requiredEnvs) {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name}`)
    process.exit(1)
  }
}

const seedDefaultDoctor = async () => {
  try {
    const defaultEmail = 'doctor@mediorbit.com'
    const existing = await doctorModel.findOne({ email: defaultEmail })
    if (existing) return

    const hashedPassword = await bcrypt.hash('Doctor1234', 10)
    const newDoctor = new doctorModel({
      name: 'Default Doctor',
      email: defaultEmail,
      password: hashedPassword,
      image: 'https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png',
      speciality: 'General physician',
      degree: 'MBBS',
      experience: '5 Years',
      about: 'Default doctor account for initial login.',
      fees: 100,
      address: { line1: '123 Main Street', line2: 'City Center' },
      date: Date.now(),
    })
    await newDoctor.save()
    console.log('Default doctor account created: doctor@mediorbit.com / Doctor1234')
  } catch (error) {
    console.error('Default doctor seed error:', error)
  }
}

// Connect to database (CALL THE FUNCTION)
await connectDB()
await seedDefaultDoctor()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working")
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (state === 1) {
    res.send('Database is connected');
  } else {
    res.status(500).send('Database is NOT connected');
  }
});


app.listen(port, () => console.log(`Server started on PORT:${port}`))
