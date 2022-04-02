const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendEmail = async (email, uniqueString) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mytinerarymindhub2022@gmail.com",
      pass: "123456789/a",
    },
  });

  let sender = "mytinerarymindhub2022@gmail.com";
  let mailOptions = {
    from: sender,
    to: email,
    subject: "User email verification",
    html: `
<div>
<h1 style="color:red">Press <a href=http://localhost:4000/api/verify/${uniqueString}>here</a> to confirm your email. Thanks </h1>
</div>
`,
  };
  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  });
};
const userController = {
  verifyEmail: async (req, res) => {
    const { uniqueString } = req.params;

    const user = await User.findOne({ uniqueString: uniqueString });

    if (user) {
      user.verifiedEmail = true;
      await user.save();
      res.redirect("http://localhost:3000/");
    } else {
      res.json({
        success: false,
        response: "Your email has not been verified",
      });
    }
  },

  signUp: async (req, res) => {
    let { name, lastName, email, country, image, password, from } =
      req.body.userData;


    try {
      const userExist = await User.findOne({ email });

      if (userExist) {

        if (userExist.from.indexOf(from) !== -1) {
          "result of if" + (userExist.from.indexOf(from) === 0);
          res.json({
            success: false,
            from: "signup",
            message:
              "You have already made your SignUp in this way, please SignIn",
          });
        } else {
          const passwordHas = bcryptjs.hashSync(password, 10);
          userExist.from.push(from);
          userExist.password.push(passwordHas);
          if (from === "signup") {
            userExist.uniqueString = crypto.randomBytes(15).toString("hex");
            await userExist.save();
            await sendEmail(email, userExist.uniqueString);
            res.json({
              success: true,
              from: "signup",
              message:
                "We sent you an email to validate it, please check your box to complete the signUp and add it to your SignIN methods",
            });
          } else {
            userExist.save();
            res.json({
              success: true,
              from: "signup",
              message: "We add" + from + "to your means to perform signIn",
            });
          }
        }
      } else {
        const passwordHas = bcryptjs.hashSync(password, 10);
        const newUser = await new User({
          name: name,
          lastName: lastName,
          image: image,
          email: email,
          country: country,
          password: [passwordHas],
          uniqueString: crypto.randomBytes(15).toString("hex"),
          verifiedEmail: false,
          from: [from],
        });

        if (from !== "signup") {
          await newUser.save();
          res.json({
            success: true,
            from: "signup",
            message: "Congratulations, your user has been created with" + from,
          });
        } else {
          await newUser.save();
          await sendEmail(email, newUser.uniqueString);

          res.json({
            success: true,
            from: "signup",
            message:
              "We sent you an email to validate it, please check your box to complete the signUp",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signIn: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    try {
      const userExist = await User.findOne({ email });
      const indexpass = userExist.from.indexOf(from);


      if (!userExist) {
        res.json({
          success: false,
          message: "Your users have not been registered signUp",
        });
      } else {
        if (from !== "signin") {
          let passwordMatches = userExist.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );
          if (passwordMatches.length > 0) {
            const userData = {
              id: userExist._id,
              name: userExist.name,
              lastName: userExist.lastName,
              image: userExist.image,
              country: userExist.country,
              email: userExist.email,
              from: userExist.from,
            };
            await userExist.save();
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              success: true,
              from: from,
              response: { token, userData },
              message: "welcome again" + userData.name,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not registered with " +
                from +
                " if you want to enter with this method you must do the signUp with " +
                from,
            });
          }
        } else {
          if (userExist.verifiedEmail) {
            let passwordMatches = userExist.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );

            console.log(
              "password lookup result: " + (passwordMatches.length > 0)
            );
            if (passwordMatches.length > 0) {
              const userData = {
                id: userExist._id,
                name: userExist.name,
                lastName: userExist.lastName,
                image: userExist.image,
                email: userExist.email,
                from: userExist.from,
              };
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                success: true,
                from: from,
                response: { token, userData },
                message: "welcome again" + userData.name,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "The username or password do not match",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not verified your email, please check your email box to complete your signUp",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signOut: async (req, res) => {
    const email = req.body.closeuser;

    const user = await User.findOne({ email: email });
    await user.save();
    res.json(console.log("closed session" + email));
  },
  verifyToken: (req, res) => {

    if (!req.err) {
      res.json({
        success: true,
        response: {
          id: req.user.id,
          image: req.user.image,
          name: req.user.name,
          email: req.user.email,
          from: "token",
        },
        message: "Welcome again " + req.user.name,
      });
    } else {
      res.json({ success: false, message: "Please signIn again" });
    }
  },
};
module.exports = userController;
