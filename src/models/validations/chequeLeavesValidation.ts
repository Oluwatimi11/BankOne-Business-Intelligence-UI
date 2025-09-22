
import * as Yup from "yup";


export class ChequeLeavesValidation {
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



chequeId: Yup.number().min(0).required("ChequeId is required"),
leafNumber: Yup.number().min(0).required("LeafNumber is required"),
chequeStatus: Yup.number().min(0).required("ChequeStatus is required"),
};

static createChequeLeavesForm = Yup.object().shape({
...this.sharedSchema,
});

static updateChequeLeavesForm = Yup.object().shape({
...this.sharedSchema,
id: Yup.number().min(0).required("Id is required"),
});
}
