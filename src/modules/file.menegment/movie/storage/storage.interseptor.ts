import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const storagePoster = diskStorage({
  destination: './uploads/posters',
  filename: (req, file, cb) => {
    const fileName = uuidv4() + extname(file.originalname);
    cb(null, fileName);
  },
});

export const storageFile = diskStorage({
  destination: './uploads/files',
  filename(req, file, callback) {
    const newName = uuidv4() + extname(file.originalname);
    callback(null, newName);
  },
});
