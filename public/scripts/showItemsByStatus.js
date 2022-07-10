import {displayData} from "./index.js";

export const showItemsByStatus = (data) => {const updatedData = data.find((item, i) => i === Number(id));
if (updatedData) {
    updatedData.completed = 1;
}
displayData(data);

}