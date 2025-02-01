import express from 'express';
const signupRoute = express.Router();

signupRoute.post('/',(req,res)=>{
  let ex = req.body;
  console.log('회원가입 버튼 클릭됨');
});

export default signupRoute;