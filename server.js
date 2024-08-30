// imports and packages
const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config();
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
require('dotenv').config();

//code for middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// view  engine
//multer storage
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    return cb(null,"./uploads");
  },
  filename:function(req,file,cb){
    return cb(null,file.originalname);
  },
})
const upload = multer({ storage,limits: {
  fileSize: 200 * 1024 // 200 KB in bytes
} })
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const UPLOADS_FOLDER = path.join(__dirname, 'uploads');


//setting up the database
const db = process.env.DBURL;
mongoose.connect(db).then(()=>{
    console.log("mongodb is connected successfully")
}).catch((err) =>{
    console.log("mongodb error:",err)
})

app.get("/createdata",isLoggedIn,(req,res)=>{
  res.render("createdata")
})
const creditShema = new mongoose.Schema({
  username:String,
  password:String
})
const credit = mongoose.model('credit',creditShema)
const AdminShema = new mongoose.Schema({
  username:String,
  password:String
})
const admin = mongoose.model('admin',creditShema)
//code for the database shechma
const studentSchema = new mongoose.Schema({
    status: String,
    image:String,
    imagename:String,
    studentname: String,
    studentid: String,
    dob: Date,
    caste: String,
    religion: String,
    gender: String,
    education: String,
    healthcondition: String,
    healthreason: String,
    previousschool: String,
    schoolvillage: String,
    siblings: Number,
    fathername: String,
    mothername: String,
    fatheraadhar: String,
    motheraadhar: String,
    studentaadhar: String,
    studentvillage: String,
    studentmandal: String,
    studentdistrict: String,
    studentpincode: String,
    admissionreason: String,
    admittedby: String,
    admittervillage: String,
    admittermandal: String,
    admitterdistrict: String,
    admitterpincode: String,
    admitterphone: String,
    relationship: String,
    emergencycontactname: String,
    emergencycontactphone: String,
    emergencycontactvillage: String,
    emergencycontactmandal: String,
    emergencycontactdistrict: String,
    emergencycontactpincode: String
  });
  // Create a model using the schema
  const userModel = mongoose.model('user', studentSchema);
  
//code to for the route
app.post('/submit-form',upload.single('image'), async (req, res) => {
    try {
      let {
        status,
        studentname,
        studentid,
        dob,
        caste,
        religion,
        gender,
        education,
        healthcondition,
        healthreason,
        previousschool,
        schoolvillage,
        siblings,
        fathername,
        mothername,
        fatheraadhar,
        motheraadhar,
        studentaadhar,
        studentvillage,
        studentmandal,
        studentdistrict,
        studentpincode,
        admissionreason,
        admittedby,
        admittervillage,
        admittermandal,
        admitterdistrict,
        admitterpincode,
        admitterphone,
        relationship,
        emergencycontactname,
        emergencycontactphone,
        emergencycontactvillage,
        emergencycontactmandal,
        emergencycontactdistrict,
        emergencycontactpincode 
      } = req.body;
       let users = await userModel.create({
        status,
        image:req.file.path,
        imagename:req.file.originalname,
        studentname,
        studentid,
        dob,
        caste,
        religion,
        gender,
        education,
        healthcondition,
        healthreason,
        previousschool,
        schoolvillage,
        siblings,
        fathername,
        mothername,
        fatheraadhar,
        motheraadhar,
        studentaadhar,
        studentvillage,
        studentmandal,
        studentdistrict,
        studentpincode,
        admissionreason,
        admittedby,
        admittervillage,
        admittermandal,
        admitterdistrict,
        admitterpincode,
        admitterphone,
        relationship,
        emergencycontactname,
        emergencycontactphone,
        emergencycontactvillage,
        emergencycontactmandal,
        emergencycontactdistrict,
        emergencycontactpincode 
       })
      res.redirect("/");
      
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).send('Error saving form data');
    }
  });
  
  // code toute to get the data from database
  app.get('/', isLoggedIn,async (req, res) => {
    try {
      // Fetch all students from the database
      const users = await userModel.find();
      // Render the 'students' view and pass the data to it
      res.render('viewdata', { users });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).send('Error fetching student data');
    }
  });
  
  
  // route to view the data
  app.get("/viewdata/:studentid",isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({studentid:req.params.studentid });
    res.render('specificdata',{ user })
    
  })
  
  app.get("/update/:studentid",isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({studentid:req.params.studentid });
  
    res.render('update',{ user })
    
  })
  app.post("/update-form/update/:studentid",async (req,res)=>{
    let {
      status,
      studentname,
      studentid,
      dob,
      caste,
      religion,
      gender,
      education,
      healthcondition,
      healthreason,
      previousschool,
      schoolvillage,
      siblings,
      fathername,
      mothername,
      fatheraadhar,
      motheraadhar,
      studentaadhar,
      studentvillage,
      studentmandal,
      studentdistrict,
      studentpincode,
      admissionreason,
      admittedby,
      admittervillage,
      admittermandal,
      admitterdistrict,
      admitterpincode,
      admitterphone,
      relationship,
      emergencycontactname,
      emergencycontactphone,
      emergencycontactvillage,
      emergencycontactmandal,
      emergencycontactdistrict,
      emergencycontactpincode 
    } = req.body;
    
     
        let users = await userModel.findOneAndUpdate({studentid:req.params.studentid},{
          status,
          studentname,
          studentid,
          dob,
          caste,
          religion,
          gender,
          education,
          healthcondition,
          healthreason,
          previousschool,
          schoolvillage,
          siblings,
          fathername,
          mothername,
          fatheraadhar,
          motheraadhar,
          studentaadhar,
          studentvillage,
          studentmandal,
          studentdistrict,
          studentpincode,
          admissionreason,
          admittedby,
          admittervillage,
          admittermandal,
          admitterdistrict,
          admitterpincode,
          admitterphone,
          relationship,
          emergencycontactname,
          emergencycontactphone,
          emergencycontactvillage,
          emergencycontactmandal,
          emergencycontactdistrict,
          emergencycontactpincode },{new :true})
          res.redirect("/")
  })
  app.delete("/delete/:studentid/:imagename",async (req,res)=>{
    try{
    const filename = req.params.imagename;
      
      const filePath = path.join(UPLOADS_FOLDER, filename);
    
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).send('Image is already deleted Successfully..');
        }
    
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
    let student = await userModel.findOneAndDelete({studentid:req.params.studentid})
    res.redirect("/viewdata")
  })
  app.get('/deleted/:studentid/:imagename', async (req, res) => {
    const studentId = req.params.studentid;
    const det = await userModel.findOneAndUpdate({studentid:req.params.studentid},{image:"0",imagename:"0"},{new:true});


    try {
        // Find the student by ID
      
          

      
        
        const filename = req.params.imagename;
        console.log("your filename:",filename)
        const filePath = path.join(UPLOADS_FOLDER, filename);
      
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).send('Image is already deleted Successfully..');
          }
      
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/updateimages",isLoggedIn,async(req,res)=>{
  let users = await userModel.find();

  res.render("edit",{users})
})
app.post("/update-img/:studentid",upload.single('image'), async(req,res)=>{
  
  let updates = await userModel.findOneAndUpdate({studentid:req.params.stuentid},{
    image:req.file.path,
    image:req.file.originalname
  },{new:true})
  
  res.redirect("/")
})

