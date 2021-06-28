import React from "react";
import model from "./model";
import Header from "./components/Header";
import Form from "./components/Form";
import GroceryList from "./components/GroceryList";
import { useState, useEffect } from "react";
import util from "./util";

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
        const foundItem = util.checkSameName(item, list);
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
        const foundItem = util.checkSameId(item, list);
        if (foundItem) {
            for (let key in foundItem) {
                foundItem[key] = item[key];
            }
            const newFoundItem = util.checkSameNameDiffId(foundItem, list);
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
        setMyList((prevList) => {
            prevList = prevList.filter((listItem) => {
                return listItem.itemName !== item.itemName;
            });
            return prevList;
        });
        return "Item Successfully Removed !";
    }

    return (
        <>
            <Header />
            <div className="main">
                <Form
                    currentForm={currentForm}
                    util={{
                        addGroceryListItem,
                        removeGroceryListItem,
                        updateGroceryListItem,
                        setCurrentForm,
                    }}
                />
                <GroceryList
                    util={{
                        addGroceryListItem,
                        removeGroceryListItem,
                        updateGroceryListItem,
                        setCurrentForm,
                    }}
                    list={myList}
                />
            </div>
        </>
    );
}

export default App;
