// checkedmarker variables
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const content = document.getElementsByClassName("content")[0];
const last = "beforeend";
// list of all lists variable set to []
let listsArray = [];

// function to set listsArray to the locally stored data. If no data
// is stored then listsArray is not changed
function getData() {
    if (JSON.parse(localStorage.getItem("data")) !== null) {
        listsArray = JSON.parse(localStorage.getItem("data"));
    }
}

// function that sets localstorage variable to what listsArray is
function setData() {
    localStorage.setItem("data", JSON.stringify(listsArray));
}

// function that adds a new list
// both into local storage and on the site
const addList = listName => {
    getData();
    if (listsArray.length < 10) {
        let list = {
            name: `${listName}`,
            id: `${listsArray.length}`
        };
        listsArray.push([list]);
        setData();
        frontendAddlist(list, listsArray.length - 1);
        frontendAddLink(list);
        scrollToLatest();
    }
};

// function that removes a list
function removeList(id) {
    getData();
    let listLength = listsArray.length;
    for (let i = 0; i < listLength; i++) {
        if (listsArray[i][0].id == id) {
            listsArray.splice(i, 1);
            break;
        }
    }
    let list = document.getElementById(`${id}`);
    console.log(list);
    list.remove();
    setData();
    let link = document.getElementById(`for-list${id}`)
    link.remove();
}

// function that adds a new item into a specific list
// both into local storage and on the site
const addItem = (listObject, itemName) => {
    getData();
    let listIndex;
    let lists = document.getElementsByClassName("list-holder");
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].id == listObject.id) {
            listIndex = i;
        }
    }
    if (document.getElementById(`${listObject.id}`)) {
        item = {
            name: itemName,
            id: `${listIndex}${listsArray[listIndex].length}`,
            done: false
        };
        listsArray[listIndex].push(item);
        setData();
    } else {
        console.log("There is no list at this index");
        return
    }
    frontendAdditem(listsArray[listIndex][listsArray[listIndex].length - 1], listIndex);
}

// funtion that  removes an item
function removeItem(listId, id) {
    getData();
    console.log(id);
    for (let i = 0; i < listsArray.length; i++) {
        if (listsArray[i][0].id == listId) {
            console.log(listsArray[i][0].id);
            for (let y = 1; y < listsArray[i].length; y++) {
                if (listsArray[i][y].id == id) {
                    console.log(listsArray[i][y]);
                    listsArray[i].splice(y, 1);
                    break
                }
            }
            break
        }
    }
    let item = document.getElementById(`${id}`)
    item.remove();
    setData();
}

// function that clears all stored data and sets
// listsArray back to [] and clears the site
function clearData() {
    listsArray = [];
    localStorage.clear();
    let lists = document.getElementsByClassName("list-holder");
    if (lists.length > 0) {
        while (lists.length > 0) {
            lists[0].remove();
        }
    }
    let quickmenu = document.getElementsByClassName("quickmenu")[0].children;
    for (let i = quickmenu.length - 1; i > 0; i--) {
        quickmenu[i].remove();
    }
}

// change html by adding a new list
function frontendAddlist(listObject) {
    const list = `
                <section id=${listObject.id} class="list-holder">
                    <section class="list">
                        <div class="listTitle">
                            <h1>${listObject.name}</h1>
                            <div class="deleteList">
                                <i class="fas fa-minus-square "></i>
                            </div>
                        </div>
                        <ul>
                        </ul>
                        <div class="add-item">
                            <i class="fas fa-plus-circle fa-2x" aria-hidden="true"></i>
                            <input class="item-input" type="text" placeholder="Add a list item">
                        </div>
                    </section>
                </section>
                `;
    content.insertAdjacentHTML(last, list);
    deleteListListeners(listObject.id);

}

