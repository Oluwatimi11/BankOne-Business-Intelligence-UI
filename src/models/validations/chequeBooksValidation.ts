
import * as Yup from "yup";


export class ChequeBooksValidation {
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



chequeBookStockId: Yup.number().min(0).required("ChequeBookStockId is required"),
dateIssued: Yup.string().required("DateIssued is required"),
accountId: Yup.number().min(0).required("AccountId is required"),
startChequeRange: Yup.number().min(0).required("StartChequeRange is required"),
financialDate: Yup.string().required("FinancialDate is required"),
batchHotlistedOrStopped: Yup.string().required("BatchHotlistedOrStopped is required"),
numberOfLeaves: Yup.number().min(0).required("NumberOfLeaves is required"),
batchNumber: Yup.string().required("BatchNumber is required"),
transactionBookType: Yup.number().min(0).required("TransactionBookType is required"),
};

static createChequeBooksForm = Yup.object().shape({
...this.sharedSchema,
});

static updateChequeBooksForm = Yup.object().shape({
...this.sharedSchema,
id: Yup.number().min(0).required("Id is required"),
});
}
