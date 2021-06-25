import React from "react";

export default function GroceryListItem({ util, listItem }) {
    return (
        <li
            className="grocery-list-item"
            itemname={listItem.itemName}
            itemquantity={listItem.itemQuantity}
            myitemid={listItem.itemId}
        >
            <p className="name">{listItem.itemName}</p>
            <p className="quantity">x {listItem.itemQuantity}</p>
            <button
                className="edit"
                onClick={() => util.handleEditBtn(listItem)}
            >
                Edit{" "}
            </button>
            <button
                className="delete"
                onClick={() => util.handleDeleteBtn(listItem)}
            >
                Delete
            </button>
        </li>
    );
}
