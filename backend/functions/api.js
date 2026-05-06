const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const FileType = require('file-type');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

function isPrime(numStr) {
    const num = parseInt(numStr);
    if (isNaN(num) || num <= 1) return false;
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

router.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

router.post('/bfhl', async (req, res) => {
    try {
        const { data, file_b64 } = req.body;
        if (!Array.isArray(data)) return res.status(400).json({ is_success: false, message: "Invalid input" });

        const numbers = [];
        const alphabets = [];
        let highest_lowercase = "";
        let primeFound = false;

        data.forEach(item => {
            const strItem = String(item);
            if (/^\d+$/.test(strItem)) {
                numbers.push(strItem);
                if (isPrime(strItem)) primeFound = true;
            } else if (strItem.length === 1 && /[a-zA-Z]/.test(strItem)) {
                alphabets.push(strItem);
                if (/[a-z]/.test(strItem)) {
                    if (!highest_lowercase || strItem > highest_lowercase) highest_lowercase = strItem;
                }
            }
        });

        let fileValid = false, fileMime = "", fileSizeKb = "";
        if (file_b64) {
            try {
                const buffer = Buffer.from(file_b64, 'base64');
                fileSizeKb = (buffer.length / 1024).toFixed(2);
                const type = await FileType.fromBuffer(buffer);
                if (type) { fileValid = true; fileMime = type.mime; }
            } catch (err) {}
        }

        res.json({
            is_success: true,
            user_id: "Anshika_Jain_01062004",
            email: "anshikajain230895@acropolis.in",
            roll_number: "0827AL231027",
            numbers, alphabets,
            highest_lowercase_alphabet: highest_lowercase ? [highest_lowercase] : [],
            is_prime_found: primeFound,
            file_valid: fileValid,
            file_mime_type: fileMime,
            file_size_kb: fileSizeKb
        });
    } catch (error) {
        res.status(500).json({ is_success: false });
    }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
