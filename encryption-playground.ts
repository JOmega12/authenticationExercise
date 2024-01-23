import bcrypt from 'bcrypt';

const jonsHashPassword = '$2b$11$14yR7xG49nZKGIQP8eeL5eSqb/jxOXYq7M1zoRWbZ14vbp5PG/rrS';
const peterHashPassword = '$2b$11$rVADpA8BUADSoVtnp0eZD.VsKpEkW7ojsu8e.Jstt8wPP6mQQc3g.';


// const password = 'password';
// console.log('starting')
// bcrypt.hash(password, 11).then((result) => {
//    console.log('done');
//    console.log({ result })
// })


bcrypt.compare(
   "peter_password",
   peterHashPassword
).then((result) => {
   console.log({result: result})
})