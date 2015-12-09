/**
 * The JavaScript file meant to include all the HTML-generating functions.
 * Created by Giovanni 'ItachiSan' Santini on 06/12/2015.
 */

/**
 * The beer list item builder.
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

/**
 * The beer list item builder. Creates buttons without ID.
 * @param item The JSON element which represent a beer in the inventory.
 * @returns {string} The HTML code for an element as a string.
 */
function beerButtonListElementBuilder(item) {
    if (item.count > 0 && item.namn.length > 0) {
        if (item.namn2.length > 0)
            return "<div><button draggable='true' class=\"myBeerButton\">" +
                item.namn + " (" + item.namn2 + "): " + item.price +
                "</button></div>";
        else
            return "<div><button draggable='true' class=\"myBeerButton\">" +
                item.namn + ": " + item.price +
                "</button></div>";
    } else
        return "";
}

/**
 * The beer list item builder. Creates button with ID.
 * @param item The JSON element which represent a beer in the inventory.
 * @param i The iterator through all the elements.
 * @returns {string} The HTML code for an element as a string.
 */
function beerButtonWithIDListElementBuilder(item, i) {
    if (item.count > 0 && item.namn.length > 0) {
        if (item.namn2.length > 0)
            return "<div id=\"beerButtonContainer" + i +"\">" +
                "<button draggable='true' class=\"myBeerButton\"" +
                "id=\"beerButton" + i + "\">" +
                item.namn + " (" + item.namn2 + "): " + item.price +
                "</button></div>";
        else
            return "<div id=\"beerButtonContainer" + i +"\">" +
                "<button draggable='true' class=\"myBeerButton\"" +
                "id=\"beerButton" + i + "\">" +
                item.namn + ": " + item.price +
                "</button></div>";
    } else
        return "";
}

/**
 * Create an IOU element.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function IOUListElementBuilder(item) {
    console.log("Creating IOU element!");
    return "<li>You have an amount of " + item.assets + " unit of money!</li>";
}

/**
 * Create an purchase element.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function PurchasesListElementBuilder(item) {
    console.log("Creating purchase element!");
    return "<li>You bought a " +
        item.namn +
        (item.namn2 != "" ? " (" + item.namn2 + ")" : "") +
        " on " + item.timestamp +
        " for " + item.price +
        "</li>";
}

/**
 * Create an payment element.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function PaymentsListElementBuilder(item) {
    console.log("Creating payment element!");
    return "<li> Transaction ID:" + item.transaction_id +
        ", amount: " + item.amount +
        ", done on: " + item.timestamp + "</li>";
}

/**
 * Create an IOU element, for all the IOU.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function IOUAllListElementBuilder(item) {
    console.log("Creating IOU element!");
    return "<li>" + item.username +
        "(" + item.first_name + " " + item.last_name + ") " +
        "has an amount of " + item.assets + " unit of money!</li>";
}

/**
 * Create an purchase element.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function PurchasesAllListElementBuilder(item) {
    console.log("Creating purchase element!");
    return "<li>You bought a " +
        item.namn +
        (item.namn2 != "" ? " (" + item.namn2 + ")" : "") +
        " on " + item.timestamp +
        " for " + item.price +
        "</li>";
}

/**
 * Create an payment element.
 * @param item The object with the informations.
 * @returns {string} The HTML for each element.
 */
function PaymentsAllListElementBuilder(item) {
    console.log("Creating payment element!");
    return "<li> Admin ID: " + item.admin_username +
        ", user who paid: " + item.username +
        " (" + item.first_name + " " + item.last_name + ")" +
        ", amount: " + item.amount +
        ", done on: " + item.timestamp + "</li>";
}