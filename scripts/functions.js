/**
 * The JavaScript file meant to include all the shared functions between bartenders and clients.
 * Created by Giovanni 'ItachiSan' Santini on 03/12/2015.
 */

/**
 * A function that performs a login based on a form input.
 * @param event The event generated when submitting data.
 */
function logIn(event) {
    // Prevent page reload on form submit
    event.preventDefault();
    // Get data through JQuery
    var user = $("#username").val();
    var pass = $("#password").val();
    // Static values for test API calls.
    var action = "payments_get";
    var adminAction = "payments_get_all";
    var truth = false;

    pubAPICall(action, user, pass).done(function (data) {
        canMakeTheCall(action, user, pass, truth);
        console.log("Result of client: "  + truth);
        canMakeTheCall(adminAction, user, pass, truth);
        console.log("Result of admin: " + truth);

        if (data.type == "error") {
            alert("Error during login: " + data.payload[0].msg + " (error code: " + data.payload[0].code + ")");
        } else {
            localStorage.setItem("username", user);
            localStorage.setItem("password", pass);
            canMakeTheCall(adminAction, user, pass, truth);
            if (truth) {
                console.log("We are an admin!");
                window.location.href = "admin_start.html";
            }
            else {
                console.log("We are an user!");
                window.location.href = "client_start.html";
            }
        }
        console.log("Logged in as " + localStorage.getItem("username"));
        }).fail(function(obj, txt, e) {
        console.log("Login failure! " + e + txt);
    });
}


// The credit for this code should be given Marc von Brockdorff at
// "http://www.webgeekly.com/tutorials/jquery/how-to-make-your-site-multilingual-using-xml-and-jquery/"
// Some changes have been made by Martin, all based on Marc's code.

function makeTranslation(language) {
    if (localStorage.getItem("language") == null) {
        var language = "english";
        console.log("This is the first time loading this page, we got no stored language. :(")
    } else if (language == "other") {
        if (localStorage.getItem("language") == "swedish") {
            var language = "english";
            console.log("Changed language to english")
        } else {
            var language = "swedish";
            console.log("Changed language to Swedish")
        }
    }
    $.ajax({
        url: 'language.xml',

        success: function(xml) {
            $(xml).find('translation').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find(language).text();
                $("." + id).html(text);
            });
            console.log("made a translation to: " + language + " :)");
            localStorage.setItem("language", language);
        }
    });
}
