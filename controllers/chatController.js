const pool = require('../config/database');

exports.saveChatMessage = async (req, res) => {
    const { user_id, message } = req.body; // Removed dateTime since it's set in the database
    
    try {
        // Corrected query and values to match the SQL placeholders
        const query = 'INSERT INTO chats (user_id, message, date_time) VALUES ($1, $2, now()) RETURNING *';
        const values = [user_id, message];
        const result = await pool.query(query, values);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error saving chat data:', error);
        res.status(500).json({ error: 'Failed to save chat data' });
    }
};

exports.getChatMessages = async (req, res) => {
    try {
        const result = await pool.query('SELECT c.*, u.name AS user FROM chats c LEFT JOIN users u ON c.user_id = u.id ORDER BY c.date_time DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching chat data:', error);
        res.status(500).json({ error: 'Failed to fetch chat data' });
    }
};
