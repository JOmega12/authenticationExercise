// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const testJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9uIiwiaWF0IjoxNzA2MTU1Njc4fQ.wfgAH8tSUNqPUXdBHPdoIHAtI0_Phmr23peK4RRsSOY';

const editedJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamltbXkiLCJpYXQiOjE3MDYxNTU2Nzh9.xzyEpiVOfs7NKDoohUnIENDEpLOIZLioNreg00-X3yQ'



// const data = {
//    name: 'jon',
// }

// const myJwt = jwt.sign(data, 'super-secret')
// console.log(myJwt)

// !you need the 'super-secret' token to be able to access the information in the JWt that has been encrypted 
const data = jwt.verify(editedJwt, 'super-secret');
console.log({data: data});


// *--------------
// const jonsHashPassword = '$2b$11$14yR7xG49nZKGIQP8eeL5eSqb/jxOXYq7M1zoRWbZ14vbp5PG/rrS';
// const peterHashPassword = '$2b$11$rVADpA8BUADSoVtnp0eZD.VsKpEkW7ojsu8e.Jstt8wPP6mQQc3g.';


// const password = 'password';
// console.log('starting')
// bcrypt.hash(password, 11).then((result) => {
//    console.log('done');
//    console.log({ result })
// })


// bcrypt.compare(
//    "peter_password",
//    peterHashPassword
// ).then((result) => {
//    console.log({result: result})
// })