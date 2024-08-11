const { User, Supplier } = require("../../models");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { randomNumber } = require("../../utils/random_number");
const { successResponse, errorResponse } = require("../../utils/responses");
const { sendMessage } = require("../../utils/send_sms");

const addUser = async (req, res) => {
  try {
    const { phone, role, name, companyName, email } = req.body;
    const verificationCode = randomNumber();
    const verificationCodeMessage = `Habari ${name}, Asante kwa kujiunga na Hakiki, Namba yako ya uthibitisho ni ${verificationCode}`;

    const user = await User.create({
      name,
      phone,
      role,
      verificationCode,
    });

    if (companyName) {
      await Supplier.create({
        name: companyName,
        email,
        userId: user.id,
      });
    }
    sendMessage({ numbers: [phone], message: verificationCodeMessage });

    const response = await User.findOne({
      where: {
        id: user.id,
      },
      include: [Supplier],
    });

    const tokens = generateJwtTokens(response);
    successResponse(res, { tokens, user: response });
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const confirmCode = async (req, res) => {
  try {
    const { code } = req.body;
    const { phone } = req.params;
    const user = await User.findOne({
      where: {
        phone,
      },
    });
    if (user) {
      if (user.verificationCode == code) {
        res
          .status(200)
          .send({ status: true, message: `Congrats! Your code is valid` });
      } else {
        res.status(403).send({ status: false, message: user });
      }
    } else {
      res.status(404).send({ status: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
        attributes:{
            exclude:["id"]
        },
        include:[{
            model:Supplier,
            attributes:{
                exclude:['id',"userId","UserId"]
              }
        }]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: {
        uuid,
      },
      
    });
    const response = await user.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addUser, getUsers, confirmCode, deleteUser };
