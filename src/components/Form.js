import React from "react";

export default function Form({ currentForm, util }) {
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
                              util.handleFormAddBtn(e);
                          }
                        : (e) => {
                              e.preventDefault();
                              util.handleFormSaveBtn(e);
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
                            onClick={util.handleFormCancelBtn}
                        >
                            Cancel
                        </button>
                    ) : null}
                </form>
            </div>
        </div>
    );
}
