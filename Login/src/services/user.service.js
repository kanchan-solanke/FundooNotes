import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
if(data1 != null){
  throw new Error("User is already exist")
}
else{
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  console.log("After hassing body:", body);
  const data = await User.create(body);
  return data;
}
  
};

