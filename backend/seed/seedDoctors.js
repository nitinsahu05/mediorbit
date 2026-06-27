import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import doctorModel from '../models/doctorModel.js'

dotenv.config({ path: '../.env' })

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'appointy' })
    console.log('Database Connected')
}

const doctors = [
    {
        name: 'Dr. Rahul Sharma',
        email: 'rahul.sharma@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '5 Years',
        about: 'Dr. Rahul Sharma is a dedicated general physician with expertise in preventive care, chronic disease management, and acute illness treatment. He believes in a patient-centered approach and is committed to delivering high-quality, compassionate care.',
        fees: 500,
        address: { line1: 'Apollo Hospital, Sector 26', line2: 'New Delhi, Delhi - 110001' },
    },
    {
        name: 'Dr. Priya Mehta',
        email: 'priya.mehta@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (OBG)',
        experience: '8 Years',
        about: 'Dr. Priya Mehta is a highly experienced gynecologist specializing in women\'s health, prenatal care, and minimally invasive surgeries. She is passionate about empowering women with knowledge about their health.',
        fees: 700,
        address: { line1: 'Fortis Hospital, Bannerghatta Road', line2: 'Bengaluru, Karnataka - 560076' },
    },
    {
        name: 'Dr. Arjun Patel',
        email: 'arjun.patel@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '6 Years',
        about: 'Dr. Arjun Patel is a skilled dermatologist with expertise in treating acne, eczema, psoriasis, and cosmetic skin conditions. He uses the latest techniques to provide effective and personalized skincare solutions.',
        fees: 600,
        address: { line1: 'Max Healthcare, Patparganj', line2: 'New Delhi, Delhi - 110092' },
    },
    {
        name: 'Dr. Sneha Iyer',
        email: 'sneha.iyer@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/female-doctor-white-coat-stethoscope_144627-43847.jpg',
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '7 Years',
        about: 'Dr. Sneha Iyer is a compassionate pediatrician who specializes in child development, immunizations, and treatment of childhood diseases. She creates a friendly environment to make children feel comfortable.',
        fees: 550,
        address: { line1: 'Rainbow Children\'s Hospital, Banjara Hills', line2: 'Hyderabad, Telangana - 500034' },
    },
    {
        name: 'Dr. Vikram Singh',
        email: 'vikram.singh@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148452701.jpg',
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '10 Years',
        about: 'Dr. Vikram Singh is an expert neurologist specializing in epilepsy, stroke, migraines, and neurodegenerative disorders. He combines clinical excellence with cutting-edge research to deliver the best outcomes for his patients.',
        fees: 900,
        address: { line1: 'NIMHANS, Hosur Road', line2: 'Bengaluru, Karnataka - 560029' },
    },
    {
        name: 'Dr. Anjali Desai',
        email: 'anjali.desai@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '9 Years',
        about: 'Dr. Anjali Desai is a renowned gastroenterologist with expertise in treating digestive disorders, liver diseases, and performing advanced endoscopic procedures. She focuses on holistic gut health management.',
        fees: 800,
        address: { line1: 'Kokilaben Hospital, Andheri West', line2: 'Mumbai, Maharashtra - 400053' },
    },
    {
        name: 'Dr. Rohan Gupta',
        email: 'rohan.gupta@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/doctor-standing-with-folder-stethoscope_1291-16.jpg',
        speciality: 'General physician',
        degree: 'MBBS, DNB (General Medicine)',
        experience: '4 Years',
        about: 'Dr. Rohan Gupta is a general physician committed to providing comprehensive primary healthcare. He specializes in managing lifestyle diseases, respiratory conditions, and providing preventive health guidance.',
        fees: 450,
        address: { line1: 'Medanta Hospital, Sector 38', line2: 'Gurugram, Haryana - 122001' },
    },
    {
        name: 'Dr. Kavya Reddy',
        email: 'kavya.reddy@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg',
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Obstetrics & Gynaecology)',
        experience: '6 Years',
        about: 'Dr. Kavya Reddy is a skilled gynecologist dedicated to women\'s reproductive health. She has extensive experience in high-risk pregnancies, infertility treatments, and laparoscopic surgeries.',
        fees: 650,
        address: { line1: 'Care Hospital, Banjara Hills', line2: 'Hyderabad, Telangana - 500034' },
    },
    {
        name: 'Dr. Aditya Kumar',
        email: 'aditya.kumar@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/handsome-doctor-against-white-background_1194-1.jpg',
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM (Neurology)',
        experience: '12 Years',
        about: 'Dr. Aditya Kumar is a senior neurologist with over 12 years of experience in treating complex neurological conditions. His areas of expertise include Parkinson\'s disease, multiple sclerosis, and headache disorders.',
        fees: 1000,
        address: { line1: 'AIIMS, Ansari Nagar', line2: 'New Delhi, Delhi - 110029' },
    },
    {
        name: 'Dr. Meera Nair',
        email: 'meera.nair@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
        speciality: 'Dermatologist',
        degree: 'MBBS, DVD (Dermatology)',
        experience: '5 Years',
        about: 'Dr. Meera Nair is a passionate dermatologist specializing in cosmetic dermatology, hair loss treatments, and skin infections. She is known for her gentle approach and effective treatment plans.',
        fees: 550,
        address: { line1: 'Manipal Hospital, Old Airport Road', line2: 'Bengaluru, Karnataka - 560017' },
    },
    {
        name: 'Dr. Suresh Babu',
        email: 'suresh.babu@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/front-view-doctor-with-stethoscope_23-2148790563.jpg',
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD, DM (Gastroenterology)',
        experience: '15 Years',
        about: 'Dr. Suresh Babu is a highly experienced gastroenterologist known for his expertise in inflammatory bowel disease, hepatology, and complex GI procedures. He has treated thousands of patients with gastrointestinal disorders.',
        fees: 900,
        address: { line1: 'Global Hospital, Perumbakkam', line2: 'Chennai, Tamil Nadu - 600100' },
    },
    {
        name: 'Dr. Pooja Verma',
        email: 'pooja.verma@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg',
        speciality: 'Pediatricians',
        degree: 'MBBS, DCH, MD (Pediatrics)',
        experience: '8 Years',
        about: 'Dr. Pooja Verma is a dedicated pediatrician with special interest in neonatal care, child nutrition, and developmental pediatrics. She is known for her warm and caring approach towards children and their parents.',
        fees: 600,
        address: { line1: 'Cloudnine Hospital, Malviya Nagar', line2: 'New Delhi, Delhi - 110017' },
    },
    {
        name: 'Dr. Sanjay Mishra',
        email: 'sanjay.mishra@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg',
        speciality: 'General physician',
        degree: 'MBBS, MD (Internal Medicine)',
        experience: '11 Years',
        about: 'Dr. Sanjay Mishra is an experienced internal medicine specialist with deep expertise in diabetes, hypertension, and thyroid disorders. He is committed to providing personalized and evidence-based care.',
        fees: 600,
        address: { line1: 'Tata Main Hospital, Bistupur', line2: 'Jamshedpur, Jharkhand - 831001' },
    },
    {
        name: 'Dr. Nisha Kapoor',
        email: 'nisha.kapoor@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/young-female-doctor-wearing-white-coat-using-tablet_93675-131072.jpg',
        speciality: 'Neurologist',
        degree: 'MBBS, MD, DM (Neurology)',
        experience: '7 Years',
        about: 'Dr. Nisha Kapoor is a neurologist with expertise in pediatric neurology, epilepsy management, and neuromuscular disorders. She is dedicated to improving quality of life for patients with neurological conditions.',
        fees: 850,
        address: { line1: 'Wockhardt Hospital, Mira Road', line2: 'Mumbai, Maharashtra - 401107' },
    },
    {
        name: 'Dr. Ravi Shankar',
        email: 'ravi.shankar@mediorbit.com',
        password: 'Doctor1234',
        image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg',
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Medicine), DM (Gastro)',
        experience: '13 Years',
        about: 'Dr. Ravi Shankar is a senior gastroenterologist with extensive experience in advanced therapeutic endoscopy, ERCP, and liver transplant workup. He is regarded as one of the top gastroenterologists in the country.',
        fees: 950,
        address: { line1: 'PGIMER, Sector 12', line2: 'Chandigarh - 160012' },
    },
]

const seedDoctors = async () => {
    try {
        await connectDB()

        let added = 0
        let skipped = 0

        for (const doc of doctors) {
            const exists = await doctorModel.findOne({ email: doc.email })
            if (exists) {
                console.log(`⏭️  Skipped (already exists): ${doc.name}`)
                skipped++
                continue
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(doc.password, salt)

            await doctorModel.create({
                ...doc,
                password: hashedPassword,
                date: Date.now(),
            })

            console.log(`✅ Added: ${doc.name} (${doc.speciality})`)
            added++
        }

        console.log(`\n🎉 Done! Added: ${added}, Skipped: ${skipped}`)
        process.exit(0)
    } catch (error) {
        console.error('❌ Seed error:', error.message)
        process.exit(1)
    }
}

seedDoctors()
