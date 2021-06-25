import React from "react";
import model from "./model";
import Header from "./components/Header";
import Form from "./components/Form";
import GroceryList from "./components/GroceryList";
import { useState, useEffect } from "react";

function App() {
    const [myList, setMyList] = useState(model.getListStorage());
    const [currentForm, setCurrentForm] = useState("add");

    useEffect(() => {
        setMyList(model.getListStorage());
    }, []);

    useEffect(() => {
        model.setListStorage(myList);
        console.log(myList);
    }, [myList]);

    function addGroceryListItem(item) {
        // Adds a Grocery List Item to the Grocery List
        let list = model.list;
        const foundItem = checkSameName(item);
        if (foundItem) {
            item.itemQuantity += foundItem.itemQuantity;
            item.itemId = foundItem.itemId;
            updateGroceryListItem(item);
            return "Quantity Incremented Successfully !";
        } else {
            item.itemId = Date.now().toString();
            setMyList((prevList) => {
                return [...prevList, item];
            });
            return "Item Added Successfully !";
        }
    }
    function updateGroceryListItem(item) {
        // Updates a Grocery List Item present in the Grocery List
        let list = model.list;
        const foundItem = checkSameId(item);
        if (foundItem) {
            for (let key in foundItem) {
                foundItem[key] = item[key];
            }
            const newFoundItem = checkSameNameDiffId(foundItem);
            if (newFoundItem) {
                return "Cannot Have Two Items With Same Name !";
            }
            const indexOfFoundItem = list.indexOf(foundItem);
            setMyList((prevList) => {
                prevList[indexOfFoundItem] = item;
                return [...prevList];
            });
        } else {
            return "The Item Does Not Exist In The List !";
        }
        return "Successfully Updated !";
    }
    function removeGroceryListItem(item) {
        // Removes a Grocery List Item present in the Grocery List
        console.log(item);
        setMyList((prevList) => {
            prevList = prevList.filter((listItem) => {
                return listItem.itemName !== item.itemName;
            });
            console.log(prevList);
            return prevList;
        });
        return "Item Successfully Removed !";
    }
    function checkSameName(item) {
        // Checks if there is an grocery list item with the same name already present
        let list = model.list;
        const foundItem = list.find((listItem) => {
            return listItem.itemName === item.itemName;
        });
        return foundItem;
    }
    function checkSameId(item) {
        // Checks if there is an grocery list item with the same id already present
        let list = model.list;
        const foundItem = list.find((listItem) => {
            return listItem.itemId === item.itemId;
        });
        return foundItem;
    }
    function checkSameNameDiffId(item) {
        // Checks if there is an grocery list item with the same name but different id already present
        let list = model.list;
        const foundItem = list.find((listItem) => {
            return (
                listItem.itemName === item.itemName &&
                listItem.itemId !== item.itemId
            );
        });
        return foundItem;
    }
    function handleEditBtn(item) {
        setCurrentForm("edit");
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = item.itemName;
        form.querySelector("#inputItemQuantity").value = item.itemQuantity;
        form.setAttribute("itemId", item.itemId);
    }
    function handleDeleteBtn(item) {
        console.log("delete");
        console.log(item);
        removeGroceryListItem(item);
    }
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
        addGroceryListItem(item);
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
        updateGroceryListItem(item);
        setCurrentForm("add");
    }
    function handleFormCancelBtn() {
        setCurrentForm("add");
        const form = document.querySelector(".form-holder>form");
        form.querySelector("#inputItemName").value = "";
        form.querySelector("#inputItemQuantity").value = "";
    }
    return (
        <>
            <Header />
            <div className="main">
                <Form
                    currentForm={currentForm}
                    util={{
                        handleFormCancelBtn,
                        handleFormSaveBtn,
                        handleFormAddBtn,
                    }}
                />
                <GroceryList
                    util={{ handleEditBtn, handleDeleteBtn }}
                    list={myList}
                />
            </div>
        </>
    );
}

export default App;
