const request = require("request");
const apiToken =
  "nZiLs07nftjSPJ6h3dBiaCiw3cva+j3bSuxheEDuR9pY/aBNOjTyZudrKNqC5D0iRhibPzJwShaY49ltt4tFwIoWwnSTqfubvmkNFBUoFy3LOywILpbiBZBO2iCs5+mR5NfaD7cuG9MiIF50+u4cqAdB04t89/1O/w1cDnyilFU=";
const apiRoute = "https://api.line.me/v2/bot/message/reply";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};

class LineAPIService {
  constructor() {}

  reply(replyToken, messages) {
    return new Promise(function(resolve, reject) {
      try {
        let body = JSON.stringify({
          replyToken: replyToken,
          messages: messages
        });
        return request.post(
          {
            url: apiRoute,
            headers: headers,
            body: body
          },
          (err, res, body) => {
            console.log("status = " + res.statusCode);
            return resolve(res.statusCode);
          }
        );
      } catch (e) {
        return reject(e);
      }
    });
  }
}
module.exports = new LineAPIService();
