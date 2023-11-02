export const JWT_SECRET_KEY = "ASDASD";

export const generateRandomCode = () => {
  return Math.random().toString().slice(2, 6);
};
