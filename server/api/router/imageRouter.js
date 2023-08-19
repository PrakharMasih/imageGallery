const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageController = require('../controller/imageController')


router.get('/', imageController.getAllImage );

router.post('/', upload.single('image'), imageController.createImage );

router.delete('/:id', imageController.deleteImage );


module.exports = router;