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
            $.ajax({
              type: "POST",
              url: "registration.php",
              data: $(this).serialize(),
              success: function(data){
                  data = JSON.parse(data);
                  
                  if(data.result == "passwordsNotIdentical"){
                        $("#errorMessage").html("Passwords must be identical.");
                    } 
                    else if (data.result == "nameExists"){
                        $("#errorMessage").html("Username already exists.");
                    } 
                    else if (data.result == "failed"){
                        $("#errorMessage").html("Something went wrong, but we're not sure what.");
                    } 
                    else if (data.result == "success"){
                        $("#errorMessage").html("Successfully registered.");
                    }
              }
            });
            event.preventDefault();
        });
        
        $("#logout").click(function(){
           logout(); 
        });
        
    }
    
    function loadUserHomePage( data, html){
        var accounts;
        
        $("body").html(html);
        $("#name").html(data.firstname + " " + data.lastname);
        
        $.ajax({
            url: "getAccounts.php",
            success: function(information){
                accounts = JSON.parse(information);
                getMessages(data, accounts)
            }
        });

        $("#newMessage").click(function(){
            newMessage(data, accounts);
        });
        
        $("#logout").click(function(){
           logout(); 
        });
    }
    
    function newMessage(data, accounts){
        
        $.ajax({
            url: "newMessage.html",
            success: function(page){
                $("body").html(page);
                for(i in accounts){
                    c_user = accounts[i];
                    if( c_user.id != data.id && c_user.username != "admin" ){
                        $("#recipients").append("<option value=\""+c_user.id+"\">"+c_user.username+", "+c_user.firstname+" "+c_user.lastname+"</option>");
                    }
                }
 
                $("#cancel").click(function(){
                    $.ajax({
                        url: "userHomePage.html",
                        success: function(html){
                            loadUserHomePage(data, html);
                        }  
                     });
                });

                $("#sender").val(data.id);

                $("#newMessageForm").submit(function(event){
                    
                    sendMessage(this, data);
                    event.preventDefault();
                });
            }
        });
        
    }
    
    function sendMessage(form, user){
        
        $.ajax({
            type: "POST",
            url: "newMessage.php",
            data: $(form).serialize(),
            success: function(data){
                if(data == "success"){
                    $.ajax({
                        url: "userHomePage.html",
                        success: function(html){
                            loadUserHomePage(user, html);
                        }  
                     });
                    alert("Message sent!");
                }
                else {
                    alert("Message not sent.");
                }
            }
        });
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