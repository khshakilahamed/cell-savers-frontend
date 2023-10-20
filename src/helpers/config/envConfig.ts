export const getBaseUrl = (): string => {
  return (
    // process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1/"
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://cell-savers-backend.vercel.app/api/v1"
  );
};
