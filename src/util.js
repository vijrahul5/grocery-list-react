const util ={
    checkSameName: function (item,list) {
        // Checks if there is an grocery list item with the same name already present
        const foundItem = list.find((listItem) => {
            return listItem.itemName === item.itemName;
        });
        return foundItem;
    },
    checkSameId: function (item,list) {
        // Checks if there is an grocery list item with the same id already present
        const foundItem = list.find((listItem) => {
            return listItem.itemId === item.itemId;
        });
        return foundItem;
    },
    checkSameNameDiffId :function (item,list) {
        // Checks if there is an grocery list item with the same name but different id already present
        const foundItem = list.find((listItem) => {
            return (
                listItem.itemName === item.itemName &&
                listItem.itemId !== item.itemId
            );
        });
        return foundItem;
    }
}
export default util;