export interface CreateCargoDTO {
  trackingNumber: string;
  description: string;
  weight: number;
  dimensions: string;
  cargoType: 'FRAGILE' | 'HAZARDOUS' | 'PERISHABLE' | 'GENERAL' | 'OVERSIZED';
  origin: string;
  destination: string;
  flightId?: string;
}

export interface UpdateCargoDTO {
  description?: string;
  status?: 'PENDING' | 'LOADED' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'CANCELLED';
  flightId?: string;
}

export interface CargoResponse {
  id: string;
  trackingNumber: string;
  description: string;
  weight: number;
  dimensions: string;
  cargoType: string;
  status: string;
  origin: string;
  destination: string;
  flightId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShipmentDTO {
  cargoId: string;
  status: string;
  notes?: string;
}

export interface LocationUpdateDTO {
  cargoId: string;
  latitude: number;
  longitude: number;
  location: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
