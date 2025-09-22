
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'fixed-deposits';

// Read fixed-deposits by activeTrend
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/active-trend`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read fixed-deposits by balance
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/balance`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read fixed-deposits by expense
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/expense`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read fixed-deposits overview
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/details`,
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
