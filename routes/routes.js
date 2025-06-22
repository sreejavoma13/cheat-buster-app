import express from 'express'
const router = express.Router();
import searchUser from '../controllers/controller.js';


router.get('/search', userController.searchUser);

export default router
