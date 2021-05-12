const express=require('express');

const request=require('request');

const https=require('https');

const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));[]

app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html");

})

app.post("/",function(req,res){

	const fname=req.body.fname;
	const lname=req.body.lname;
	const email=req.body.emailid;

	const data={
		members:[
		  {
		  	email_address:email,
		  	status:"subscribed",
		  	merge_fields:{
		  		FNAME:fname,
		  		LNAME:lname
		  	}
		  }

		]
	};
app.post('/failure',function(req,res) {
	res.redirect("/");
    
});

	const jsonData=JSON.stringify(data);

	const url="https://us1.api.mailchimp.com/3.0/lists/3faaa1e177";
    
    const options={
    	method:"POST",
    	auth:"aryan1:1c4f628098e93c33e7e792bcf581cbaf-us1"
    }

	const requestserver=https.request(url,options,function(response){
      
      if(response.statusCode==200)
      	res.sendFile(__dirname+"/success.html");
      else
       	res.sendFile(__dirname+"/failure.html");

      response.on("data",function(data){
      	console.log(JSON.parse(data));
      })
	})
	requestserver.write(jsonData);
	requestserver.end();
    



	console.log(fname,lname,email);
})
app.listen(process.env.PORT || 3000 ,function(){
	console.log("Server is up");
})
