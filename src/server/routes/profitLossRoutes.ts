
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'profit-loss';

// Read profit-loss by trend
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/trend`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read profit-loss overview
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/overview`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

export default router;
