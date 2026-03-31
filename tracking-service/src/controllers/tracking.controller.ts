import { Request, Response, NextFunction } from "express";
import { trackingService } from "../services/tracking.service";
import { CargoStatus } from "@prisma/client";
import Joi from "joi";

// Existing Schemas
const updateSchema = Joi.object({
    cargoId: Joi.string().required(),
    location: Joi.string().required(),
});

// New Schemas
const createSchema = Joi.object({
    cargoId: Joi.string().required(),
    initialLocation: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
    status: Joi.string().valid("PENDING", "PROCESSING", "IN_TRANSIT", "ARRIVED", "DELAYED", "DELIVERED").required(),
});

// Controllers

export const createTracking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = createSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const tracking = await trackingService.createTracking(value.cargoId, value.initialLocation);
        res.status(201).json({ success: true, message: "Tracking record created", data: tracking });
    } catch (err: any) {
        if (err.code === "P2002") {
            return res.status(409).json({ success: false, message: "Tracking record already exists for this cargo" });
        }
        next(err);
    }
}

export const updateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = updateSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const tracking = await trackingService.updateLocation(value.cargoId, value.location);
        res.status(200).json({ success: true, message: "Location updated successfully", data: tracking });
    } catch (err: any) {
        if (err.message && err.message.includes("not found")) {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
};

export const getAllTrackings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trackings = await trackingService.getAllTrackings();
        res.status(200).json({ success: true, data: trackings });
    } catch (err) {
        next(err);
    }
}

export const deleteTracking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cargoId = req.params.cargoId as string;
        await trackingService.deleteTracking(cargoId);
        res.status(200).json({ success: true, message: "Tracking record deleted successfully" });
    } catch (err: any) {
        if (err.code === "P2025") {
            return res.status(404).json({ success: false, message: "Tracking record not found to delete" });
        }
        next(err);
    }
}

export const markAsDelivered = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cargoId = req.params.cargoId as string;
        const tracking = await trackingService.markAsDelivered(cargoId);
        res.status(200).json({ success: true, message: "Cargo marked as delivered", data: tracking });
    } catch (err: any) {
        if (err.code === "P2025") {
            return res.status(404).json({ success: false, message: "Tracking record not found" });
        }
        next(err);
    }
}

export const updateStatusManually = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cargoId = req.params.cargoId as string;
        const { error, value } = updateStatusSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const tracking = await trackingService.updateStatusManually(cargoId, value.status as CargoStatus);
        res.status(200).json({ success: true, message: "Status manually updated", data: tracking });
    } catch (err: any) {
        if (err.code === "P2025") {
            return res.status(404).json({ success: false, message: "Tracking record not found" });
        }
        next(err);
    }
}

export const getByLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const location = req.params.location as string;
        const trackings = await trackingService.getByLocation(location);
        res.status(200).json({ success: true, data: trackings });
    } catch (err) {
        next(err);
    }
}

export const getByTrackingNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trackingNumber = req.params.trackingNumber as string;
        const tracking = await trackingService.getByTrackingNumber(trackingNumber);
        res.status(200).json({ success: true, data: tracking });
    } catch (err: any) {
        if (err.message && err.message.includes("not found")) {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
}

export const getTrackingInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cargoId = req.params.cargoId as string;
        const tracking = await trackingService.getTrackingInfo(cargoId);
        res.status(200).json({ success: true, data: tracking });
    } catch (err: any) {
        if (err.message && err.message.includes("not found")) {
            return res.status(404).json({ success: false, message: err.message });
        }
        next(err);
    }
};

export const getMovementHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cargoId = req.params.cargoId as string;
        const history = await trackingService.getMovementHistory(cargoId);
        res.status(200).json({ success: true, data: history });
    } catch (err) {
        next(err);
    }
};

export const detectDelays = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const delays = await trackingService.detectDelays();
        res.status(200).json({ success: true, message: "Delays detected and updated", data: delays });
    } catch (err) {
        next(err);
    }
};
