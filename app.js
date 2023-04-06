
const express=require("express");
const bodyparse=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyparse.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function()
{
    console.log("running");
});
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    var fname=req.body.fname;
    var lname=req.body.lname;
    var emai=req.body.gname;
    console.log(fname,lname,emai);
    var data={
        members:[
            {email_address:emai,status:"subscribed",merge_fields:{FNAME:fname,LNAME:lname}}

        ]

    };
    const jsondata=JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/1e609448bc";
    const options={
        method:"POST",
        auth: "shreyansh:bvce541be861a8dac08faaf6c2cc58b16-us13"
    }
   const request= https.request(url,options,function(response)
    {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        res.sendFile(__dirname+"/fail.html");
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsondata);
    request.end();

});
app.post("/fail",function(req,res)
{res.redirect("/");
    

});
//1e609448bc