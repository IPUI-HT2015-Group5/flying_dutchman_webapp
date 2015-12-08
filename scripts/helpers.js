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
 * @param user Overloaded inside, is there just for compatibility.
 * @param pass Overloaded inside, is there just for compatibility.
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
 * @param user The user who makes the API call.
 * @param pass The password of the above mentioned user.
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

/**
 * A function that inserts an unordered list in a container (usually, a div), with some remote API call.
 * @param action The specific call to the RPC API.
 * @param user The user who makes the API call.
 * @param pass The password of the above mentioned user.
 * @param APICall The API call, with the correct privileges level.
 * @param parentID The ID of the parent of the list.
 * @param listID The ID of the list of elements.
 * @param elementBuilder A function that creates the proper element in the list.
 */
function createUnorderedListWithID(action, user, pass, APICall, parentID, listID, elementBuilder) {
    $('#' + parentID).append("<ul id="+ listID + "></ul>");

    APICall(action, user, pass, function (data) {
        $.each(data.payload, function (i, item) {
            //console.log(elementBuilder(item));
            $('#' + listID).append(elementBuilder(item, i));
        });
    });
}

/**
 * An helper function which finds the next avaible number for the ID.
 * It supposes that the ID is equal to elementID + initialValue (string concatenation).
 * @param elementID The element main ID.
 * @param initialValue The value to start the search on
 * @returns {Number}
 */
function findNextNumber(elementID, initialValue) {
    if($("#" + elementID + initialValue).length == 0) {
        return initialValue;
    }
    else
        return findNextNumber(elementID, (initialValue + 1));
}

/**
 * An helper function to get information from the remote DB API and handle them properly.
 * @param action The API call to test.
 * @param user The user which makes the call.
 * @param pass The password of the user mentioned above.
 */
function canMakeTheCall(action, user, pass, truth) {
    // Use JQuery getJSON
    pubAPICall(action, user, pass, function (data) {
        // If we can make the call, we have data.type equal to the API call name.
        console.log("Test elements: " + data.type + ", " + action);
        console.log("Test 1: " + (data.type == action));
        truth = (data.type == action);
        console.log("Test 2: " + truth);
    });
}