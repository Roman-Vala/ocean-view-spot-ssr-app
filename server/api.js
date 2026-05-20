import express from 'express'
const router = express.Router();

import getCollections from './endpoints/getCollections.js';
import getHeroImages from './endpoints/getHeroImages.js';
import getItemsByCategoryOrTag from './endpoints/getItemsByCategoryOrTag.js';
import getItemById from './endpoints/getItemById.js';
import getCategoryItems from './endpoints/getCategoryItems.js';
import createCheckout from './endpoints/createCheckout.js';
import getOrderStatus from './endpoints/getOrderStatus.js';
import getSiteMeta from './endpoints/getSiteMeta.js';

router.get('/collections', getCollections);
router.get('/hero', getHeroImages);
router.get('/site-meta', getSiteMeta);
router.get('/items', getItemsByCategoryOrTag);
router.get('/category-items/:categoryId', getCategoryItems);
router.get('/items/:itemId', getItemById);
router.post('/create-checkout', createCheckout);
router.get('/order-status', getOrderStatus);


export default router
