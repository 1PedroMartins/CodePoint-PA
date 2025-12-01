const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/criarUser', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/email/:email', userController.getUserByEmail);
router.get('/cargo/:cargo', userController.getUsersByCargo);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;