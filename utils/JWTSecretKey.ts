export const jwtSecret: string = process.env.JWT_SK != undefined ? process.env.JWT_SK : "No Token Secret!";