// ...........................login ,logout ,register routes...........

app.get("/register",isLoggedIn,(req,res)=>{
  res.render("register")
})
app.get("/login",(req,res)=>{
  res.render("index")
})
// app.post("/register",async (req,res)=>{
//   let { username, password } = req.body;
//   let user = await credit.findOne({username});
//   if(user) return res.send("user already registered");
//   bcrypt.genSalt(10,(err,Salt)=>{
//     bcrypt.hash(password,Salt,async (err,hash)=>{
//       let createuser = await credit.create({
//         username,
//         password:hash
//       })
//       let token = jwt.sign({username},"shhhh");
//       res.cookie("token",token);
//       console.log(token)
//       res.send("user registered successfully!")
//     })
//   })
// })
// app.post("/Admin", async (req, res) => {
//   let { username, password } = req.body;
//   let user = await admin.findOne({ username });
//   if (!user) return res.send("You Are Not An Admin");

//   try {
//     let result = await bcrypt.compare(password, user.password);
//     if (result) {
//       let token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
//       res.cookie("token", token, { httpOnly: true });
//       res.redirect("register");
//     } else {
//       res.send("Password or Username might be wrong!");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error logging in");
//   }
// });

app.post("/register",isLoggedIn, async (req, res) => {
  let { username, password } = req.body;
  let users = await credit.findOne({ username });
  if (users) return res.send("User already registered");

  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    
    let createUser = await credit.create({
      username,
      password: hash
    });
    res.send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
  
});

app.get("/login", (req, res) => {
  res.render("index");
});
app.get("/viewlogger",isLoggedIn,async(req,res)=>{
  let users = await credit.find();
  res.render("viewlogs",{ users })
})
app.get("/dellog/:username",isLoggedIn,async (req,res)=>{
  let user = await credit.findOneAndDelete({username:req.params.username})
  res.redirect("/register")
})
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let user = await credit.findOne({ username });
  if (!user) return res.send("You haven't registered your account yet! Please register your account.");

  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    } else {
      res.send("Password or Username might be wrong!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});
app.get('/admin',(req,res)=>{
  res.render("admin")
})
app.post("/Admin", async (req, res) => {
  let { username, password } = req.body;
  let user = await admin.findOne({ username });
  if (!user) return res.send("You Are Not An Admin");

  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/register");
    } else {
      res.send("Password or Username might be wrong!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});
app.get("/logoutAdmin", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.redirect("/")
  
  
});
app.get("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.redirect("/");
  
});

function isLoggedIn(req, res, next) {
  // Debug: Log cookies to verify if token is present
  

  const token = req.cookies.token;

  if (!token) {
    return res.render("homepage")
    
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data; // Attach user data to the request
    next();
  } catch (err) {
    console.error("Token error:", err); // Debugging token error
    res.status(401).send("Invalid or expired token");
  }
}




//code to start the server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("This server is running at https:localhost:",port)
})
