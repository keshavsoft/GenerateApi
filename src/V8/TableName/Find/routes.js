import express from 'express';

var router = express.Router();

import {
    postFilterDataFromBodyFunc
} from './controller.js';

router.get('/:inPk', postFilterDataFromBodyFunc);

export { router };