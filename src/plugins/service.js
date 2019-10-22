import store from "../store";
import axios from "axios";

const dataConfig = "virtual"

const data = {
    //example
    dataName:{
        key: "value"
    }
}

export default {
    //example
    FuncName: async (listarg, arg1, arg2) => {
        if (dataConfig == "virtual")
            return data.dataName
        const res = await axios.post("/api/xxx", {
            listarg: JSON.stringify(listarg),
            arg1: arg1,
            arg2: arg2
        })
        if (res.data.code == "200")
            return res.data.data
        else
            return false
    }

    


}