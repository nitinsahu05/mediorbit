// Medical Chatbot - Predefined Responses

export const BOT_NAME = 'MediBot'

export const WELCOME_MESSAGE = `Hi! I'm **MediBot** 👋, your personal health assistant.

I can help you with:
- 🩺 Common symptoms & what they mean
- 💊 General medicine info
- 📅 How to book appointments
- 🏥 Specialist recommendations
- 🚑 Emergency guidance

What can I help you with today?`

// Keywords → Response mapping
export const responses = [

  // ─── BOOKING / APP RELATED ───────────────────────────────────────────
  {
    keywords: ['book', 'appointment', 'schedule', 'slot', 'doctor book', 'appoint'],
    response: `To book an appointment:\n1. Go to **Doctors** page\n2. Select your preferred doctor\n3. Choose a date & time slot\n4. Click **Proceed to Pay**\n5. Complete payment via Razorpay\n\nYour appointment will be confirmed instantly! ✅`,
  },
  {
    keywords: ['cancel', 'cancellation', 'cancel appointment'],
    response: `To cancel an appointment:\n1. Go to **My Appointments**\n2. Find the appointment\n3. Click **Cancel Appointment**\n\n⚠️ Please cancel at least 2 hours before your scheduled time.`,
  },
  {
    keywords: ['payment', 'pay', 'razorpay', 'fees', 'cost', 'charge', 'price'],
    response: `We accept payments via **Razorpay** which supports:\n- 💳 Credit / Debit Cards\n- 📱 UPI (GPay, PhonePe, Paytm)\n- 🏦 Net Banking\n- 👛 Wallets\n\nPayment is collected at the time of booking. Consultation fees vary by doctor.`,
  },
  {
    keywords: ['refund', 'money back', 'reimbursement'],
    response: `Refund Policy:\n- Cancellations made **24+ hours** before appointment: Full refund\n- Cancellations within **24 hours**: 50% refund\n- No-show: No refund\n\nRefunds are processed within 5-7 business days. 💰`,
  },

  // ─── SYMPTOMS ────────────────────────────────────────────────────────
  {
    keywords: ['fever', 'temperature', 'high temp', 'bukhar'],
    response: `**Fever** (temperature above 38°C / 100.4°F):\n\n✅ Home care:\n- Rest and stay hydrated\n- Take paracetamol (as directed)\n- Use a cool, damp cloth on forehead\n\n🚨 See a doctor if:\n- Fever exceeds 103°F (39.4°C)\n- Lasts more than 3 days\n- Accompanied by rash, stiff neck, or difficulty breathing\n\nShall I help you book a **General Physician**?`,
  },
  {
    keywords: ['headache', 'head pain', 'migraine', 'sir dard'],
    response: `**Headache / Migraine:**\n\n✅ Home remedies:\n- Rest in a quiet, dark room\n- Stay hydrated\n- Apply cold/warm compress\n- Take OTC pain relievers (ibuprofen/paracetamol)\n\n🚨 Seek immediate care if:\n- Sudden severe "thunderclap" headache\n- Headache with fever + stiff neck\n- After a head injury\n- Vision changes or confusion\n\nFor recurring migraines, consult a **Neurologist**.`,
  },
  {
    keywords: ['cough', 'cold', 'sore throat', 'runny nose', 'sneezing', 'khansi'],
    response: `**Cold & Cough:**\n\n✅ Home care:\n- Rest and drink warm fluids\n- Honey + ginger tea helps\n- Steam inhalation for congestion\n- Gargle with warm salt water for sore throat\n\n🚨 See a doctor if:\n- Cough lasts more than 2 weeks\n- Coughing up blood\n- High fever with cough\n- Difficulty breathing\n\nShall I book a **General Physician** for you?`,
  },
  {
    keywords: ['chest pain', 'chest', 'heart pain', 'seene mein dard'],
    response: `⚠️ **Chest Pain — Take Seriously!**\n\n🚨 **Call emergency (112) immediately if:**\n- Crushing/squeezing chest pain\n- Pain spreading to arm, jaw, or back\n- Shortness of breath + sweating\n- These could be signs of a **heart attack**\n\nFor non-emergency chest discomfort (acid reflux, muscle pain), consult a **Cardiologist** or **General Physician**.`,
  },
  {
    keywords: ['stomach', 'stomach pain', 'abdominal', 'abdomen', 'pet dard', 'nausea', 'vomiting', 'ulti'],
    response: `**Stomach Pain / Nausea:**\n\n✅ Home care:\n- Eat light, bland foods (rice, toast, bananas)\n- Stay hydrated with ORS or clear fluids\n- Avoid spicy/oily food\n- Rest\n\n🚨 See a doctor if:\n- Severe or persistent pain (>24 hrs)\n- Blood in vomit or stool\n- High fever with stomach pain\n- Signs of dehydration\n\nConsult a **Gastroenterologist** for chronic issues.`,
  },
  {
    keywords: ['back pain', 'backache', 'spine', 'kamar dard'],
    response: `**Back Pain:**\n\n✅ Home care:\n- Rest but stay gently active\n- Apply ice (first 48 hrs) then heat\n- OTC pain relievers (ibuprofen)\n- Gentle stretching\n\n🚨 See a doctor if:\n- Pain radiates down the leg (sciatica)\n- Numbness or weakness in legs\n- Pain after injury\n- Bladder/bowel problems\n\nConsult an **Orthopedic** specialist for chronic back pain.`,
  },
  {
    keywords: ['skin', 'rash', 'itching', 'allergy', 'khujli', 'acne', 'pimple'],
    response: `**Skin Issues:**\n\n✅ General tips:\n- Keep skin clean and moisturized\n- Avoid known allergens\n- Use mild, fragrance-free products\n- Don't scratch rashes\n\n🚨 See a doctor if:\n- Rash spreads rapidly\n- Accompanied by fever or difficulty breathing\n- Painful blisters or open sores\n- Doesn't improve in 1 week\n\nConsult a **Dermatologist** for skin conditions.`,
  },
  {
    keywords: ['diabetes', 'sugar', 'blood sugar', 'insulin', 'diabetic'],
    response: `**Diabetes Management:**\n\n📋 Key tips:\n- Monitor blood sugar regularly\n- Follow a low-sugar, high-fiber diet\n- Exercise 30 mins daily\n- Take medications as prescribed\n- Regular HbA1c tests every 3 months\n\n⚠️ Warning signs of low blood sugar:\n- Dizziness, sweating, confusion → Eat sugar immediately\n\nConsult an **Endocrinologist** or **Diabetologist** for management.`,
  },
  {
    keywords: ['blood pressure', 'bp', 'hypertension', 'high bp', 'low bp'],
    response: `**Blood Pressure:**\n\nNormal: **120/80 mmHg**\nHigh (Hypertension): >140/90\nLow (Hypotension): <90/60\n\n✅ Tips to manage BP:\n- Reduce salt intake\n- Exercise regularly\n- Avoid smoking & alcohol\n- Manage stress\n- Take prescribed medications\n\n🚨 Emergency if BP >180/120 with headache/chest pain — call 112!\n\nConsult a **Cardiologist** for BP management.`,
  },
  {
    keywords: ['anxiety', 'stress', 'depression', 'mental health', 'tension', 'panic', 'sad', 'mood'],
    response: `**Mental Health Support:**\n\nYou're not alone. Mental health is just as important as physical health. 💙\n\n✅ Self-care tips:\n- Talk to someone you trust\n- Practice deep breathing / meditation\n- Regular exercise helps\n- Maintain a sleep schedule\n- Limit social media\n\n🆘 If you're in crisis, call **iCall: 9152987821** (India)\n\nConsult a **Psychiatrist** or **Psychologist** — there's no shame in seeking help.`,
  },
  {
    keywords: ['sleep', 'insomnia', 'neend', 'cant sleep', 'sleepless'],
    response: `**Sleep Problems / Insomnia:**\n\n✅ Sleep hygiene tips:\n- Stick to a fixed sleep schedule\n- Avoid screens 1 hour before bed\n- Keep bedroom cool and dark\n- Avoid caffeine after 3 PM\n- Try relaxation techniques\n\n🚨 See a doctor if:\n- Insomnia lasts more than 3 weeks\n- Excessive daytime sleepiness\n- Snoring + gasping (sleep apnea)\n\nConsult a **Neurologist** or **General Physician**.`,
  },
  {
    keywords: ['eye', 'vision', 'blur', 'eyes', 'aankh'],
    response: `**Eye Problems:**\n\n✅ Common issues:\n- **Dry eyes**: Use lubricating eye drops\n- **Eye strain**: Follow 20-20-20 rule (every 20 min, look 20 ft away for 20 sec)\n- **Redness**: Avoid rubbing, use clean water\n\n🚨 See a doctor immediately if:\n- Sudden vision loss\n- Eye injury\n- Severe pain or light sensitivity\n- Flashes or floaters\n\nConsult an **Ophthalmologist** for eye care.`,
  },
  {
    keywords: ['child', 'baby', 'infant', 'kids', 'paediatric', 'pediatric', 'bachha'],
    response: `**Child Health:**\n\n📋 Common concerns:\n- **Fever in infants <3 months**: Always see a doctor immediately\n- **Vaccinations**: Keep up with immunization schedule\n- **Growth**: Regular checkups with a pediatrician\n\n🚨 Emergency signs in children:\n- Difficulty breathing\n- Unresponsive or limp\n- Seizures\n- High fever with rash\n\nConsult a **Pediatrician** for child health concerns.`,
  },
  {
    keywords: ['pregnant', 'pregnancy', 'garbhavati', 'maternity', 'prenatal'],
    response: `**Pregnancy Care:**\n\n📋 Important tips:\n- Regular prenatal checkups\n- Take folic acid supplements\n- Eat a balanced, nutritious diet\n- Avoid alcohol, smoking, raw fish\n- Stay gently active (walking, prenatal yoga)\n\n🚨 See a doctor immediately if:\n- Heavy bleeding\n- Severe abdominal pain\n- Reduced fetal movement\n- Signs of preeclampsia (severe headache, swelling)\n\nConsult a **Gynecologist / Obstetrician**.`,
  },

  // ─── SPECIALISTS ─────────────────────────────────────────────────────
  {
    keywords: ['specialist', 'which doctor', 'which specialist', 'kaunsa doctor', 'doctor type'],
    response: `**Which Specialist to See?**\n\n🫀 **Cardiologist** — Heart & BP issues\n🧠 **Neurologist** — Brain, nerves, headaches\n🦴 **Orthopedic** — Bones, joints, back pain\n🍽️ **Gastroenterologist** — Stomach & digestion\n👶 **Pediatrician** — Children's health\n🌸 **Gynecologist** — Women's health\n🧬 **Endocrinologist** — Diabetes, thyroid\n🔬 **Dermatologist** — Skin conditions\n👁️ **Ophthalmologist** — Eye problems\n🧘 **Psychiatrist** — Mental health\n\nNot sure? Start with a **General Physician**.`,
  },

  // ─── EMERGENCY ───────────────────────────────────────────────────────
  {
    keywords: ['emergency', 'urgent', 'ambulance', 'help', '112', 'critical'],
    response: `🚨 **EMERGENCY CONTACTS (India)**\n\n🚑 **Ambulance**: 108\n🚒 **Fire**: 101\n👮 **Police**: 100\n📞 **All Emergency**: 112\n💙 **Mental Health Crisis**: 9152987821\n\n**Go to nearest emergency room immediately for:**\n- Chest pain / Heart attack symptoms\n- Stroke (face drooping, arm weakness, speech difficulty)\n- Severe breathing difficulty\n- Unconsciousness\n- Severe bleeding`,
  },

  // ─── GREETINGS ───────────────────────────────────────────────────────
  {
    keywords: ['hello', 'hi', 'hey', 'hii', 'namaste', 'helo', 'good morning', 'good evening', 'good afternoon'],
    response: `Hello! 👋 I'm **MediBot**, your health assistant.\n\nHow can I help you today? You can ask me about:\n- Symptoms & health tips\n- Which doctor to see\n- How to book an appointment\n- Emergency contacts`,
  },
  {
    keywords: ['thank', 'thanks', 'thankyou', 'thank you', 'shukriya', 'dhanyawad'],
    response: `You're welcome! 😊 Take care of your health.\n\nIf you need anything else, I'm always here. Stay healthy! 💙`,
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'alvida', 'ok bye'],
    response: `Goodbye! 👋 Stay healthy and take care.\n\nRemember — your health is your greatest wealth! 💙`,
  },
  {
    keywords: ['who are you', 'what are you', 'your name', 'about you', 'medibot'],
    response: `I'm **MediBot** 🤖 — an AI-powered health assistant for **MediOrbit**.\n\nI provide:\n- General health information\n- Symptom guidance\n- Doctor recommendations\n- Appointment help\n\n⚠️ I'm not a substitute for professional medical advice. Always consult a qualified doctor for diagnosis and treatment.`,
  },
]

// Default fallback response
export const DEFAULT_RESPONSE = `I'm not sure about that. 🤔\n\nI can help you with:\n- 🩺 Symptoms (fever, headache, cough, etc.)\n- 💊 Health tips\n- 📅 Booking appointments\n- 🏥 Finding the right specialist\n- 🚑 Emergency contacts\n\nTry asking something like *"I have a fever"* or *"How to book an appointment?"*`

// Quick suggestion chips
export const QUICK_SUGGESTIONS = [
  '🤒 I have a fever',
  '🤕 Headache help',
  '📅 Book appointment',
  '🏥 Which specialist?',
  '🚑 Emergency contacts',
  '💳 Payment info',
]
