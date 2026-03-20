import express from 'express';
import bodyparser from "body-parser";

var router = express.Router();

import {
    GetFunc
} from './controller.js';

router.use(bodyparser.json());

router.get('/', GetFunc);

export { router };