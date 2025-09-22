import { ValidatorResponse } from "@/models"

const inputValidator = (data: any, exemptedPropertes?: string[]): ValidatorResponse => {
    const result = <ValidatorResponse>{ isValidated: true }
    for (const key in data) {
        if (!data[key] && !exemptedPropertes?.includes(key)) {
            result.isValidated = false;
            result.message = `Input: Kindly provide ${key}`
            break;
        }
    }
    console.log({result})
    return result
} 

const validateEmail = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

const searchTableData = (tableData: any, searchText: string) => {
    let result = []

    for (const obj of tableData) {
        for (const key in obj) {
            if (String(obj[key]).toLowerCase().includes(searchText.toLowerCase())) {
                result.push(obj)
                break;
            }
        }
    }

    if (result.length < 1) {
        result = tableData
    }

    return result
}

const getChartInfo = (data: any, propertiesToExtract: Array<string>) => {
    const formattedData: any = {}

    if (Array.isArray(data)) {
        for (const item of data) {
            for (const property of propertiesToExtract) {
                if (!formattedData[property]) {
                    formattedData[property] = []
                }

                formattedData[property].push(item[property])
            }
        }
    }

    return formattedData;
}

const wait = (time: number) => new Promise(res => setTimeout(res, time))

export default {
    inputValidator,
    validateEmail,
    searchTableData,
    getChartInfo,
    wait
}