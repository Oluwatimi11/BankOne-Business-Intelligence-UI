
import * as Yup from "yup";


export class ChequeBookStocksValidation {
static ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

static sharedSchema = {

dateCreated: Yup.string().default('1').notRequired(),
dateModified: Yup.string().default('1').notRequired(),
isDeleted: Yup.boolean().default(false).notRequired(),
version: Yup.string().default('1').notRequired(),
createdBy: Yup.string().default('').notRequired(),
createdByIp: Yup.string().default('').notRequired(),
modifiedBy: Yup.string().default('').notRequired(),
modifiedByIp: Yup.string().default('').notRequired(),
status: Yup.string().default('A').notRequired(),



batchNumber: Yup.string().required("BatchNumber is required"),
batchDescription: Yup.string().required("BatchDescription is required"),
numberOfBooklets: Yup.number().min(0).required("NumberOfBooklets is required"),
numberOfLeavesPerBooklet: Yup.number().min(0).required("NumberOfLeavesPerBooklet is required"),
unitCostOfBooklet: Yup.number().min(0).required("UnitCostOfBooklet is required"),
chequeStockStatus: Yup.number().min(0).required("ChequeStockStatus is required"),
numberOfBookletsIssued: Yup.number().min(0).required("NumberOfBookletsIssued is required"),
transactionBookType: Yup.number().min(0).required("TransactionBookType is required"),
};

static createChequeBookStocksForm = Yup.object().shape({
...this.sharedSchema,
});

static updateChequeBookStocksForm = Yup.object().shape({
...this.sharedSchema,
id: Yup.number().min(0).required("Id is required"),
});
}
