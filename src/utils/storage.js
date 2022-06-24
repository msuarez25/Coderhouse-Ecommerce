import path from 'path';
import multer from 'multer';

const FILE_TYPE_MAP = {
  // mime type
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/uploads');
  },
  filename: (req, file, cb) => {
    const filename =
      file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log(filename);
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, filename);
  },
});

export default storage;
