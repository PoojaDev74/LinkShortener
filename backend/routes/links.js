const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/linksController');

router.post('/', ctrl.createLink);         // POST /api/links
router.get('/', ctrl.listLinks);           // GET /api/links
router.get('/:code', ctrl.getLink);        // GET /api/links/:code
router.delete('/:code', ctrl.deleteLink);  // DELETE /api/links/:code

module.exports = router;
