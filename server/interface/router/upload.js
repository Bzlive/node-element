const express = require('express');
const router = express.Router();

router.post('/file', (req, res) => {
  console.log('%c [ req ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', req)
  res.send({
    code: 0,
    message: "操作成功",
    data: { src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' },
  })
});

module.exports = router;