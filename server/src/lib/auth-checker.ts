import { AuthChecker } from 'type-graphql';
import { Context } from '@Shared/types/Context';
import jwt from 'jsonwebtoken';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      if (!user) {
        return false;
      }
      //@ts-ignore
      context.user = user;
      return true;
    }
    return false;
  }
  return false;
};
