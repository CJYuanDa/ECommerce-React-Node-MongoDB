const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

router.post('/', upload.single('product'), (req, res) => {
    try {
        const file = req.file;
        if (file) return res.status(200).json({
            message: 'Upload success',
            image_url: `http://localhost:${process.env.PORT || 4000}/images/${req.file.filename}`
        });
        throw new Error('Please select an image.');
    } catch (error) {
        return res.status(400).json({ message: `Upload failed. ${error}` });
    }
});


module.exports = router;