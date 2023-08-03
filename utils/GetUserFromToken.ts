import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string; // Adjust this based on the actual structure of the JWT payload
  // Add other properties if your JWT payload contains more data
}

export function TokenCleaner(tk: string) {
  const cleanedToken = tk.replace("Bearer ", "").replaceAll('"', "");
  return cleanedToken;
}

export default function GetUserFromToken(
  token: string | undefined,
  jwtSk: string
): DecodedToken | null {
  if (!token) {
    return null;
  }

  const cleanedToken = TokenCleaner(token);

  try {
    const decoded = jwt.verify(cleanedToken, jwtSk) as DecodedToken;
    return decoded;
  } catch (ex) {
    console.error("JWT verification error:", ex);
    return null;
  }
}
