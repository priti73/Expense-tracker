const email=document.querySelector('#email');

async function login(e){
    try{
         e.preventDefault();
         let logindetails={
          email:email.value
        }
         const response= await axios.post("http://localhost:3000/password/forgotpassword",logindetails)
        }
        catch(err){
          console.log(err);
          document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
     }
 }