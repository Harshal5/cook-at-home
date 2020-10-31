const jwt = require('jsonwebtoken');
const config = require('config');
const axios = require('axios');
const FormData = require('form-data');
const User = require('../models/User.model');

const portalAuth = async ({ username, password }) => {
  try {
    let form = new FormData();
    form.append('UserName', username);
    form.append('Password', password);

    let res = await axios.post(
      'http://portal.coep.org.in:9093/signup/SigninRegister',
      form,
      {
        headers: form.getHeaders()
      }
    );
    return res.data.Message === '0' && res.data.flagClass === '/';
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user || !(await portalAuth(req.body))) {
      return next({
        status: 401,
        message: 'Invalid username/password'
      });
    }
    let { id, username, fullname, userData } = user;
    // let isMatch = await user.comparePassword(req.body.password);
    // if (isMatch) {
    let accessToken = jwt.sign(
      {
        id,
        username
      },
      config.get('accessTokenSecret'),
      {
        expiresIn: '1m'
      }
    );
    let refreshToken = jwt.sign(
      {
        id,
        username
      },
      config.get('refreshTokenSecret'),
      {
        expiresIn: '7d'
      }
    );
    // if (userType === 'admin') {
    //   if (user.clubs.length === 0) {
    //     return next({
    //       status: 400,
    //       message: 'Unauthorized access'
    //     });
    //   }
    // }
    return res.status(200).json({
      id,
      username,
      fullname,
      accessToken,
      refreshToken,
      userData
    });
    // } else {
    //   return next({
    //     status: 400,
    //     message: 'Invalid username/password'
    //   });
    // }
  } catch (err) {
    next(err);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    if (!(await portalAuth(req.body))) {
      return next({
        status: 401,
        message: 'Invalid username/password'
      });
    }
    let user = await User.create({
      username: req.body.username,
      fullname: req.body.fullname,
      userData: { name: req.body.fullname }
    });
    let { id, username, fullname, userData } = user;
    let accessToken = jwt.sign(
      {
        id,
        username
      },
      config.get('accessTokenSecret'),
      {
        expiresIn: '2h'
      }
    );
    let refreshToken = jwt.sign(
      {
        id,
        username
      },
      config.get('refreshTokenSecret'),
      {
        expiresIn: '7d'
      }
    );
    return res.status(200).json({
      id,
      username,
      fullname,
      accessToken,
      refreshToken,
      userData
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Username is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

// module.exports.refreshToken = async (req, res, next) => {

// }

module.exports.generateNewToken = async (req, res, next) => {
  try {
    console.log(req.body);
    const { refreshToken } = req.body;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(403).json({ error: 'Access denied,token missing!' });
    } else {
      const { iat, exp, ...payload } = jwt.verify(
        refreshToken,
        config.get('refreshTokenSecret')
      );
      console.log(payload);
      const accessToken = jwt.sign(payload, config.get('accessTokenSecret'), {
        expiresIn: '1d'
      });
      return res.status(200).json({ accessToken });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports.verifyUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    res.status(400).json({ error: 'No user found' });
  } else {
    res.userData = user.userData;
  }
  next();
};
