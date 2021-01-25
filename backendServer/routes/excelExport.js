const express = require('express')
const router = express.Router()
const fs = require('fs');
const moment = require('moment');
const ExcelJs = require('exceljs');
const ShopInventoryModel = require('../models/ShopInventoryModel');
const { db } = require('../models/ShopInventoryModel');

const data = [{"_id":"600ee92e0dae8e189c0d06b4","Barcode":1323323,"Name":"dsfassfd","Quantity":2023,"Price":123,"__v":0},{"_id":"600ee93a0dae8e189c0d06b6","Barcode":32,"Name":"Cicolata","Quantity":2023,"Price":123,"__v":0},{"_id":"600ee9400dae8e189c0d06b7","Barcode":13,"Name":"Ciucalata","Quantity":2023,"Price":123,"__v":0}]

router.get('/excel', (req, res) => {

let workbook = new ExcelJs.Workbook();
let worksheet = workbook.addWorksheet('InventorySheet');
worksheet.columns = [
    {header: 'Barcode', key: 'Barcode'},
    {header: 'Product Name', key: 'Name'},
    {header: 'Quantitrey', key: 'Quantity'},
    {header: 'Price', key: 'Price'}
]; 

let count = 1;
data.forEach(data2=> {
    worksheet.addRow(data2);

})

worksheet.getRow(1).font = {bold: true}

const data1 = ShopInventoryModel.find();

workbook.xlsx.writeFile('Items.xlsx')
worksheet.addRows(data);

res.download('./Items.xlsx', 'Inventory.xlsx')
console.log('File downloaded')
});

module.exports = router;