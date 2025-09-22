
import type {ModalEnum} from "@/utilities/enums/modalEnum";
import {ViewTableRowDetailModalProps} from "@/components/ui/modal/ViewTableRowDetailModal";
import {ConfirmationModalProps} from "@/components/ui/modal/ConfirmationModal";

import {CreateOrUpdateChequeBooksModalProps} from "@/components/ui/modal/CreateOrUpdateChequeBooksModal";
import {CreateOrUpdateChequeBookStocksModalProps} from "@/components/ui/modal/CreateOrUpdateChequeBookStocksModal";
import {CreateOrUpdateChequeLeavesModalProps} from "@/components/ui/modal/CreateOrUpdateChequeLeavesModal";
import {CreateOrUpdateReturnedChequesModalProps} from "@/components/ui/modal/CreateOrUpdateReturnedChequesModal";
declare module "qore-components" {
interface ModalRegistry {
[ModalEnum.ConfirmationModal]: {
data: ConfirmationModalProps;
result: boolean;
};
[ModalEnum.FormErrorModal]: {
data: FormErrorModalData;
result: boolean;
};
[ModalEnum.ViewTableRowDetailModal]: {
data: ViewTableRowDetailModalProps;
result: boolean;
};

[ModalEnum.CreateOrUpdateChequeBooksModal]: {
 data: CreateOrUpdateChequeBooksModalProps;
 result: boolean;
 };
[ModalEnum.CreateOrUpdateChequeBookStocksModal]: {
 data: CreateOrUpdateChequeBookStocksModalProps;
 result: boolean;
 };
[ModalEnum.CreateOrUpdateChequeLeavesModal]: {
 data: CreateOrUpdateChequeLeavesModalProps;
 result: boolean;
 };
[ModalEnum.CreateOrUpdateReturnedChequesModal]: {
 data: CreateOrUpdateReturnedChequesModalProps;
 result: boolean;
 };
}
}
