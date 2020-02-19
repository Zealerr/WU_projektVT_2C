// checkedmarker variables
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";

// function that adds an item in a specific list

// function that starts addListItem if there is something written


// list of all lists variable
let listsArray = [];

// function that adds a new list
const addList = list => {
    listsArray.push([list]);
    localStorage.setItem("data", JSON.stringify(listsArray));
}

// function that adds a new item into a specific list
const addItem = (listIndex, itemName) => {
    if(listsArray[listIndex]){
        listsArray[listIndex].push(itemName);
        localStorage.setItem("data", JSON.stringify(listsArray));
    } else {
        console.log("There is no list at this index");
    }
}

function clearData() {
    listsArray = [];
    localStorage.clearData();
}