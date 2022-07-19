import User from '../models/user.model';

//get all users
export const userlogin = async (req) => {
  const data = await User.findOne({ email: req.email });
  if (data == null) {
    throw new Error(" User is not exist")
  }
  else {
    return data;
  }
};
//create new user
export const newUser = async (body) => {
  const result = await User.findOne({ email: body.email });
  if (result != null) {
    const data = await User.create(body);
    return data;
  }
  else {
    throw new Error("User is already exist")
  }

};

