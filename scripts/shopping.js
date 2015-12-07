/**
 * The JavaScript file meant to include all the specific functions for the shopping page.
 * Created by Giovanni 'ItachiSan' Santini on 07/12/15.
 */

// Allow drop on the lists
function allowDrop(ev) {
    ev.preventDefault();
}

// Keep track of the moved button ID
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Move to the "to buy" list
function dropToBuy(ev) {
    // Prevent default behaviour
    ev.preventDefault();
    // Get the button data and its specific number
    var movedID = ev.dataTransfer.getData("text");
    var number = movedID.replace("beerButton", "");
    // Create the new IDs
    var divID = "beerButtonContainer" + number;
    var newDivID = "beerToBuyButtonContainer" + number;
    var newButtonID = "beerToBuyButton" + number;

    console.log("Drop to buy: " + movedID + "," + divID);
    console.log("ev.target: " + ev.target);

    // Create a new container div...
    $(ev.target).append($("#" + divID).clone().empty().prop("id", newDivID));
    // And add the new one!
    $("#" + newDivID).append($("#" + movedID).clone().prop("id", newButtonID));

}

function removeBeer(ev, parentID) {
    // Prevent default behaviour
    ev.preventDefault();
    // Get the button data and its specific number
    var movedID = ev.dataTransfer.getData("text");
    var number = movedID.replace("beerToBuyButton", "");
    // Create the new IDs
    var oldDivID = "beerToBuyButtonContainer" + number;

    console.log(movedID + ", div to remove: " + oldDivID + ", parent: " + parentID);
    // Delete the elements
    if ($("#" + movedID).parent().parent().prop("id") == parentID) {
        $("#" + movedID).remove();
        $("#" + oldDivID).remove();
    }
}