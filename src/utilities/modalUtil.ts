// modalUtil.ts

"use client"
import {modalStore} from "@/stores/modalStore";
import type {ModalEnum} from "@/utilities/enums/modalEnum";
import {v4 as uuidv4} from "uuid"
import {store} from "@/configs/storeConfig";


type ResolverEntry = {
    resolve: (data: any) => void;
    reject: (reason?: any) => void;
    submitted: boolean;

};

class ModalUtil {
    private resolvers: Record<string, ResolverEntry> = {};

    openModal<T = any>(modalType: ModalEnum, data?: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const modalId = uuidv4();
            this.resolvers[modalId] = {resolve, reject, submitted: false};

            store.dispatch(
                modalStore.mutation.openModal({
                    modalType,
                    modalId,
                    data,
                })
            );
        });
    }

    submitModal(modalId: string, submittedData: any) {
        const entry = this.resolvers[modalId];
        if (!entry) return;
        if (entry.submitted) return; // guard double submission
        entry.submitted = true;

        entry.resolve(submittedData);
        delete this.resolvers[modalId];
        // store.dispatch(modalStore.mutation.closeModal());
    }

    cancelModal(modalId: string) {
        const entry = this.resolvers[modalId];
        if (entry && !entry.submitted) {
            entry.submitted = true;
            // entry.reject(new Error('Modal canceled'));
        }
        delete this.resolvers[modalId];
        store.dispatch(modalStore.mutation.closeModal());
    }
}

export const modalUtil = new ModalUtil();
