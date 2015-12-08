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

    console.log("Login with data: \"" + user + "," + pass + "\"");
    //alert("Login with data: \"" + user + "," + pass + "\"");
    pubAPICall(action, user, pass, function (data) {
        console.log("Data fetched! " + data.toString());
    }).done(function(data) {
        console.log("Login success! ");
        window.location.href = 'client/shopping.html';
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
