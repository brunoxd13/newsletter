const { check, validationResult } = require("express-validator/check");
const { db } = require("./init");

const email = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = req.body;

  return db
    .collection("emails")
    .doc(user.email)
    .set(user)
    .then(resp => res.status(200).send(resp))
    .catch(err => res.status(400).send(err));
};

const emailValidators = [check("email").exists(), check("email").isEmail()];

module.exports = { email, emailValidators };
