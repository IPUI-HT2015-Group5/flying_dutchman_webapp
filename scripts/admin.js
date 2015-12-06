/**
 * The JavaScript file meant to include all the administrator (bartender) level functions.
 * Created by Giovanni 'ItachiSan' Santini on 06/12/2015.
 */

/**
 * A function to get all available beers list, for bartenders.
 * @param user The user making the request.
 * @param pass The password of the above mentioned user.
 * @param parentID The ID in which the beer list has to be injected.
 * @param listID The ID of the created list.
 * @param elementBuilder The function to build the elements in the list.
 */
function createInventoryList(user, pass, parentID, listID, elementBuilder) {
    // Using the createUnorderedList helper function
    return createUnorderedList("inventory_get", user, pass, pubAPICall, parentID, listID, elementBuilder);
}