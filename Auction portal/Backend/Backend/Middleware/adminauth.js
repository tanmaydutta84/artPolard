const jwt=require("jsonwebtoken");


module.exports = {
async adminauthorization (req, res, next)  {
  const token=req.cookies.access_tokenn;

  //console.log(token);
   if (!token) {
   return  res.json({ 
    message: "Invalid Token",
    "status": false,
    "data": [],
    "errors": []   
   });
  }
  try {
  const data =jwt.verify(token, "jsonwebtokenfordemotestadmin");
  
  req.userId = data.id;
  req.userRole = data.role;
  return next();
  } catch {
   return res.sendStatus(403);
  }
}
};
