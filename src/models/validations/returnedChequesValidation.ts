
import * as Yup from "yup";


export class ReturnedChequesValidation {
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



branchId: Yup.number().min(0).required("BranchId is required"),
payerName: Yup.string().required("PayerName is required"),
payerAccountNumber: Yup.string().required("PayerAccountNumber is required"),
amount: Yup.number().min(0).required("Amount is required"),
beneficiaryName: Yup.string().required("BeneficiaryName is required"),
howCaseWasResolved: Yup.string().required("HowCaseWasResolved is required"),
remarks: Yup.string().required("Remarks is required"),
datePresented: Yup.string().required("DatePresented is required"),
poster: Yup.string().required("Poster is required"),
accountBalanceOnDatePresented: Yup.number().min(0).required("AccountBalanceOnDatePresented is required"),
};

static createReturnedChequesForm = Yup.object().shape({
...this.sharedSchema,
});

static updateReturnedChequesForm = Yup.object().shape({
...this.sharedSchema,
id: Yup.number().min(0).required("Id is required"),
});
}
