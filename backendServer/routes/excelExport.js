const express = require('express')
const router = express.Router()
const fs = require('fs');
const moment = require('moment');
const ExcelJs = require('exceljs');
const ShopInventoryModel = require('../models/ShopInventoryModel');
const { db } = require('../models/ShopInventoryModel');

router.get('/excel', async (req, res) => {

let workbook = new ExcelJs.Workbook();
let worksheet = workbook.addWorksheet('InventorySheet');
worksheet.columns = [
    {header: 'Barcode', key: 'Barcode'},
    {header: 'Product Name', key: 'Name'},
    {header: 'Quantity', key: 'Quantity'},
    {header: 'Price', key: 'Price'}
]; 

const items = await ShopInventoryModel.find();
var products =[];
items.map(item => {
    let newItem ={
        Barcode: item.Barcode,
        Name: item.Name,
        Quantity: item.Quantity,
        Price: item.Price
    }
    products.push(newItem)
});

workbook.xlsx.writeFile('Items.xlsx')
worksheet.addRows(products);

res.download('./Items.xlsx', 'Inventory.xlsx')
console.log('File downloaded')
});

module.exports = router;