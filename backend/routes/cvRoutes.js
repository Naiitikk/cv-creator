import express from 'express';
import {
  generateCVContent,
  generateCoverLetterContent,
} from '../controllers/cvController.js';

const router = express.Router();

router.post('/generate', generateCVContent);
router.post('/cover-letter', generateCoverLetterContent);

export default router;
