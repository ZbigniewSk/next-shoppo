import jsonwebtoken from 'jsonwebtoken';

const signToken = (user) => {
  return jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log('auth', authorization);
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not supplied' });
  }
};

export { signToken, isAuth };
