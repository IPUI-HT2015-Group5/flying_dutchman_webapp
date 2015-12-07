/**
 * The JavaScript file meant to include all the helper functions used generally.
 * Created by Giovanni 'ItachiSan' Santini on 06/12/2015.
 */

/**
 * An helper function to get information from the remote DB API and handle them properly.
 * @param action The specific API call.
 * @param user The user which makes the call.
 * @param pass The password of the user mentioned above.
 * @param handlerFunction A function that handles the result got from the API call.
 */
function pubAPICall(action, user, pass, handlerFunction) {
    // The Pub API URL, with correct parameters
    var PubAPI = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + user + "&password=" + pass + "&action=" + action;
    // Use JQuery getJSON
    return $.getJSON(PubAPI, handlerFunction);
}

/**
 * An helper function to call admin APIs with client-level privileges
 * @param action The specific API called.
 * @param handlerFunction The function which handles the data got from the API call.
 */
function pubAPIAdminCall(action, user, pass, handlerFunction) {
    /*
    "Override" (or better, ignore) username and password and
    run the API call as an admin.
    A really dirty thing.
    */
    user = "jorass";
    pass = "jorass";
    return pubAPICall(action, user, pass, handlerFunction);
}

/**
 * A function that inserts an unordered list in a container (usually, a div), with some remote API call.
 * @param action The specific call to the RPC API.
 * @param APICall The API call, with the correct privileges level.
 * @param parentID The ID of the parent of the list.
 * @param listID The ID of the list of elements.
 * @param elementBuilder A function that creates the proper element in the list.
 */
function createUnorderedList(action, user, pass, APICall, parentID, listID, elementBuilder) {
    $('#' + parentID).append("<ul id="+ listID + "></ul>");

    APICall(action, user, pass, function (data) {
        $.each(data.payload, function (i, item) {
            //console.log(elementBuilder(item));
            $('#' + listID).append(elementBuilder(item));
        });
    });
}