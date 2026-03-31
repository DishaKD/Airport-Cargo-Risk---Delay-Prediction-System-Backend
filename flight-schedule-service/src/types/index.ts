export interface CreateFlightDTO {
  flightNumber: string;
  airlineCode: string;
  aircraftType: string;
  departureAirport: string;
  arrivalAirport: string;
}

export interface UpdateFlightDTO {
  status?:
    | "SCHEDULED"
    | "BOARDING"
    | "DEPARTED"
    | "IN_TRANSIT"
    | "DELAYED"
    | "LANDED"
    | "CANCELLED";
  aircraftType?: string;
}

export interface FlightCargoAssignmentDTO {
  flightId: string;
  cargoIds: string[]; // Array of cargo IDs to assign to this flight
}

export interface FlightCargoResponse {
  flightId: string;
  flightNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  assignedCargoCount: number;
  cargoIds: string[];
}

export interface FlightResponse {
  id: string;
  flightNumber: string;
  airlineCode: string;
  aircraftType: string;
  departureAirport: string;
  arrivalAirport: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateScheduleDTO {
  flightId: string;
  scheduledDeparture: Date;
  scheduledArrival: Date;
  gate?: string;
  terminal?: string;
  notes?: string;
}

export interface UpdateScheduleDTO {
  scheduledDeparture?: Date;
  scheduledArrival?: Date;
  estimatedDeparture?: Date;
  estimatedArrival?: Date;
  actualDeparture?: Date;
  actualArrival?: Date;
  gate?: string;
  terminal?: string;
  notes?: string;
}

export interface ScheduleResponse {
  id: string;
  flightId: string;
  scheduledDeparture: Date;
  scheduledArrival: Date;
  estimatedDeparture?: Date;
  estimatedArrival?: Date;
  actualDeparture?: Date;
  actualArrival?: Date;
  gate?: string;
  terminal?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDelayDTO {
  flightId: string;
  reason:
    | "MECHANICAL"
    | "WEATHER"
    | "CREW"
    | "CARGO_DELAY"
    | "CUSTOMS"
    | "MAINTENANCE"
    | "OTHER";
  estimatedDelay: number;
  description?: string;
}

export interface UpdateDelayDTO {
  estimatedDelay?: number;
  actualDelay?: number;
  description?: string;
  resolvedAt?: Date;
}

export interface DelayResponse {
  id: string;
  flightId: string;
  reason: string;
  estimatedDelay: number;
  actualDelay?: number;
  description?: string;
  reportedAt: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlightStatusUpdate {
  flightId: string;
  status:
    | "SCHEDULED"
    | "BOARDING"
    | "DEPARTED"
    | "IN_TRANSIT"
    | "DELAYED"
    | "LANDED"
    | "CANCELLED";
  timestamp?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
