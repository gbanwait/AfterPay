/** 
 * AfterPay sendbox api call
*/
const fetch = require('node-fetch');

function postData(data, callback) {
    return fetch('https://api.us-sandbox.afterpay.com/v1/orders', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic MTAwMTAwMTgzOjU3NDA0MWZkNzc1ODhjNTNiNDQ5ZGFiYjM5NWExODg1OWRjYjJiYzg5YzdiMDNhMWNhY2VlZWI0OTdjNzU5NTE1MzU2MzIwZWYwZTUzYzE2N2IyMmYyZDBiYzMyNTg4ODVhODAwNzQ4OGE3MDUwMWY5ZDgwYjc5NDQ1OWQwNzE1'
        }
    }).then(response => response.json())
    .then(json => callback(json))
    .catch(err => callback(err));
}

function buildPayload (card, address) {
    return {
        "totalAmount": {  
            "amount": "37.00",
            "currency": "USD"
         },
         "consumer": {  
            "phoneNumber": "2120000000",
            "givenNames": "Joe",
            "surname": "Consumer",
            "email": "test@afterpay.com"
         },
        "billing": {  
            "name": card.name,
            "line1": address.line1,
            "state": address.state,
            "postcode": address.zip,
            "countryCode": "US",
            "phoneNumber": "2120000000"
        },
        "shipping": {  
            "name": card.name,
            "line1": address.line1,
            "state": address.state,
            "postcode": address.zip,
            "countryCode": "US",
            "phoneNumber": "2120000000"
        },
        "items":[  
             {
                 "name": "T-Shirt",
                 "sku": "12341234",
                 "quantity": 1,
                 "price": {
                     "amount": "10.00",
                     "currency": "USD"
                 }
             },
             {
                 "name": "Jeans",
                 "sku": "12341235",
                 "quantity": 1,
                 "price": {
                     "amount": "20.00",
                     "currency": "USD"
                 }
             }
         ],
         "discounts": [
            {
                "displayName": "10% Off Subtotal",
                "amount": {
                    "amount": "3.00",
                    "currency": "USD"
                }
            }
         ],
         "merchant": {
            "redirectConfirmUrl": "https://www.merchant.com/confirm",
            "redirectCancelUrl": "https://www.merchant.com/cancel"
         },
         "merchantReference": "merchantOrder-1234",
         "taxAmount": {  
            "amount": "0.00",
            "currency": "USD"
         },
         "shippingAmount": {  
             "amount": "10.00",
             "currency": "USD"
         }
    }
}

module.exports = {
    postData: postData,
    buildPayload: buildPayload
}