import React from "react";

export default function GroceryListItem({ util, listItem }) {
    function handleEditBtn(item) {
        util.setCurrentForm("edit");
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = item.itemName;
        form.querySelector("#inputItemQuantity").value = item.itemQuantity;
        form.setAttribute("itemId", item.itemId);
    }
    function handleDeleteBtn(item) {
        util.removeGroceryListItem(item);
    }
    return (
        <li
            className="grocery-list-item"
            itemname={listItem.itemName}
            itemquantity={listItem.itemQuantity}
            myitemid={listItem.itemId}
        >
            <p className="name">{listItem.itemName}</p>
            <p className="quantity">x {listItem.itemQuantity}</p>
            <button className="edit" onClick={() => handleEditBtn(listItem)}>
                Edit{" "}
            </button>
            <button
                className="delete"
                onClick={() => handleDeleteBtn(listItem)}
            >
                Delete
            </button>
        </li>
    );
}
