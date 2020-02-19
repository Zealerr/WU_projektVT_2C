let lists = []





// function that adds an item in a specific list
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
    </li>
    `;
    const position = "beforeend";
    listOflists[listNumber].children[1].insertAdjacentHTML(position, item);
}
