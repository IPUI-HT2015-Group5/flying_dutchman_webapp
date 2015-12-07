/** Imports the users from the database and store it in an array */

$("form").submit(function(event){
    event.preventDefault();
    logon(username, password);
});