const express = require('express');
const router = express.Router();

const { getTransactions, addTransactions, deleteTransactions } = require('../controllers/transactions');


// Get
router
    .route('/')
    .get(getTransactions);

    
// Add
router
    .route('/')
    .post(addTransactions);


// Delete
router
    .route('/:id')
    .delete(deleteTransactions);

module.exports = router;