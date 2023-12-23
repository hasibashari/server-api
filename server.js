const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Gunakan cors middleware
app.use(cors());
// middleware
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

// Ambil data pengguna
app.get('/api/users', (req, res) => {
   // Baca file products.json
   fs.readFile('products.json', 'utf8', (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
      }

      // Parse data JSON
      const products = JSON.parse(data);

      // Kirim data sebagai respons
      res.json(products);
   });
});

// Ambil data pengguna berdasarkan ID
app.get('/api/users/:id', (req, res) => {
   // Baca file products.json
   fs.readFile('products.json', 'utf8', (err, data) => {
      if (err) {
         console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
         return;
      }

      // Parse data JSON
      const jsonData = JSON.parse(data);

      // Dapatkan ID dari parameter URL
      const id = parseInt(req.params.id);

      // Cari pengguna berdasarkan ID
      const user = jsonData.data.find(user => user.id === id);

      // Pastikan pengguna ditemukan
      if (!user) {
         res.status(404).json({ error: 'User not found' });
         return;
      }

      // Kirim data sebagai respons
      res.json(user);
   });
});



// Jalankan server
app.listen(port, () => {
   console.log(`Server berjalan di http://localhost:${port}`);
});


