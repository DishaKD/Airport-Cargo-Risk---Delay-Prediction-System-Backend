// Database utility functions
export const getDatabaseUrl = (): string => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return url;
};

// Time utility functions
export const getCurrentTimestamp = (): Date => {
  return new Date();
};

export const addMinutesToDate = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

// Validation utility functions
export const isValidFlightNumber = (flightNumber: string): boolean => {
  const flightRegex = /^[A-Z]{2}\d{1,4}$/;
  return flightRegex.test(flightNumber);
};

export const isValidAirportCode = (code: string): boolean => {
  const airportRegex = /^[A-Z]{3}$/;
  return airportRegex.test(code);
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};
