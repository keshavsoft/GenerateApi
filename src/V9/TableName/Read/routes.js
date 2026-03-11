import express from 'express';

var router = express.Router();

import {
    postFilterDataFromBodyFunc
} from './controller.js';

router.get('/', postFilterDataFromBodyFunc);

export { router };