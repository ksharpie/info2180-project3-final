$(document).ready(function(){
    
    $.ajax({
      url: "startSession.php",
      success: function(data){
          var session = JSON.parse(data);
          
          if(session.hasOwnProperty("logged_in") && session.logged_in == true){
               
              if(session.hasOwnProperty("user")){
                  login(session.user);
                  return;
              }
            }
          
          loadLoginPage();
      }
    });
    
    function loadLoginPage(){
        
        $.ajax({
            url: "login.html",
            success: function(data){
                $("body").html(data);
                
                $("#loginForm").submit(function(event){
                  $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: $(this).serialize(),
                        success: function(data){
                            login(JSON.parse(data));
                        }
                  });
                  event.preventDefault();
                });
            }
        }); 
    }
    
    function login(data){
        if(data.result == "userNotFound"){
            $("#errorMessage").html("User not Found");
        }
        else if (data.result == "incorrectPassword"){
            $("#errorMessage").html("Incorrect credentials")
        }
        else if (data.result == "success"){
            if (data.type == "admin"){
                $.ajax({
                  url: "adminHomePage.html",
                  success: function(html){
                    loadAdminHomePage(data, html);
                  }
                });
            }
            else if (data.type == "user"){
                $.ajax({
                  url: "userHomePage.html",
                  success: function(html){
                    loadUserHomePage(data, html);
                  }
                });
            }
        }
    }
    
    function loadAdminHomePage(data, html){
        
        $("body").html(html);
        $("#name").html(data.firstname + " " + data.lastname);
        
        $("#registrationForm").submit(function(event){
            
        });
        
        $("#logout").click(function(){
           logout(); 
        });
        
    }
    
    function loadUserHomePage( data, html){
        alert("user");
    }
    
    function logout(){
        if(confirm("Confirm Logout")){
            $.ajax({
              url:"logout.php",
              success: function(data){
                  loadLoginPage();
              }
            });
        }
    }
});