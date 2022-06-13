import multer from 'multer';
import storage from '../utils/storage.js';
const upload = multer({ storage: storage });

export default upload;
