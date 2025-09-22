
import express from 'express';
import { apiClient } from '../utils/apiClient';

const router = express.Router();
const controller = 'loans';

// Read loans overview statistics
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

// Read loans refinanced
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/refinanced`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read loans restructured
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/restructured`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read loans nplTrend
router.get('/', async (req, res) => {
    const { institutionCode } = req.query;

    const response = await apiClient.get(
        `/${controller}/npl-trend`,
        {
            params: {
                institution_code: institutionCode
            }
        }
    );

    res.json(response.data);
});

// Read performingLoanTrend
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/performing-loan-trend`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});


// Read loans productDistribution
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/product-distribution`,
        {
            params: {
                institution_code: institutionCode,
                period
            }
        }
    );

    res.json(response.data);
});

// Read loans outstanding
router.get('/', async (req, res) => {
    const { institutionCode } = req.query;

    const response = await apiClient.get(
        `/${controller}/outstanding`,
        {
            params: {
                institution_code: institutionCode
            }
        }
    );

    res.json(response.data);
});

// Read loans cbnCategory
router.get('/', async (req, res) => {
    const { institutionCode, period } = req.query;

    const response = await apiClient.get(
        `/${controller}/cbn-category`,
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
