
const jwt=require("jsonwebtoken");


module.exports = {
async authorization (req, res, next)  {
  const token=req.cookies.access_token;

  console.log(token);
   if (!token) {
   return    res.json({ 
    message: "Invalid Token",
    "status": false,
    "data": [],
    "errors": []   
   });
  }
  try {
  const data =jwt.verify(token, "jsonwebtokenfordemotest");
  console.log(data);
  req.userId = data.id;
  req.userRole = data.role;
  return next();
  } catch {
   return res.sendStatus(403);
  }
}
};
