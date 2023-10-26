const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("asd123", salt);
console.log(bcrypt.compareSync("asd123", hash));