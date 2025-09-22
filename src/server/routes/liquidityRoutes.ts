
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'liquidity';

// Read liquidity overview statistics
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

// Read liquidity by inflowOutflowPerformance
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/inflow-outflow-performance`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read liquidity by cashBalance
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/cash-balance`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read liquidity by channel
router.get('/', async (req, res) => {
    const { institutionCode } = req.query;

    const response = await apiClient.get(
        `/${controller}/by-channel`,
        {
            params: {
                institution_code: institutionCode
            }
        }
    );

    res.json(response.data);
});

// Read liquidity by volumeByChannel
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/volume-by-channel`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});


// Read liquidity by depositBase
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/deposit-base`,
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
