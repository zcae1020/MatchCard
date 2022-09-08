import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
const router = express.Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const view = path.join(__dirname+'/../view')

router.get('/', (req, res) => {
  res.sendFile(path.join(view+'/index.html'))
})

export default router