// change html by adding a new item into a 
// specific list
function frontendAdditem(itemObject, listIndex) {
    const DONE = itemObject.done ? CHECK : UNCHECK;
    const LINE = itemObject.done ? "line" : "";
    const item = `
                <li id=${itemObject.id} class="listItem" >
                    <div class="checkmark">
                        <i class="fa ${DONE} complete"></i>
                    </div>
                    <div class="title">
                        <p class=${LINE}>${itemObject.name}</p>
                    </div>
                    <div class="deleteItem">
                        <i class="fas fa-minus-square "></i>
                    </div>
                </li>            
                `;
    let list = document.getElementsByClassName("list")[listIndex].children[1];
    list.insertAdjacentHTML(last, item);
    deleteItemListeners(listIndex, itemObject.id);
    checkerListener(itemObject);
}

// function that adds a link to navigation
function frontendAddLink(listObject) {
    const link = `
                <a id="for-list${listObject.id}" href="#${listObject.id}">
                    <div class="current-list">
                        <i class="fa fa-circle-thin fa-2x"></i>
                    </div>
                </a>
                `;
    quickmenu = document.getElementsByClassName("quickmenu")[0];
    quickmenu.insertAdjacentHTML(last, link);
    addItemInputListener(listObject);
}

// function that checks / unchecks an item
function checkItem(itemObject) {
    getData();
    console.log(itemObject.id.slice(1));
    item = listsArray[itemObject.id[0]][itemObject.id.slice(1)];
    if (itemObject.done) {
        itemObject.done = false;
        item.done = false;
    } else {
        itemObject.done = true;
        item.done = true;
    }
    setData();
}

// load all data stored
window.onload = startFunctionLoad();

// function that gets data from local storage
// and iterates trough all the data
function startFunctionLoad() {
    getData();
    listsArray.forEach(loadlist);
    listPopupListener();
    infoPopupListener();
    clearDataButtonListener();
    for (let i = 0; i < listsArray.length; i++) {
        listsArray[i][0].id = `${i}`;
        for (let y = 1; y < listsArray[i].length; y++) {
            listsArray[i][y].id = `${i}${y}`
        }
    }
}

// function that loads each list, it's link and all its items
function loadlist(value, index) {
    frontendAddlist(value[0]);
    frontendAddLink(value[0]);
    for (i = 1; i < value.length; i++) {
        frontendAdditem(value[i], index);
    }
    setData()
}

// Eventlisteners

// list specific
function deleteListListeners(id) {
    if(listsArray.length > 0) {
        let newList = document.getElementsByClassName("list");
        let deleteListButton = newList[newList.length - 1].children[0].children[1];
        deleteListButton.addEventListener("click", function () {
            removeList(id);
        });
    }
}

function addItemInputListener(listObject) {
    let inputButton = document.getElementById(`${listObject.id}`).children[0].children[2].children;
    inputButton[0].addEventListener("click", function () {
        if (inputButton[1].value) {
            addItem(listObject, inputButton[1].value);
            inputButton[1].value = "";
        }
    });
    inputButton[1].addEventListener("keyup", function(event) {
        if (event.keyCode == 13) {
            if (inputButton[1].value) {
                addItem(listObject, inputButton[1].value);
                inputButton[1].value = "";
            }
        }
    });
}

// list item specific
function deleteItemListeners(listIndex, id) {
    let listId = document.getElementsByClassName("list-holder")[listIndex].id;
    let list = document.getElementById(`${listId}`).children[0].children[1].children;
    deleteItemButton = list[list.length - 1].children[2];
    deleteItemButton.addEventListener("click", function () { removeItem(listId, id); })
}

function checkerListener(itemObject) {  
    let item = document.getElementById(`${itemObject.id}`);
    let checkmark = item.children[0];
    
    checkmark.addEventListener("click", function() {
        checkItem(itemObject);
        if (itemObject.done) {
            checkmark.children[0].classList.add(`${CHECK}`);
            checkmark.children[0].classList.remove(`${UNCHECK}`);
        } else {
            checkmark.children[0].classList.add(`${UNCHECK}`);
            checkmark.children[0].classList.remove(`${CHECK}`);
        }
        item.children[1].children[0].classList.toggle("line");
    });
}


