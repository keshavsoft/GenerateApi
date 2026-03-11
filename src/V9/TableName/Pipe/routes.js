import express from 'express';

var router = express.Router();

import {
    postFilterDataFromBodyFunc
} from './controller.js';

router.post('/', postFilterDataFromBodyFunc);

export { router };