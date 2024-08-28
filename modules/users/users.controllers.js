const { User, Supplier } = require("../../models");
const addPrefixToPhoneNumber = require("../../utils/add_number_prefix");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { randomNumber } = require("../../utils/random_number");
const { successResponse, errorResponse } = require("../../utils/responses");
const { sendMessage } = require("../../utils/send_sms");

const sendConfirmationCode = async ({ phone, user }) => {
  try {
    phone = addPrefixToPhoneNumber(phone);
    console.log(phone);
    const verificationCode = randomNumber();
    const verificationCodeMessage = `Habari ${user.name}, Asante kwa kujiunga na Hakiki, Namba yako ya uthibitisho ni ${verificationCode}`;
    const messageResponse = await sendMessage({
      numbers: [phone],
      message: verificationCodeMessage,
    });
    const response = await user.update({
      verificationCode,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const addUser = async (req, res) => {
  try {
    let { role, phone, name, companyName, email, address } = req.body;
    let user;
    phone = addPrefixToPhoneNumber(phone);
    user = await User.findOne({
      where: {
        phone,
      },
    });
    if (user) {
      res.status(401).json({
        status: false,
        message: "User already exist",
      });
    } else {
      user = await User.create({
        name,
        phone,
        role,
        address,
        verificationCode,
      });
      await sendConfirmationCode({ phone, user });
      console.log(messageResponse);
      if (companyName) {
        await Supplier.create({
          name: companyName,
          email,
          userId: user.id,
        });
      }
      const response = await User.findOne({
        where: {
          id: user.id,
        },
        include: [Supplier],
      });

      const tokens = generateJwtTokens(response);
      successResponse(res, { tokens, user: response });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const confirmCode = async (req, res) => {
  try {
    const { code } = req.body;
    let { phone } = req.params;
    phone = addPrefixToPhoneNumber(phone);
    const user = await User.findOne({
      where: {
        phone,
      },
    });
    console.log(user);
    if (user) {
      if (user.verificationCode == code) {
        res
          .status(200)
          .send({ status: true, message: `Congrats! Code is valid` });
      } else {
        res
          .status(403)
          .send({ status: false, message: "Wrong confirmation Code" });
      }
    } else {
      res.status(404).send({ status: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const resendCode = async (req, res) => {
  try {
    let { phone } = req.params;
    phone = addPrefixToPhoneNumber(phone);
    const user = await User.findOne({
      where: {
        phone,
      },
    });
    const response = await sendConfirmationCode({ phone, user });
    successResponse(res, {
      message: "Code sent Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: {
        exclude: ["id"],
      },
      include: [
        {
          model: Supplier,
          attributes: {
            exclude: ["id", "userId", "UserId"],
          },
        },
      ],
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
const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    const response = await user.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = { addUser, getUsers, confirmCode, deleteUser, resendCode };
