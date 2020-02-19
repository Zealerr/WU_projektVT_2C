// checkedmarker variables
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";

// function that adds an item in a specific list

// function that starts addListItem if there is something written




function removeListItem(listNumber, itemNumber) {
    listOflists = document.getElementsByClassName("list");
    list = listOflists[listNumber].children[1];
    const item = list[itemNumber]
}


let listsArray = [];

const addList = list => {
    listsArray.push([list]);
    localStorage.setItem("data", JSON.stringify(listsArray));
}

const addItem = (listIndex, itemName) => {
    if(listsArray[listIndex]){
        listsArray[listIndex].push(itemName);
        localStorage.setItem("data", JSON.stringify(listsArray));
    } else {
        console.log("There is no list at this index");
    }
}

