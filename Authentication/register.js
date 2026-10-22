
document.getElementById("register-form").addEventListener("submit",async (e)=>{
    e.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    console.log(name,email,password,"user data")

    try{
        const response=await fetch("http://localhost:3000/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password})
        });
        if(response.ok){
            alert("Registered Successfully.");
        }
    }catch(error){
        console.log(error);
    }
});
