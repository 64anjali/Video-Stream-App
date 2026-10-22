
document.getElementById("register-form").addEventListener("submit",async (e)=>{
    e.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    console.log(email,password,"user data")

    try{
        const response=await fetch("http://localhost:3000/users");
        const data= await response.json();
        const user=data.find(u=>u.email==email && u.password==password);
        
        if(user){
            alert("Login Successful");
            localStorage.setItem("loggedInUser",JSON.stringify(user));
            window.location.href="../index.html";
        }else{
            alert("Invalid email or password");
        }
    }catch(error){
        console.log(error);
    }
});