const clear = document.querySelector(".clear");
const input0 = document.getElementsByClassName("item-input")[0];

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";

const options = { day: "numeric", month: "numeric", year: "numeric" };
const today = new Date();

function addListItem(listNumber, name) {
    listOflists = document.getElementsByClassName("list");
    const item = `
    <li id="listItem" class="listItem">
        <div class="checkmark">
            <i class="fa fa-circle-thin complete"></i>
        </div>
        <div class="title">
            <p>${name}</p>
        </div>
        <div class="deleteItem">
            <i class="fas fa-minus-square "></i>
        </div>
        <div class="description">
            <p>Add a description</p>
        </div>
        <div class="deadline">
            <p>Add a deadline</p>
        </div>
    </li>
    `;
    const position = "beforeend";
    listOflists[listNumber].children[1].insertAdjacentHTML(position, item)
}
addListItem(0, "New Item");
