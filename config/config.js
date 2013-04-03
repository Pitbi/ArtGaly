var express    = require("express");
var MongoStore = require("connect-mongo")(express);

module.exports= {  
  sessions: {
    store: new MongoStore({db: "artgaly", url: "mongodb://artgaly:vcx522@ds057857.mongolab.com:57857/artgaly", collection: "sessions"}),
    secret: "qcnbpkczebhzkjvbzevnczveskfvkfvdvdfbvdf"
  },
  smtp: {
    user: "b272d948b50d5be07803c1b7479c0358",
    password: "4858cbda47cd534335ee5d243aed8336",
    host: "in.mailjet.com",
    sender: "Racely <noreply@racely.net>"
  }
};

