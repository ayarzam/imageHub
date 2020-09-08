const multer = require('multer');
// const upload = multer({storage: storage})
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './client/public/uploads')

    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer({
  storage: storage,
  limits: {
    // files: 5, // allow up to 5 files per request,
    fieldSize: 2 * 1024 * 1024, // 2 MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    // allow images only
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      return cb(null, true);
    } else {
      cb(new Error('Only image are allowed.'), false);
    }
  },
});

module.exports = upload;
