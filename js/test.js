// checkedmarker variables
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
// list of all lists variable set to []
let listsArray = [];

// function to set listsArray to the locally stored data. If no data
// is stored then listsArray is not changed
function getData() {
    if (JSON.parse(localStorage.getItem("data")) != null) {
        listsArray = JSON.parse(localStorage.getItem("data"));
    }
}

// function that sets localstorage variable to listsArray
function setData() {
    localStorage.setItem("data", JSON.stringify(listsArray));
}

// function that adds a new list
const addList = list => {
    getData();
    listsArray.push([list]);
    setData();
}

// function that adds a new item into a specific list
const addItem = (listIndex, itemName) => {
    getData();
    if (listsArray[listIndex]) {
        listsArray[listIndex].push(itemName);
        setData();
    } else {
        console.log("There is no list at this index");
    }
}

// function that removes a list
const removeList = (listIndex) => {
    getData;
    listsArray.splice(listIndex);
    setData();
}

// function that clears all stored data and sets listsArray back to []
function clearData() {
    listsArray = [];
    localStorage.clearData();
}
