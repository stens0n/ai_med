// Add this at the top to load environment variables
require('dotenv').config();

const axios = require("axios");
const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a list of medical-related keywords
const medicalKeywords = [
    'abdominal pain',
    'acid reflux',
    'ankle pain',
    'anxiety',
    'back pain',
    'bloody stool',
    'body odor',
    'breast lump',
    'breast pain',
    'brittle hair',
    'broken nail',
    'bruising',
    'calf pain',
    'chest pain',
    'chest tightness',
    'chills',
    'chronic bad breath',
    'chronic cough',
    'chronic fatigue',
    'clay-colored stool',
    'cognitive impairment',
    'cold feet',
    'cold hands',
    'constipation',
    'cough',
    'cracked heels',
    'cracked lips',
    'dark urine',
    'delayed healing',
    'depression',
    'diarrhea',
    'difficulty concentrating',
    'difficulty sleeping',
    'difficulty swallowing',
    'difficulty urinating',
    'dizziness',
    'double vision',
    'dry eyes',
    'dry mouth',
    'dry skin',
    'ear discharge',
    'ear pain',
    'elbow pain',
    'excessive hunger',
    'excessive salivation',
    'excessive sweating',
    'excessive thirst',
    'eye pain',
    'eye twitching',
    'facial redness',
    'facial swelling',
    'fatigue',
    'fever',
    'finger pain',
    'flaky scalp',
    'foot odor',
    'foot pain',
    'frequent urination',
    'gas',
    'hair loss',
    'headache',
    'heel pain',
    'hives',
    'hoarseness',
    'hot flashes',
    'indigestion',
    'involuntary movement',
    'irritability',
    'itchy eyes',
    'joint pain',
    'knee pain',
    'leg cramps',
    'loss of appetite',
    'loss of balance',
    'loss of hair volume',
    'loss of smell',
    'loss of taste',
    'low libido',
    'memory loss',
    'migraine',
    'mood swings',
    'mouth sores',
    'muscle pain',
    'muscle weakness',
    'nail discoloration',
    'nail ridges',
    'nausea',
    'night sweats',
    'nosebleed',
    'numbness',
    'pale skin',
    'painful urination',
    'rash',
    'recurrent infections',
    'red eyes',
    'restlessness',
    'ringing in ears',
    'runny nose',
    'seeing spots',
    'sensitive teeth',
    'shaking',
    'shortness of breath',
    'shortness of breath at rest',
    'shoulder pain',
    'skin discoloration',
    'skin ulcers',
    'sleep apnea',
    'slurred speech',
    'sneezing',
    'snoring',
    'sore throat',
    'stiff neck',
    'stomach cramps',
    'stomach pain',
    'sudden hearing loss',
    'swollen ankles',
    'swollen feet',
    'swollen glands',
    'thumb pain',
    'tingling sensation',
    'tooth pain',
    'tooth sensitivity',
    'unexplained bruises',
    'unexplained itching',
    'unexplained weight gain',
    'unexplained weight loss',
    'visual floaters',
    'voice changes',
    'vomiting',
    'weak nails',
    'wrist pain',
    'yellow eyes',
    'yellow skin'
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