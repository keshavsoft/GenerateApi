import express from 'express';
import bodyparser from "body-parser";

var router = express.Router();

import {
    GetMinFunc
} from './controller.js';

router.use(bodyparser.json());

router.get('/:columnName', GetMinFunc);

export { router };