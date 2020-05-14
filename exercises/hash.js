const bcrypt = require('bcrypt');

async function run() {
    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash('1234', salt)    
    console.log(salt);
    console.log(hashed);
}

run();