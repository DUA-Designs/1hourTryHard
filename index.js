const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const { spokeitDigitalSignature } = require('./src/documentmerge/merge-document-to-pdf');

const app = express();
const port = process.env.service_port || 8080;
const bodyParser = require('body-parser');
// const { uploadPdfToGCS } = require('./google-cloud/storage');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('This server is for spokeit.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.post('/document-generation', async (req, res) => {
//   const { name, signature, date } = req.body;

//   if (!name || !date) {
//     return res.status(400).send('Please provide all required fields');
//   }

//   try {
//     const pdfBuffer = await spokeitDigitalSignature({
//       user: {
//         Name: name,
//         Date: date,
//       },
//       photograph: signature,
//     });

//     const fileName = `${name}-${Date.now()}.pdf`;
//     const gcsUrl = await uploadPdfToGCS(pdfBuffer, fileName);

//     res.send(`Document generated and uploaded successfully to: ${gcsUrl}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error generating or uploading document');
//   }
// });

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});