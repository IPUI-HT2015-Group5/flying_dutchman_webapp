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
    $("#amount").text(amount());
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
    $("#amount").text(amount());
    countclick("removeBeer", parentID, movedID,oldDivID);
}


store=[]; //Stores what have been done
store_undo=[]; //Stores what have been un-done
var divWayBeerToBuy;


function countclick(funcName, parentID, movedID, numberOfBeers) {
    store.unshift([funcName,parentID, movedID, numberOfBeers]);
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
        var noBeer = store[0][3];
        noBeer=noBeer.replace(/^.+_/,"")
        var movedID=movedID.concat("_" + noBeer);
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
        var noBeer = store[0][3];
        noBeer=noBeer.replace(/^.+_/,"")
        var movedID=movedID.replace("_","");
        movedID=movedID.replace(noBeer,"");
        var movedID=movedID.replace("beerToBuyButton","beerButton");
        var number = movedID.replace("beerButton", "");

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



    }
    $("#amount").text(amount());
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
    $("#amount").text(amount());
    store.unshift(store_undo[0]);
    store_undo.shift();
}

function clearAllBeers(beersContainerID) {

    if (localStorage.getItem("language") == "english") {
        if (confirm("Do you want to remove all the beers? This operation can't be undone!"))
            $("#" + beersContainerID).empty();
        $("#amount").text(amount());
    } else {
        if (confirm("Är du säker på att du vill ta bort alla öl? Detta kan inte ångras!"))
            $("#" + beersContainerID).empty();
        $("#amount").text(amount());

    }


}

function buyAllBeers(beersContainerID) {
    $("#amount").text(amount());
    if (localStorage.getItem("language") == "english") {
        if (confirm("You order has been placed, please go and collect your order."))
            $("#" + beersContainerID).empty();
    } else {
        if (confirm("Beställningen är mottagen, vänligen hämta din beställning."))
            $("#" + beersContainerID).empty();
    }
   if (confirm("Do you want to remove all the beers? This operation can't be undone!"))
        $("#" + beersContainerID).empty();

}

function amount(){
    //function that sum up all the beers in the 'beers-to-buy'
    var sum = 0;


    var parent = document.getElementById("beers-to-buy");


   var child = parent.childNodes[1];

    while(child !== null) {


        var x = child.innerText;
        if (x != undefined) {
            var partSum = x.replace(/^.+:/,"");
            partSum = partSum.replace(" ","");

            //console.log("PartSum: ", partSum);
            var pSum = parseFloat(partSum);
            sum=sum+pSum;
        }
        var child = child.nextSibling;


    }

    return sum.toFixed(2);
}
