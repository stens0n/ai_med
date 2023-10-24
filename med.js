// Add this at the top to load environment variables
require('dotenv').config();

const axios = require("axios");
const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000',  // replace with your frontend server
    optionsSuccessStatus: 204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a list of medical-related keywords
const medicalKeywords = [
    'abdominal pain',
    'acid reflux',
    'acne',
    'allergies',
    'ankle pain',
    'anxiety',
    'arthritis',
    'asthma',
    'athlete\'s foot',
    'back pain',
    'bad breath',
    'baldness',
    'bed sores',
    'bellyache',
    'bloating',
    'bloody nose',
    'bloody stool',
    'blurry vision',
    'body aches',
    'body odor',
    'breast lump',
    'breast pain',
    'brittle hair',
    'broken nail',
    'bruising',
    'burning sensation',
    'calf pain',
    'canker sores',
    'chest pain',
    'chest tightness',
    'chills',
    'chronic bad breath',
    'chronic cough',
    'chronic fatigue',
    'clay-colored stool',
    'cold sores',
    'cold sweats',
    'colds',
    'colic',
    'constipation',
    'cough',
    'cracked heels',
    'cracked lips',
    'cracked skin',
    'cramps',
    'dark circles',
    'dark urine',
    'delayed healing',
    'dental issues',
    'depression',
    'diabetes',
    'diarrhea',
    'dizziness',
    'double vision',
    'dry eyes',
    'dry mouth',
    'dry scalp',
    'dry skin',
    'dyspepsia',
    'ear infection',
    'ear pain',
    'ear ringing',
    'eczema',
    'elbow pain',
    'excessive hunger',
    'excessive salivation',
    'excessive sweating',
    'excessive thirst',
    'eye irritation',
    'eye pain',
    'eye redness',
    'eye twitching',
    'eyelid swelling',
    'facial redness',
    'facial swelling',
    'fatigue',
    'fever',
    'fever blisters',
    'finger pain',
    'flaky scalp',
    'flatulence',
    'flu symptoms',
    'foot odor',
    'foot pain',
    'frequent urination',
    'gas',
    'gastroenteritis',
    'genital warts',
    'gout',
    'gray hair',
    'gum bleeding',
    'gum pain',
    'hair loss',
    'hair thinning',
    'halitosis',
    'hand pain',
    'headache',
    'heart palpitations',
    'heartburn',
    'heel pain',
    'hemorrhoids',
    'hepatitis',
    'herpes',
    'hiccups',
    'high blood pressure',
    'hip pain',
    'hoarseness',
    'hot flashes',
    'hypertension',
    'hypotension',
    'impotence',
    'indigestion',
    'infections',
    'ingrown toenail',
    'insomnia',
    'intense itching',
    'irregular periods',
    'irritable bowel syndrome',
    'itching',
    'itchy eyes',
    'itchy scalp',
    'jaw pain',
    'joint pain',
    'kidney infection',
    'knee pain',
    'laryngitis',
    'leg cramps',
    'leg pain',
    'lesions',
    'lethargy',
    'liver problems',
    'loss of appetite',
    'loss of balance',
    'loss of hearing',
    'loss of smell',
    'loss of taste',
    'low energy',
    'low libido',
    'low mood',
    'lower back pain',
    'memory loss',
    'menstrual cramps',
    'migraine',
    'mood swings',
    'morning sickness',
    'mouth sores',
    'mouth ulcers',
    'muscle cramps',
    'muscle fatigue',
    'muscle pain',
    'muscle twitching',
    'muscle weakness',
    'nausea',
    'neck pain',
    'neck stiffness',
    'nerve pain',
    'night sweats',
    'nightmares',
    'nose bleeding',
    'nosebleeds',
    'numbness',
    'oral thrush',
    'overactive bladder',
    'pain during sex',
    'painful urination',
    'pale skin',
    'palpitations',
    'panic attacks',
    'peeling skin',
    'persistent cough',
    'persistent fatigue',
    'pharyngitis',
    'pink eye',
    'pins and needles',
    'plaque',
    'psoriasis',
    'puffy eyes',
    'rash',
    'rectal bleeding',
    'rectal pain',
    'red eyes',
    'red patches',
    'restless legs',
    'restlessness',
    'ringing in ears',
    'rosacea',
    'runny nose',
    'scalp itch',
    'scaly skin',
    'sciatica',
    'seeing spots',
    'sensitive teeth',
    'shaking',
    'shingles',
    'shortness of breath',
    'sinus congestion',
    'sinus pain',
    'sinusitis',
    'skin boils',
    'skin bumps',
    'skin cysts',
    'skin infection',
    'skin tags',
    'sleep apnea',
    'sleep disorders',
    'sleeplessness',
    'slurred speech',
    'snoring',
    'sore muscles',
    'sore throat',
    'stiff joints',
    'stiff neck',
    'stomach ache',
    'stomach cramps',
    'stomach pain',
    'stomach ulcers',
    'stress',
    'stuffy nose',
    'sudden hearing loss',
    'swelling',
    'swollen ankles',
    'swollen feet',
    'swollen glands',
    'swollen glands',
    'swollen lymph nodes',
    'swollen throat',
    'swollen tongue',
    'tachycardia',
    'teeth grinding',
    'temporomandibular joint disorder',
    'tennis elbow',
    'tension headache',
    'thinning hair',
    'thrush',
    'thyroid issues',
    'tinea',
    'tinnitus',
    'toe fungus',
    'tooth decay',
    'toothache',
    'torticollis',
    'tremors',
    'trigger finger',
    'ulcerative colitis',
    'underweight',
    'upper back pain',
    'urinary incontinence',
    'urinary tract infection',
    'uterine fibroids',
    'uti symptoms',
    'vaginal bleeding',
    'vaginal discharge',
    'vaginal itching',
    'vaginal odor',
    'varicose veins',
    'vertigo',
    'warts',
    'water retention',
    'watery eyes',
    'weakness',
    'wheezing',
    'white tongue',
    'whiplash',
    'wisdom teeth issues',
    'withdrawal symptoms',
    'wrinkles',
    'wrist strain',
    'yellow toenails',
    'yeast infection'
];


app.post("/ask", async (req, res) => {
    const userSymptoms = req.body.symptoms; // Expecting an array of symptoms from frontend

    // Check if any of the selected symptoms are in the medicalKeywords list
    const isMedicalQuery = userSymptoms.some(symptom => medicalKeywords.includes(symptom.toLowerCase()));

    if (isMedicalQuery) {
        // Construct the query
        const symptomsList = userSymptoms.join(", ");
        const prompt = `I'm feeling these medical symptoms: ${symptomsList}. Please give me advice on how to at least temporarily solve these symptoms`;

        try {
            const openaiResponse = await axios.post(
                "https://api.openai.com/v1/completions",
                {
                  model: 'text-davinci-002',
                  prompt: prompt,
                  max_tokens: 1000,
                },
                {
                  headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                  },
                }
            );
            
            let generatedText = openaiResponse.data.choices[0].text.trim();
                if (generatedText.startsWith('.')) {
                    generatedText = generatedText.substring(1).trim(); // Remove the leading period and re-trim
                }
            const medicalAdvice = `${openaiResponse.data.choices[0].text.trim()} It's best to talk to a medical professional about your concerns.`;
            res.status(200).json({ advice: medicalAdvice });
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    } else {
        res.status(200).json({ advice: "This AI only generates information on medical symptoms, please try again." });
    }
});
  
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});