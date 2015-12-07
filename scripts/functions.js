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


// The credit for this code should be given Marc von Brockdorff at
// "http://www.webgeekly.com/tutorials/jquery/how-to-make-your-site-multilingual-using-xml-and-jquery/"
// Some changes have been made by Martin, all based on Marc's code.

function makeTranslation(language) {
    if (localStorage.getItem("language").length == 0) {
        var language = "english";
        console.log("This is the first time loading this page, we got no stored language. :(")
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