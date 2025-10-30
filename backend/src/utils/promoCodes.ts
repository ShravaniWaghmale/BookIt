export const validatePromo = (code: string) => {
  const promos: Record<string, { type: string; value: number }> = {
    SAVE10: { type: 'percent', value: 10 },
    FLAT100: { type: 'flat', value: 100 }
  };
  return promos[code.toUpperCase()] || null;
};
