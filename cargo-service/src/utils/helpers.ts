export const generateTrackingNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CARGO-${timestamp}-${random}`;
};

export const formatCargoResponse = (cargo: any) => {
  return {
    ...cargo,
    formattedCreatedAt: new Date(cargo.createdAt).toLocaleString(),
    formattedUpdatedAt: new Date(cargo.updatedAt).toLocaleString(),
  };
};
