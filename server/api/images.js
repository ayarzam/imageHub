const express = require('express');
const router = express.Router();
const { Image } = require('../db/models');
const upload = require('../multer/config')
const morgan = require('morgan');

module.exports = router;

router.use(morgan('dev'));

/*
upload a single image to the database
*/
router.post('/add', upload.single('photo'), async(req, res) => {
  try {
      const singlePhoto = req.file;
      req.body.name = req.file.filename
      req.body.picture = req.file.path

      // make sure file is available
      if (!singlePhoto) {
          res.status(400).send({
              status: false,
              data: 'No file is selected.'
          });
      } else {
          // send response
        const newSingleImage = await Image.create({
        name: req.body.name,
        picture: req.body.picture })
          res.json({
              status: true,
              message: 'File is uploaded.',
              newSingleImage,
              data: {
                  name: singlePhoto.originalname,
                  mimetype: singlePhoto.mimetype,
                  size: singlePhoto.size,
                  path: singlePhoto.path
              }
          });
      }

  } catch (err) {
      res.status(500).send(err);
  }
});

/*
upload a specific number of photos to the database
*/
router.post('/add', upload.array('photos', 8), async(req, res) => {
  try {
      const photos = req.files;

      // check if photos are available
      if (photos.length === 0) {
          res.status(400).send({
              status: false,
              data: 'No photo is selected.'
          });
      } else {
        let success = true;

        for (let photo of photos) {
            // req.body.name = photos.filename
            // req.body.picture = photos.path
            const newImages = await Image.create({
                name: photo.filename,
                picture: photo.path
            });
            if (!newImages){
                success = false; //signals an error occured
                break;
            }
        }

        if (success) {
            res.send({
                status: true,
                message: 'Photos are uploaded.',
                photos
            });
        }
        else {
            throw new Error('No new Images added in the multi-add API call.');
        } 
      }

  } catch (err) {
      res.status(500).send(err);
  }
});
/*
Upload an unlimited number of photos to the database
*/
router.post('/add', upload.any('photos'), async(req, res) => {
    try {
        const photos = req.files;
        console.log(photos)
  
        // check if photos are available
        if (photos.length === 0) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let success = true;

            for (let photo of photos) {
                // req.body.name = photos.filename
                // req.body.picture = photos.path
                const newImages = await Image.create({
                    name: photo.filename,
                    picture: photo.path
                });
                if (!newImages){
                    success = false; //signals an error occured
                    break;
                }
            }

            if (success) {
                res.send({
                    status: true,
                    message: 'Photos are uploaded.',
                    photos
                });
            }
            else {
                throw new Error('No new Images added in the add-any API call.');
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
  });
router.get('/', async(req, res, next) => {
  try {
    const allImages = await Image.findAll(req.params)
    res.json(allImages)
  } catch (error) {
    console.log('error getting all images: ', error)
    next(error)
  }
})

router.delete('/', async(req, res, next) => {
   try {
       await Image.destroy(req.params.id)
       
   } catch (error) {
       console.log('problem in the delete route: ', error)
   }
})
