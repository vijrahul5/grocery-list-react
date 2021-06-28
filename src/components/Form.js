import React from "react";

export default function Form({ currentForm, util }) {
    function handleFormAddBtn(event) {
        const data = new FormData(event.target);
        const item = Object.fromEntries(data.entries());
        if (item.itemName === "" || item.itemQuantity === "") {
            alert("Please Fill All The Fields");
            return;
        }
        item.itemName = item.itemName.toUpperCase();
        item.itemQuantity = parseInt(item.itemQuantity, 10);
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = "";
        form.querySelector("#inputItemQuantity").value = "";
        util.addGroceryListItem(item);
    }
    function handleFormSaveBtn(event) {
        const data = new FormData(event.target);
        const item = Object.fromEntries(data.entries());
        if (item.itemName === "" || item.itemQuantity === "") {
            alert("Please Fill All The Fields");
            return;
        }
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = "";
        form.querySelector("#inputItemQuantity").value = "";
        item.itemName = item.itemName.toUpperCase();
        item.itemQuantity = parseInt(item.itemQuantity, 10);
        item.itemId = form.getAttribute("itemId");
        util.updateGroceryListItem(item);
        util.setCurrentForm("add");
    }
    function handleFormCancelBtn() {
        util.setCurrentForm("add");
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = "";
        form.querySelector("#inputItemQuantity").value = "";
    }
    return (
        <div className="form-section">
            <div className="form-section-title">
                {currentForm === "add" ? <p>Add Item</p> : <p>Edit Item</p>}
            </div>
            <div
                className="form-holder"
                id="form-holder"
                onSubmit={
                    currentForm === "add"
                        ? (e) => {
                              e.preventDefault();
                              handleFormAddBtn(e);
                          }
                        : (e) => {
                              e.preventDefault();
                              handleFormSaveBtn(e);
                          }
                }
            >
                <form action="">
                    <input
                        type="text"
                        name="itemName"
                        placeholder="Item Name"
                        id="inputItemName"
                    />
                    <input
                        type="number"
                        name="itemQuantity"
                        placeholder="Item Quantity"
                        id="inputItemQuantity"
                        min="1"
                    />
                    <input
                        type="submit"
                        id="inputItem"
                        value={currentForm === "add" ? "Add" : "Save"}
                    />
                    {currentForm === "edit" ? (
                        <button
                            className="cancelBtn"
                            type="button"
                            onClick={handleFormCancelBtn}
                        >
                            Cancel
                        </button>
                    ) : null}
                </form>
            </div>
        </div>
    );
}
