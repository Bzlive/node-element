const express = require('express');
const router = express.Router();
const User = require('../controller/user')

router.get('/list', User.list);
router.post('/add', User.add);
router.put('/edit', User.edit);
router.delete('/del', User.del);

module.exports = router;