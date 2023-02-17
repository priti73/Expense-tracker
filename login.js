const email=document.querySelector('#email');
const password=document.querySelector('#password');

 async function login(e){
   try{
        e.preventDefault();
        let logindetails={
            email:email.value,
            password:password.value
          }
      
    console.log(logindetails);
    const response= await axios.post("https://crudcrud.com/api/014eb6b2f0384b1da13a4409d60cf9f0/login",
    logindetails)
    if(response.status==201){
        
        alert(response.data.message)
    }
    
        }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}