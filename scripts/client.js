/**
 * The JavaScript file meant to include all the clients level functions.
 * Created by Giovanni 'ItachiSan' Santini on 06/12/2015.
 */

/**
 * A function to get all available beers list, for clients.
 * @param user The user making the request.
 * @param pass The password of the above mentioned user.
 * @param parentID The ID in which the beer list has to be injected.
 * @param listID The ID of the created list.
 * @param elementBuilder The function to build the elements in the list.
 * Notice: as we run the function as a normal client, we use pubAPIAdminCall to get admin privileges.
 */
function createBeerList(user, pass, parentID, listID, elementBuilder){
    // Using the createUnorderedList helper function
    return createUnorderedList("inventory_get", user, pass, pubAPIAdminCall, parentID, listID, elementBuilder);
}