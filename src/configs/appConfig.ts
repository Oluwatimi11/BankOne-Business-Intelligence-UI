export type AppConfig = {
    baseUrlDev: string;
    baseUrlProd: string;
    stage: "Dev" | "Prod",
}
export const appConfig: AppConfig = {
    baseUrlDev: 'https://dashboardapi.mybankone.com/api',
    baseUrlProd: 'https://dashboardapi.mybankone.com/api',
    stage: "Dev",
}

// export const appConfig: AppConfig = {
//     baseUrlDev: 'http://localhost:5008/api',
//     baseUrlProd: 'http://localhost:5008/api',
//     stage: "Dev",
// }
