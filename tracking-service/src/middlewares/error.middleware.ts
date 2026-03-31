import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error occurred:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