// add list pop-up listener
function listPopupListener() {
    let listButton = document.getElementsByClassName("newListButton")[0];
    let listPopup = document.getElementsByClassName("newlist-popup")[0];
    let listClosePopup = listPopup.children[0].children[0];
    let listPopupAdd = listPopup.children[0].children[1];
    let listPopupInput = listPopup.children[0].children[2];
    let plusButton = document.getElementsByClassName("addlist-plus")[0];
    let clearDataPopup = document.getElementsByClassName("clear-popup")[0];

    listButton.addEventListener("click", function () {
        if(clearDataPopup.classList.contains("closed")) {
            listPopup.classList.toggle("closed");
            listPopupInput.focus();
        } else {
            clearDataPopup.classList.toggle("closed");
            listPopup.classList.toggle("closed");
            listPopupInput.focus();
        }
    });
    plusButton.addEventListener("click", function () {
        if(clearDataPopup.classList.contains("closed")) {
            listPopup.classList.toggle("closed");
            listPopupInput.focus();
        } else {
            clearDataPopup.classList.toggle("closed");
            listPopup.classList.toggle("closed");
            listPopupInput.focus();
        }
    });
    listClosePopup.addEventListener("click", function () {
        listPopup.classList.add("closed");
        
        listPopupInput.value = "";
    });
    listPopupAdd.addEventListener("click", function () {
        if (listPopupInput.value) {
            addList(listPopupInput.value);
            listPopup.classList.add("closed");
            listPopupInput.value = "";
        }
    });
}

// add info pop-up listeners
function infoPopupListener() {
    let infoButton = document.getElementsByClassName("info-button")[0];
    let infoPopup = document.getElementsByClassName("info")[0];
    let closeInfoPupup = infoPopup.children[0].children[0];
    infoButton.addEventListener("click", function () {
        infoPopup.classList.remove("closed");
    });
    closeInfoPupup.addEventListener("click", function () {
        infoPopup.classList.add("closed");
    });
}

// add clear data button listener
function clearDataButtonListener() {
    let clearDataButton = document.getElementsByClassName("clear")[0];
    let clearDataPopup = document.getElementsByClassName("clear-popup")[0];
    let closeDataPopup = clearDataPopup.children[0].children[2];
    let deleteDataButton = clearDataPopup.children[0].children[1];
    let listPopup = document.getElementsByClassName("newlist-popup")[0];

    clearDataButton.addEventListener("click", function() {
        if(listPopup.classList.contains("closed")) {
            clearDataPopup.classList.toggle("closed");
        } else {
            clearDataPopup.classList.toggle("closed");
            listPopup.classList.toggle("closed");
        }
    });
    closeDataPopup.addEventListener("click", function() {
        clearDataPopup.classList.add("closed");
    });
    deleteDataButton.addEventListener("click", function() {
        clearData();
        clearDataPopup.classList.add("closed");
    });


}

// function that scrolls to newest list
function scrollToLatest() {
    let scrollWidth = content.scrollWidth;
    content.scrollLeft = scrollWidth;
}

// header navigation color
function LinkColorChange() {
    let scrollWidth = content.scrollWidth;
    let scrollPercent = content.scrollLeft / scrollWidth;
    let links = document.getElementsByClassName("quickmenu")[0].children;
    let index = Math.round(links.length * scrollPercent);
    if (document.getElementsByClassName("active")[0] != links[index]) {
        if (document.getElementsByClassName("active")[0]) {
            let currentlyActive = document.getElementsByClassName("active")[0];
            currentlyActive.classList.toggle("active");
        }
        links[index].classList.toggle("active");
    }
}
setInterval(LinkColorChange, 100);

