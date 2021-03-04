import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const temFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  temFolder,
  uploadsFolder: path.resolve(temFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: temFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
