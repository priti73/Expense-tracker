const name=document.querySelector('#name');
const email=document.querySelector('#email');
const password=document.querySelector('#password');

 async function signup(e){
   try{
        e.preventDefault();
        let userdetails={
            name:name.value,
            email:email.value,
            password:password.value
          }
        
  console.log(userdetails);
    const response= await axios.post("http://localhost:3000/users/signup",
    userdetails)
    if(response.status==201){
      window.location.href="./login.html"
      
    }
    else{
       throw new Error('failed to login')
    }
        }catch(err){
         console.log(err);
    }
}