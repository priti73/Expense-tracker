const email=document.querySelector('#email');

async function login(e){
    try{
         e.preventDefault();
         let logindetails={
          email:email.value
        }
         const response= await axios.post("http://54.238.228.126:3000/password/forgotpassword",logindetails)
         console.log(response.status);
        }
        catch(err){
          console.log(err);
          document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
     }
 }