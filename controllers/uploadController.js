// controllers/uploadController.js
const pool = require('../config/database');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp and original filename
    }
});

const upload = multer({ storage });

// File Upload Handler
exports.uploadFile = [
    upload.single('file'), // Use multer to handle single file uploads
    async (req, res) => {
        const { userId } = req.body; // Assume userId is sent in the request body
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const id = uuidv4();
            const filePath = path.join(__dirname, '../uploads/', file.filename);
            const filename = file.filename;
            const timestamp = new Date();

            // Insert file information into the database
            await pool.query(
                'INSERT INTO files (id, filename, filepath, timestamp, userid) VALUES ($1, $2, $3, $4, $5)',
                [id, filename, filePath, timestamp, userId]
            );

            res.json({ message: 'File uploaded successfully', fileId: id });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
];
