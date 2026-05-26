const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper function to check if a number is prime
const isPrime = (num) => {
    const n = parseInt(num);
    if (isNaN(n) || n <= 1) return false;
    for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
        if (n % i === 0) return false;
    }
    return true;
};

/**
 * GET /
 * Root route to prevent Cannot GET / error
 */
app.get('/', (req, res) => {
    res.status(200).json({
        message: "BFHL API is running. Access the API at /bfhl"
    });
});

/**
 * GET /bfhl
 * Returns the operation code
 */
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

/**
 * POST /bfhl
 * Processes data array and optional base64 file
 */
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        const numbers = [];
        const alphabets = [];
        let is_prime_found = false;
        
        // Process data array
        if (Array.isArray(data)) {
            data.forEach(item => {
                const strItem = String(item);
                if (/^\d+$/.test(strItem)) {
                    numbers.push(strItem);
                    if (isPrime(strItem)) {
                        is_prime_found = true;
                    }
                } else if (/^[a-zA-Z]$/.test(strItem)) {
                    alphabets.push(strItem);
                }
            });
        }

        // Find highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
        const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 
            ? [lowercaseAlphabets.sort().reverse()[0]] 
            : [];

        // File handling
        let file_valid = false;
        let file_mime_type = "";
        let file_size_kb = "";

        if (file_b64) {
            try {
                // Check if it's a data URI (e.g., data:image/png;base64,...)
                const dataUriMatch = file_b64.match(/^data:(.+);base64,(.+)$/);
                
                let base64Content = file_b64;
                if (dataUriMatch) {
                    file_mime_type = dataUriMatch[1];
                    base64Content = dataUriMatch[2];
                }

                const buffer = Buffer.from(base64Content, 'base64');
                
                if (buffer.length > 0) {
                    file_valid = true;
                    file_size_kb = (buffer.length / 1024).toFixed(2);
                    
                    if (!file_mime_type) {
                        file_mime_type = "application/octet-stream";
                    }
                }
            } catch (err) {
                file_valid = false;
            }
        }

        // Response
        res.status(200).json({
            is_success: true,
            user_id: "Anshika_Jain_01062004",
            email: "anshikajain230895@acropolis.in",
            roll_number: "0827AL231027",
            numbers,
            alphabets,
            highest_lowercase_alphabet,
            is_prime_found,
            file_valid,
            file_mime_type,
            file_size_kb
        });

    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Internal Server Error"
        });
    }
});

// Start server locally if not in serverless environment
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
