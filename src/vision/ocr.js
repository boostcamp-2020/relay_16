const request = require('request');
​
const callOCRAPI = function (imageurl, callback) {
    const sendData = {
        headers: {
            'Content-Type' : 'application/json',
            'X-OCR-SECRET' : 'aXFxelVqT3JnSHdtSFpIVkVianlsZGZ5dm9GQ0dUZXM='
        },
        url: 'https://5ae4d251b31a4dbfb8f0252852b2d6e5.apigw.ntruss.com/custom/v1/3373/5531832d937a4d5de975b1960a6c5bbc39d4200f4447978ac039fa1bf6e8c85d/general',
        body: JSON.stringify({
            "images": [
                {
                  "format": "png",
                  "name": "medium",
                  "data": null,
                  "url": imageurl
                }
              ],
              "lang": "ko",
              "requestId": "string",
              "resultType": "string",
              "timestamp": 0,
              "version": "V1"
        }),
    };
​
    request.post(sendData, (err, res, result) => {
        callback(res, JSON.parse(result));
    })
};
