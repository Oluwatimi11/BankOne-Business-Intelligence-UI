import React from "react";
import {StringUtil} from "@/utilities/stringUtil";
import {TimeUtil} from "@/utilities/timeUtil";
import styles from "./detailListCard.module.scss";
import {Typography} from "qore-components";

export type DetailItem = {
    label: string;
    value: string | number | boolean;
};

type DetailListCardProps = {
    items: DetailItem[];
    title?: string;
};

const DetailListCard = ({items, title}: DetailListCardProps) => (
    <div className={styles.container}>
        {title && (
            <Typography weight="medium" size="md" className={styles.title}>
                {title}
            </Typography>
        )}

        <div className={styles.card}>
            {items.map((detail, index) => {
                const detailValue = typeof detail.value == "boolean" ? String(detail.value) : detail.value
                return (
                    <div key={index} className={styles.item}>
                        <Typography weight="medium" className={styles.label}>
                            {StringUtil.convertToSentenceCase(detail.label)}
                        </Typography>
                        <Typography weight="regular" className={styles.value}>
                            {TimeUtil.isValidDate(detailValue)
                                ? TimeUtil.getFormatDateTime(detailValue).fullFormattedDateTime
                                : StringUtil.convertToSentenceCase(String(detailValue))}
                        </Typography>
                    </div>
                )
            })}
        </div>
    </div>
);

export default DetailListCard;
