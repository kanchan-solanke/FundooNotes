import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSend } from '../utils/mailsender';
//get all users
export const userlogin = async (body) => {
  const data = await User.findOne({ email: body.email });
  // return data;

  if (data == null) {
    throw new Error("User dosen't exist");
  } else {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      const token = jwt.sign({ "Id": data._id, "firstName": data.firstName, "email": data.email }, process.env.SECRET_KEY);
      console.log("token", token)
      return token;
    }
    else {
      throw new Error("Invalid Passowrd");
    }
  }
};

//create new user
export const newUser = async (body) => {
  console.log("Before hassing body:", body);
  const data1 = await User.findOne({ email: body.email });
  if (data1 != null) {
    throw new Error("User is already exist")
  }
  else {
    const saltRounds = 10;
  let hashPassword = await bcrypt.hash(body.password, saltRounds) 
  body.password = hashPassword;
  //console.log("After Hashing req body", body);
  const data = await User.create(body);
  return data;
  }

};



//findupdate emaild id and update but before update use hash password

export const forgetPassword = async (body) => {
    const data = await User.findOne({email: body.email })
    if(data != null){
      const token = jwt.sign({email:  data.email, id : data.id }, process.env.FORGET_KEY)
      const send = await mailSend(data.email, token)
      return send;
    }
      else{

  throw new Error('Email is not exist')

    }
}

export const resetPassword = async (body) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(body.password, saltRounds);
  console.log('Inside Service',body.password);
  body.password = hash;
    const data =  User.findOneAndUpdate({email: body.email, password: body.password},{new :true})
    return data
}