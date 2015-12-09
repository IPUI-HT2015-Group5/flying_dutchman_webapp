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

    countclick("addBeer",dropElementID, movedID, newButtonID);



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
    //alert(ev + "removeBeer"+number+ parentID + movedID)
    countclick("removeBeer", parentID, movedID,oldDivID);
}


store=[]; //Stores what have been done
store_undo=[]; //Stores what have been un-done
var divWayBeerToBuy;


function countclick(funcName, parentID, movedID, moreThanOne) {
    store.unshift([funcName,parentID, movedID, moreThanOne]);
    //alert (store);
    //alert("Store: "+ store + "  Inviterad store: " + store_undo);
    if (funcName=="addBeer"){
        divWayBeerToBuy="#"+parentID;
    }
    while (store_undo.length > 0) {
        store_undo.pop();
    }
    return ;

}

function undo() {
    //alert("Store: "+ store + "  Inviterad store: " + store_undo);
    if (store[0][0]=="addBeer"){
        var parentID=store[0][1];
        var movedID=store[0][2];
        var numberInOrder = store[0][3];
        var numberInOrder=numberInOrder.replace(/^.+_/,"");

        var movedID=movedID.concat("_");
        var movedID=movedID.concat(numberInOrder);
        var movedID=movedID.replace("beerButton","beerToBuyButton");
        var number = movedID.replace("beerToBuyButton", "");


        var oldDivID = "beerToBuyButtonContainer" + number;
        //alert([number, parentID, movedID])
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
    else if (store[0][0]=="removeBeer") {
        var dropElementID=store[0][1];
        var movedID=store[0][2];

        var numberInOrder = store[0][3];
        var numberInOrder=numberInOrder.replace(/^.+_/,"");


        var movedID=movedID.replace("_","");
        var movedID=movedID.replace(numberInOrder,"");
        var movedID=movedID.replace("beerToBuyButton","beerButton");
        var number = movedID.replace("beerButton", "");
        //console.log(dropElementID, movedID)
        // Create the new IDs
        var divID = "beerButtonContainer" + number;

        // Allow multiple selection of the same beer
        var newDivID = "beerToBuyButtonContainer" + number + "_" +
            findNextNumber("beerToBuyButtonContainer" + number + "_", 0);
        var newButtonID = "beerToBuyButton" + number + "_" +
            findNextNumber("beerToBuyButton" + number + "_", 0);

        // Drop just in the correct element (check done with the ID)

        $(divWayBeerToBuy).append(
            $("#" + divID).clone().empty().prop("id", newDivID)
        );
        $("#" + newDivID).append(
            $("#" + movedID).clone().prop("id", newButtonID)
        );


        /*
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
        */
    }
  //  alert(store)
    store_undo.unshift(store[0]);
    store.shift();
   // alert("Store: "+ store + "  Inviterad store: " + store_undo);
  // alert(store)
}

function redo() {
    //alert("Store: "+ store + "  Inviterad store: " + store_undo);
    if (store_undo[0][0] == "addBeer") {
        var parentID = store_undo[0][1];
        var movedID = store_undo[0][2];



        var number = movedID.replace("beerButton", "");
        // Create the new IDs
        var divID = "beerButtonContainer" + number;

        // Allow multiple selection of the same beer
        var newDivID = "beerToBuyButtonContainer" + number + "_" +
            findNextNumber("beerToBuyButtonContainer" + number + "_", 0);
        var newButtonID = "beerToBuyButton" + number + "_" +
            findNextNumber("beerToBuyButton" + number + "_", 0);


        $(divWayBeerToBuy).append(
            $("#" + divID).clone().empty().prop("id", newDivID)
        );
        // And add the new one!
        $("#" + newDivID).append(
            $("#" + movedID).clone().prop("id", newButtonID)
        );


    }
    else if (store_undo[0][0] == "removeBeer") {
        var parentID = store_undo[0][1];
        var movedID = store_undo[0][2];
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

    store.unshift(store_undo[0]);
    store_undo.shift();
}

function amount(){
    //function that sum up all the beers in the 'beers-to-buy'
    var sum = 0;

    var divToSearch = document.getElementById("beers-to-buy");
    console.log(divToSearch);
    if(divToSearch.hasChildNodes()){
        return sum;
    }
    else {
        var divsToSearch = divToSearch.childNodes;
        for (var i = 0; i < divsToSearch.length; i++) {
            console.log(divsToSearch[i].getData());
        }
    }

    return 5;
}
