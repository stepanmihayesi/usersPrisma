export type JwtPayload = {
    email: string;
    sub: number;
    name: string | null;
    adrPost: string | null;
    comment: string | null;
    typeUser: string
  };