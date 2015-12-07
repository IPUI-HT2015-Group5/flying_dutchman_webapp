/**
 * Created by Sofie on 2015-12-07.
 */
function iObject() {
    this.i;
    return this;
}

var myObject=new iObject();
myObject.i=0;
var myObject2=new iObject();
myObject2.i=0;
array=new Array();
array=[];

function countclick(tag) {
    myObject.i++;
    var y=myObject.i;
    var x=tag.value;
    array[y]=x;
    alert("Click");
}

function undo(tag) {
    alert("Click");
    var z=array.length;
    z=z-1;
    tag.value=array[z];


}

function redo(tag) {

}
