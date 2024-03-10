const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const bodyParser = require('body-parser');

// Configure AWS S3 (replace with your credentials)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Configure Multer for S3 storage
const multerS3 = require('multer-s3');
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // Replace with your bucket name
    acl: 'public-read', // Adjust access control as needed
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}-${file.originalname}`); // Custom filename format
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, and GIF images are allowed'));
    }
  },
});

// Body parser middleware for JSON requests
router.use(bodyParser.json());

// Existing code for page management (pageModel, etc.) remains the same

// Modified POST route for adding a page with photo upload
router.post("/add-page/", upload.single('Page_Photo'), (req, res) => {
  pageModel.findOne({ pageUrl: req.body.Page_Url })
    .then((existingPage) => {
      if (existingPage) {
        console.log('Your Url Duplicate, Please try another Url');
        res.redirect('/admin/page'); // Or provide a more specific error message
        return; // Exit if URL already exists
      }

      if (!req.file) {
        // Handle case where no photo is uploaded
        console.log('No photo uploaded');
        // Handle error or create page without a photo
        return;
      }

      const newPage = {
        pageUrl: req.body.Page_Url,
        // Other page details
        pagePhoto: req.file.location, // Use the uploaded image URL
      };

      pageModel.create(newPage)
        .then((createdPage) => {
          req.flash('success', 'Your Data is saved on Data Base');
          res.redirect('/admin/page/');
        })
        .catch((error) => {
          console.error('Error creating page:', error);
          res.status(500).send('Error creating page'); // Handle creation errors
        });
    })
    .catch((error) => {
      console.error('Error checking for existing page:', error);
      res.status(500).send('Error checking for existing page'); // Handle checking errors
    });
});

// Existing code for editing and deleting pages remains the same

module.exports = router;
