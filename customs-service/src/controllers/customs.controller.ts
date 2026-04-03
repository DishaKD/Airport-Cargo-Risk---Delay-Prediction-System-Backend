import { Request, Response } from 'express';
import { CustomsService } from '../services/customs.service';

export class CustomsController {
  static async getAllClearances(req: Request, res: Response) {
    try {
      const records = await CustomsService.getAll();
      res.status(200).json({ success: true, data: records });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getClearanceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await CustomsService.getById(id);
      if (!record) {
        return res.status(404).json({ success: false, message: 'Clearance record not found' });
      }
      res.status(200).json({ success: true, data: record });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createClearance(req: Request, res: Response) {
    try {
      const { cargoId, notes, delayReason } = req.body;
      if (!cargoId) {
        return res.status(400).json({ success: false, message: 'cargoId is required' });
      }
      const record = await CustomsService.create({ cargoId, notes, delayReason });
      res.status(201).json({ success: true, data: record });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateClearance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body; // Can contain clearanceStatus, riskLevel, notes, delayReason
      const updatedRecord = await CustomsService.update(id, updates);
      res.status(200).json({ success: true, data: updatedRecord });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Clearance record not found' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async simulateInspection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { clearanceStatus, riskLevel, notes, delayReason } = req.body;
      
      if (!clearanceStatus && !riskLevel) {
        return res.status(400).json({ 
          success: false, 
          message: 'Must provide clearanceStatus and/or riskLevel for inspection' 
        });
      }

      const inspectedRecord = await CustomsService.simulateInspection(id, {
        clearanceStatus,
        riskLevel,
        notes,
        delayReason
      });

      res.status(200).json({ success: true, data: inspectedRecord });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Clearance record not found' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteClearance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CustomsService.delete(id);
      res.status(200).json({ success: true, message: 'Clearance record deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Clearance record not found' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
