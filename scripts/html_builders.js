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

function beerButtonListElementBuilder(item) {
    if (item.count > 0 && item.namn.length > 0) {
        if (item.namn2.length > 0)
            return "<div></div><button disabled class=\"myBeerButton\">" +
                item.namn + " (" + item.namn2 + "): " + item.price +
                "</button></div>";
        else
            return "<div></div><button disabled class=\"myBeerButton\">" +
                item.namn + ": " + item.price +
                "</button></div>";
    } else
        return "";
}