export const successResponse = (message: string, data?: any) => ({
  status: "success",
  message,
  data: data ?? null,
});

export const errorResponse = (message = "Error", meta?: any) => ({
  status: "error",
  message,
  meta: meta ?? null,
});
