// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();

// Пример данных транзакций (в реальной ситуации это должно быть из базы данных)
const transactions = [
  { id: 1, account: 'Argent Bank Checking', amount: -50, date: '2024-10-10' },
  { id: 2, account: 'Argent Bank Savings', amount: 1500, date: '2024-10-11' },
];

// Маршрут для получения всех транзакций
router.get('/', (req, res) => {
  res.json(transactions);
});

module.exports = router;


