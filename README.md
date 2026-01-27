# 🖥️ Smart Door Lock - Node.js Server

Backend server untuk sistem Smart Door Lock yang terhubung dengan ESP32/RFID dan aplikasi Flutter.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 📋 Fitur

- 📡 Menerima data dari ESP32 (RFID tag & status pintu)
- 🗄️ Menyimpan data ke MongoDB Atlas
- 🔐 Autentikasi user (login/register)
- 🔔 Integrasi Firebase Cloud Messaging
- 🔊 Kontrol buzzer alarm

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js v18+
- npm
- MongoDB Atlas account

### Instalasi

```bash
# Clone repository
git clone https://github.com/dikag0d/nodeserver.git
cd nodeserver

# Install dependencies
npm install

# Buat file .env
touch .env
```

### Konfigurasi Environment

Buat file `.env` dengan isi:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartdoorlock
PORT=3000
```

### Jalankan Server

```bash
# Mode development
npm start

# Server akan berjalan di http://localhost:3000
```

## 📡 API Endpoints

### Root
```
GET /
```
Response: `🚀 Node.js + MongoDB Server is running on Render 🧠✨`

---

### Menerima Data dari ESP32
```
POST /esp-data
Content-Type: application/json

{
  "rfid_tag": "ABC12345",
  "status": "Pintu Terbuka"
}
```

---

### Ambil Semua Data Aktivitas
```
GET /data
```

Response:
```json
[
  {
    "_id": "...",
    "rfid_tag": "ABC12345",
    "status": "Pintu Terbuka",
    "timestamp": "2026-01-27T01:30:00.000Z"
  }
]
```

---

### Login User
```
POST /login
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

---

### Register User
```
POST /register
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

---

### Update Mode Monitoring
```
POST /mode
Content-Type: application/json

{
  "inRoom": true
}
```

---

### Aktifkan Buzzer
```
POST /buzzer/on
```

---

### Simpan FCM Token
```
POST /token
Content-Type: application/json

{
  "token": "fcm_token_string"
}
```

## 🏗️ Struktur Proyek

```
nodeserver/
├── server.js         # Entry point & semua routes
├── package.json      # Dependencies
├── .env              # Environment variables (buat sendiri)
└── .gitignore        # Ignore node_modules & .env
```

## 🔧 Dependencies

| Package | Versi | Fungsi |
|---------|-------|--------|
| express | ^4.18.2 | Web framework |
| mongoose | ^8.19.1 | MongoDB ODM |
| body-parser | ^1.20.3 | Parse request body |
| cors | ^2.8.5 | Cross-origin requests |
| dotenv | - | Environment variables |

## 🌐 Deployment

Server ini di-deploy di **Render**. URL produksi:
```
https://doorlockapi.loca.lt
```

## 📱 Aplikasi Terkait

- **Flutter App**: [github.com/dikag0d/smartdoorlock](https://github.com/dikag0d/smartdoorlock)

## 👥 Tim Pengembang

**DHEA SYSTEMS**
Andika Nugraha
Anggoro Redi Saputro
Nathaniel Eden Amory
Muhammad Hisyam Arrafi
---

⭐ Jangan lupa beri bintang jika proyek ini membantu!
