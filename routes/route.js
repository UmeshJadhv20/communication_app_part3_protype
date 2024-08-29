const express = require('express');
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);


router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

router.get('/get_auth_user', authMiddleware, userController.getUserByToken);

router.post('/chats', authMiddleware, chatController.saveChatMessage);
router.get('/chats', authMiddleware, chatController.getChatMessages);

router.post('/upload', uploadController.uploadFile);


module.exports = router;
