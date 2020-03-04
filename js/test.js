// checkedmarker variables
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const content = document.getElementsByClassName("content")[0]
const last = "beforeend";
const penultimate = "";
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
// both into local storage and on the site
const addList = list => {
    getData();
    listsArray.push([list]);
    setData();
    frontendAddlist(list, listsArray.length - 1)
}

// function that removes a list
const removeList = (listIndex) => {
    getData();
    listsArray.splice(listIndex, 1);
    let lists = document.getElementsByClassName("list");
    lists[listIndex].remove();
    setData();
}

// function that adds a new item into a specific list
// both into local storage and on the site
const addItem = (listIndex, itemName) => {
    getData();
    if (listsArray[listIndex]) {
        listsArray[listIndex].push(itemName);
        setData();
    } else {
        console.log("There is no list at this index");
        return
    }
    frontendAdditem(itemName, listIndex)
}

// funtion that  removes an item
const removeItem = (listIndex, itemIndex) => {
    getData();
    listsArray[listIndex].splice(itemIndex, 1);
    let list = document.getElementsByClassName("list")[listIndex].children[1].children;
    console.log(list[itemIndex - 2]);
    console.log(itemIndex);
    list[itemIndex - 1].remove();
    setData();
}

// function that clears all stored data and sets
// listsArray back to []
function clearData() {
    listsArray = [];
    localStorage.clear();
    let lists = document.getElementsByClassName("list");
    if (lists.length > 0) {
        while (lists.length > 0) {
            lists[0].remove();
        }
    }
}

// change html by adding a new list
function frontendAddlist(listName, index) {
    const list = `
                <section class="list-holder">
                    <section class="list">
                        <div class="listTitle">
                            <p>${listName}</p>
                            <div class="deleteList">
                                <i class="fas fa-minus-square "></i>
                            </div>
                        </div>
                        
                        <ul>
                        </ul>
                        <div class="add-item">
                            <label for="${listName}"><i class="fas fa-plus-circle fa-2x" aria-hidden="true"></i></label>
                            <input class="item-input" type="text" id="${listName}" placeholder="Add a list item">
                        </div>
                    </section>
                </section>
                `;
    content.insertAdjacentHTML(last, list);
    addDeleteListListener(index)
}

// change html by adding a new item into a 
// specific list
function frontendAdditem(itemName, listIndex){
    const item = `
                <li class="listItem">
                    <div class="checkmark">
                        <i class="fa fa-circle-thin complete"></i>
                    </div>
                    <div class="title">
                        <p>${itemName}</p>
                    </div>
                    <div class="deleteItem">
                        <i class="fas fa-minus-square "></i>
                    </div>
                </li>            
                `;
    let list = document.getElementsByClassName("list")[listIndex].children[1];
    
    list.insertAdjacentHTML(last, item);
    addDeleteItemListener(listIndex);
}

// load all data stored
window.onload = loadlists();

// function that gets data from local storage
// and iterates trough all the data
function loadlists(){
    getData();
    listsArray.forEach(loadlist);
}

// function that loads list name and all its items
function loadlist(value, index) {
    frontendAddlist(value[0], index);
    for (i = 1; i < value.length; i++) {
        frontendAdditem(value[i], index);
    }
}

// Eventlisteners
function addDeleteListListener(i) {
    let newList = document.getElementsByClassName("list");
    let deleteListButton = newList[newList.length - 1].children[0].children[1]
    console.log(deleteListButton);
    deleteListButton.addEventListener("click", function() { removeList(i); });
}

function addDeleteItemListener(listIndex) {
    let list = document.getElementsByClassName("list")[listIndex].children[1].children;
    let deleteItemButton = list[list.length - 1].children[2];
    console.log(deleteItemButton);
    console.log(list.length)
    deleteItemButton.addEventListener("click", function() { removeItem(listIndex, list.length) })
}