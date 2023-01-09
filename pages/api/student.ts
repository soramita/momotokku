import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  fs.readFile('./json/student.json', 'utf-8', (err, data) => {
    res.status(200).json({
      code: 200,
      msg: 'success',
      data: JSON.parse(data),
    });
  });
}
