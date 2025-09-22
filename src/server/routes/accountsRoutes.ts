
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'accounts';

// Read all newAccounts
router.get('/', async (_, res) => {
    const response = await apiClient.get(`/${controller}/new-accounts`);
    res.json({ ...response.data });
});

// Read accountsBalance by product
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;


    const response = await apiClient.get(
        `/${controller}/account-balance-by-product`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read accounts by activeTrend
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

// Read accounts by category
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;


    const response = await apiClient.get(
        `/${controller}/account-by-category`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read accounts by product
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/account-by-product`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read account overview
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/account-overview`,
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
