const model = {
    // Model : Stores all list data and provides methods for access
    list: [],
    getListStorage: function () {
        let currList = localStorage.getItem("list");
        if (currList === null) {
            currList = [];
        } else {
            currList = JSON.parse(currList);
        }
        this.list = currList;
        return this.list;
    },
    setListStorage: function (newList) {
        this.list = newList;
        localStorage.setItem("list", JSON.stringify(newList));
        return "";
    },
};
export default model;
