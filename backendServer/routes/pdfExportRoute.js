const express = require('express')
const router = express.Router()
const ShopInventoryModel = require('../models/ShopInventoryModel')
const path = require('path')
var pdf = require('html-pdf')

const options = {
    "format": "A4",
    "orientation": "landscape"
}

function createHTML(data){
    var HTMLtable = ''
    HTMLtable += "<table border='1' style='width:100%;word-break:break-word;'> <tr> <th>Barcode</th> <th>Name</th> <th>Quantity</th> <th>Price</th> </tr>";
    for(var i = 0; i < data.length; i++){
        HTMLtable += "<tr>";
        HTMLtable += "<td>" + data[i].Barcode + "</td>";
        HTMLtable += "<td>" + data[i].Name + "</td>";
        HTMLtable += "<td>" + data[i].Quantity + "</td>";
        HTMLtable += "<td>" + data[i].Price + "</td>";
        HTMLtable += "</tr>";
    }
    HTMLtable += "</table>";
    return HTMLtable;
}

router.get('/pdfexport', async (req, res) => {
        const items = await ShopInventoryModel.find()
        var products = []
        items.map(item => {
            let newItem = {
                Barcode : item.Barcode,
                Name : item.Name,
                Quantity : item.Quantity,
                Price : item.Price
            }
            products.push(newItem)
        })
        finalHTML = createHTML(products)
        pdf.create(finalHTML, options).toFile('./tmp/GeneratedReport.pdf', function(err, res){
            if(err) return console.log(err);
            console.log(res)
        })
        res.download('./tmp/GeneratedReport.pdf', 'GeneratedReport.pdf')
    })


module.exports = router;
