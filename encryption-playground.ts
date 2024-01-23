import bcrypt from 'bcrypt';

const password = 'password';


// console.log('starting')
// bcrypt.hash(password, 11).then((result) => {
//    console.log('done');
//    console.log({ result })
// })


bcrypt.compare(
   password,
   '$2b$11$CiTD0wObpDUH2MwwDdo0je3gsftzRGv.xE7X5g/2VG.saqB7.rB66'
).then((result) => {
   console.log({result: result})
})