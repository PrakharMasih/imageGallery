const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageController = require('../controller/imageController');
const checkAuth = require('../middleware/checkAuth');


router.get('/',checkAuth, imageController.getAllImage );

router.get('/:id', checkAuth, imageController.imageViews );

router.post('/',checkAuth, upload.single('image'), imageController.createImage );

router.delete('/:id',checkAuth, imageController.deleteImage );


module.exports = router;