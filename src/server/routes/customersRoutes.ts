
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'customers';

// Read customers overview statistics
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

// Read customers by activeTrend
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

// Read customers by activeStatus
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/activity`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read customers by ageRange
router.get('/', async (req, res) => {
    const { institutionCode } = req.query;

    const response = await apiClient.get(
        `/${controller}/by-age-range`,
        {
            params: {
                institution_code: institutionCode
            }
        }
    );

    res.json(response.data);
});

// Read customers by category
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/by-category`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});


// Read customers by product
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/by-product`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read customers by gender
router.get('/', async (req, res) => {
    const { institutionCode } = req.query;

    const response = await apiClient.get(
        `/${controller}/gender-mix`,
        {
            params: {
                institution_code: institutionCode
            }
        }
    );

    res.json(response.data);
});

// Read customers by newTrend
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/new-trend`,
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
