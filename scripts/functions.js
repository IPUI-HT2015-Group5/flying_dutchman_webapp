/**
 * The JavaScript file meant to include all the shared functions between bartenders and clients.
 * Created by Giovanni 'ItachiSan' Santini on 03/12/2015.
 */

/**
 * A function that performs a login based on a form input.
 * @param form The input form with the needed data.
 */
function logIn(form) {
    // The Pub API list
    var user = form.username.value;
    var pass = form.password.value;
    var action = "payments_get";

    //alert("Login with data: \"" + user + "," + pass + "\"");
    pubAPICall(action, user, pass, function (data) {
        alert("Data fetched! " + data.toString());
    }).done(function() {
        alert("Login success!");
    }).fail(function() {
        alert("Login failure!");
    });
}