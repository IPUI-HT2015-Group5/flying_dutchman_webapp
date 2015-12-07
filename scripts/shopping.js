/**
 * The JavaScript file meant to include all the specific functions for the shopping page.
 * Created by Giovanni 'ItachiSan' Santini on 07/12/15.
 */

/**
 * Allow drop on the lists
 * @param ev The event listener.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Keep track of the moved element ID.
 * @param ev The event listener.
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * Move to the "to buy" list.
 * @param ev The event catched.
 * @param dropElementID The ID of the element which is allowed to receive new stuff.
 * To prevent stacking of unwanted elements.
 */
function addBeer(ev,dropElementID) {
    // Prevent default behaviour
    ev.preventDefault();
    // Get the button data and its specific number
    var movedID = ev.dataTransfer.getData("text");
    var number = movedID.replace("beerButton", "");
    // Create the new IDs
    var divID = "beerButtonContainer" + number;

    // Allow multiple selection of the same beer
    var newDivID = "beerToBuyButtonContainer" + number + "_" +
        findNextNumber("beerToBuyButtonContainer" + number + "_", 0);
    var newButtonID = "beerToBuyButton" + number + "_" +
        findNextNumber("beerToBuyButton" + number + "_", 0);

    // Drop just in the correct element (check done with the ID)
    if(event.target.id == dropElementID) {
        // Create a new container div...
        $(ev.target).append(
            $("#" + divID).clone().empty().prop("id", newDivID)
        );
        // And add the new one!
        $("#" + newDivID).append(
            $("#" + movedID).clone().prop("id", newButtonID)
        );
    }
}

/**
 * Remove beers from the "to buy" list.
 * @param ev The event listener.
 * @param parentID The parent ID which should contain the element.
 * Used to not delete wrong stuff.
 */
function removeBeer(ev, parentID) {
    // Prevent default behaviour
    ev.preventDefault();
    // Get the button data and its specific number
    var movedID = ev.dataTransfer.getData("text");
    var number = movedID.replace("beerToBuyButton", "");
    // Create the new IDs
    var oldDivID = "beerToBuyButtonContainer" + number;

    /* Delete the elements, just if the correct parent is the one we look for
    Actually, the structure is like:
    list -> container div -> button
    So we should check for the "grandparent" (parent's parent).
    */
    if ($("#" + movedID).parent().parent().prop("id") == parentID) {
        $("#" + movedID).remove();
        $("#" + oldDivID).remove();
    }
}