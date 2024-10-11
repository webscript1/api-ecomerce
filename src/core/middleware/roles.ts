import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
        const user= req.body.user
        if (!user) {
            
            return res.status(401).json({ message: 'Unauthorized' });
        }
   
        const userRoles =user.role;
        
       // const hasRole = roles.some(role => userRoles.includes(role));
       const hasRole = roles.some((role => userRoles===role));

     

        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};
