// In-memory storage
let clearanceRecords: any[] = [
  {
    id: 'clr-1',
    cargoId: 'CARGO-001',
    clearanceStatus: 'PENDING',
    riskLevel: 'LOW',
    inspectionDate: null,
    notes: 'Initial submission',
    delayReason: null,
    createdAt: new Date('2026-03-30T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-30T10:00:00Z').toISOString(),
  },
  {
    id: 'clr-2',
    cargoId: 'CARGO-002',
    clearanceStatus: 'UNDER_INSPECTION',
    riskLevel: 'MEDIUM',
    inspectionDate: new Date('2026-03-30T11:30:00Z').toISOString(),
    notes: 'Random inspection required',
    delayReason: null,
    createdAt: new Date('2026-03-30T09:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-30T11:30:00Z').toISOString(),
  },
  {
    id: 'clr-3',
    cargoId: 'CARGO-003',
    clearanceStatus: 'HOLD',
    riskLevel: 'HIGH',
    inspectionDate: null,
    notes: 'High-risk cargo from restricted country',
    delayReason: 'Missing documentation',
    createdAt: new Date('2026-03-29T14:00:00Z').toISOString(),
    updatedAt: new Date('2026-03-30T08:00:00Z').toISOString(),
  }
];

export class CustomsService {
  static async getAll() {
    return [...clearanceRecords].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static async getById(id: string) {
    return clearanceRecords.find(record => record.id === id) || null;
  }

  static async create(data: { cargoId: string; notes?: string; delayReason?: string }) {
    const newRecord = {
      id: `clr-${Date.now()}`,
      cargoId: data.cargoId,
      clearanceStatus: 'PENDING',
      riskLevel: 'LOW',
      inspectionDate: null,
      notes: data.notes || null,
      delayReason: data.delayReason || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    clearanceRecords.push(newRecord);
    return newRecord;
  }

  static async update(id: string, updates: any) {
    const record = clearanceRecords.find(r => r.id === id);
    if (!record) return null;

    Object.assign(record, updates);
    record.updatedAt = new Date().toISOString();
    return record;
  }

  static async simulateInspection(id: string, data: any) {
    const record = clearanceRecords.find(r => r.id === id);
    if (!record) return null;

    Object.assign(record, data);
    record.inspectionDate = new Date().toISOString();
    record.updatedAt = new Date().toISOString();
    return record;
  }

  static async delete(id: string) {
    const index = clearanceRecords.findIndex(r => r.id === id);
    if (index === -1) return null;
    const deleted = clearanceRecords[index];
    clearanceRecords.splice(index, 1);
    return deleted;
  }
}