import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js"
import { isCloudinaryEnabled } from "../config/cloudinary.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const email = req.body.email?.toString().trim().toLowerCase() || ''
        const password = req.body.password?.toString().trim() || ''

        const adminEmail = (process.env.ADMIN_EMAIL || 'nitinforget333@gmail.com').toString().trim().toLowerCase()
        const adminPassword = (process.env.ADMIN_PASSWORD || 'admin123').toString().trim()

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
        const { name, email, password, speciality, degree, experience, about, fees, address, image } = req.body;
    const imageFile = req.file;

        const normalizedEmail = email?.toString().trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        if (!imageFile && !image) {
            return res.status(400).json({ success: false, message: "Doctor image is required" });
        }

        let imageUrl = "";

        if (imageFile) {
            if (!isCloudinaryEnabled()) {
                return res.status(400).json({
                    success: false,
                    message: "File upload is disabled. Please use image URL field.",
                });
            }

            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                imageUrl = imageUpload.secure_url;
            } catch (uploadError) {
                return res.status(500).json({
                    success: false,
                    message: "Cloudinary upload failed. Configure Cloudinary credentials or use Image URL field in admin panel.",
                });
            }
        } else if (typeof image === "string" && validator.isURL(image, { require_protocol: true })) {
            imageUrl = image;
        } else {
            return res.status(400).json({ success: false, message: "Invalid image URL" });
        }

        let parsedAddress = address;
        if (typeof address === "string") {
            parsedAddress = JSON.parse(address);
        }

    const doctorData = {
      name,
      email: normalizedEmail,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({ success: true, message: "Doctor Added" });

  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}