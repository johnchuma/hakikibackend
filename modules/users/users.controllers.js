const { User, Supplier, Distributer } = require("../../models");
const addPrefixToPhoneNumber = require("../../utils/add_number_prefix");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { randomNumber } = require("../../utils/random_number");
const { successResponse, errorResponse } = require("../../utils/responses");
const { sendMessage } = require("../../utils/send_sms");
const bcrypt = require("bcrypt");

const findUserByUUID = async (uuid) => {
  try {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
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
    let { role, phone, name, companyName, businessName, email, address } =
      req.body;
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
      const password = bcrypt.hashSync("123456", 10);
      user = await User.create({
        name,
        phone,
        password,
        email,
        role,
        address,
      });
      await sendConfirmationCode({ phone, user });
      if (role == "supplier") {
        await Supplier.create({
          name: companyName,
          email,
          userId: user.id,
        });
      }
      if (role == "distributer") {
        await Distributer.create({
          businessName,
          email,
          userId: user.id,
        });
      }
      const response = await User.findOne({
        where: {
          id: user.id,
        },
        include: [Supplier, Distributer],
      });

      successResponse(res, { tokens: "", user: response });
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
        res.status(200).send({
          status: true,
          token: generateJwtTokens(user),
        });
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

const sendCode = async (req, res) => {
  try {
    let { phone } = req.params;
    phone = addPrefixToPhoneNumber(phone);
    const user = await User.findOne({
      where: {
        phone,
      },
    });
    if (user) {
      const response = await sendConfirmationCode({ phone, user });
      successResponse(res, {
        message: "Code sent Successfully",
        user,
      });
    } else {
      res.status(404).send({ status: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const result = bcrypt.compare(password, user.password);
      console.log(result);
      if (result) {
        const token = generateJwtTokens(user);
        res.status(200).json({
          token,
          status: true,
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Wrong password",
        });
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
const getUserInfo = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getMyInfo = async (req, res) => {
  try {
    const user = req.user;
    const response = await findUserByUUID(user.uuid);
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
    const user = await findUserByUUID(uuid);
    const response = await user.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addUser,
  findUserByUUID,
  getUsers,
  login,
  confirmCode,
  deleteUser,
  getUserInfo,
  getMyInfo,
  updateUser,
  sendCode,
};
