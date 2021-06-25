import React from "react";
import GroceryListItem from "./GroceryListItem";
export default function GroceryList({ util, list }) {
    return (
        <div className="grocery">
            <div className="grocery-title">Grocery List</div>
            <div className="grocery-holder">
                <ul className="grocery-list">
                    {list.map((listItem) => {
                        return (
                            <GroceryListItem
                                util={util}
                                listItem={listItem}
                                key={listItem.itemId}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
