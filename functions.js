/**
 * Created by Giovanni 'ItachiSan' Santini on 03/12/2015.
 */

/**
 * A function that inserts an unordered list in a container (usually, a div), with some remote API call.
 * @param action The specific call to the RPC API.
 * @param user The user that makes the call.
 * @param pass The password of the user.
 * @param parentID The ID of the parent of the list.
 * @param listID The ID of the list of elements.
 * @param elementBuilder A function that creates the proper element in the list.
 */
function createUnorderedList(action, user, pass, parentID, listID, elementBuilder) {
    // The Pub API list
    var PubAPI = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + user + "&password=" + pass + "&action=" + action;

    $('#' + parentID).append("<ul id="+ listID + "></ul>");

    $.getJSON(PubAPI)
        .done(function (data) {
            $.each(data.payload, function (i, item) {
                console.log(elementBuilder(item));
                $('#' + listID).append(elementBuilder(item));
            });
        });
}

/**
 * The beer list builder item.
 * @param item The JSON element which represent a beer in the inventory.
 * @returns {string} The HTML code for an element as a string.
 */
function beerListElementBuilder(item) {
    return "<li>" +
        "Beer 1st name: " + item.namn + " | " +
        "Beer 2nd name: " + item.namn2 + " | " +
        "Beer standard price: " + item.sbl_price + " | " +
        "Beer pub price: " + item.pub_price + " | " +
        "Beer ID: " + item.beer_id + " | " +
        "Beer count in stock: " + item.count + " | " +
        "Beer price: " + item.price + "" +
        "</li>";
}

function logon(user, pass) {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var action = iou_get;
    var admins = ["jorass", "ervtod", "hirchr", "saskru", "svetor"];
    var PubAPI = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + user + "&password=" + pass + "&action=" + action;
    console.log("User: " + user + ", password" + pass);

    localStorage.setItem("user", user);
    console.log("logging in" + user, + pass);
    alert("username: " + user + " password: " + pass);
    $.getJSON(PubAPI)
        .done(function (data) {
            localStorage.setItem("assets", value.assets);
            localStorage.setItem("firstName", value.first_name);
            localStorage.setItem("lastName", value.last_name);

            $.each(data.payload, function (i, value) {
                if (value.type = "error") {
                    alert(value.msg);
                } else {
                        if ($.inArray(usr, admins) > -1){
                            window.location.href = 'generic-page-json.html';
                            return false;
                        } else {
                            window.location.href = 'vip-generic-json.html';
                            return false;
                        }
                }
            });
        });
}

function logonTest(user, pass) {
    alert("User: " + user + ", password" + pass);
    console.log("User: " + user + ", password" + pass);
}



$(function() {

    $("#tooltip").hide();

    $("#demo").click(function() {
        $("#tooltip").toggle("slow");
    });

});