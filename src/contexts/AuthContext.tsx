import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// interface User {
//   id: number;
//   type: 'worker' | 'establishment' | 'department';
//   firstName: string;
//   middleName?: string;
//   lastName?: string;
//   fullName?: string;
//   emailId?: string;
//   mobileNumber?: number;
//   lastLoggedIn?: string;
// }

// export interface User {
//   id: number;                 // unique id for all
//   type: "worker" | "establishment" | "department";

//   // display info
//   fullName: string;
//   emailId?: string;
//   mobileNumber?: number;

//   // extra info depending on type
//   roleName?: string;           // for department
//   establishmentName?: string;  // for establishment
//   contactPerson?: string;      // for establishment
//   lastLoggedIn?: string | null;
// }

// Worker login response
export interface WorkerUser {
  type: "worker";
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  mobileNumber: number;
  emailId: string;
  lastLoggedIn?: string | null;
  establishmentId: number;
  estmtWorkerId: number;
  establishmentName: string;
  workLocation: string;
  status: string;
}

// Establishment login response
export interface EstablishmentUser {
  type: "establishment";
  establishmentId: number;
  establishmentName: string;
  mobileNumber: number;
  emailId: string;
  contactPerson: string;
  lastLoggedIn?: string | null;
}

// Department login response
export interface DepartmentUser {
  type: "department";
  departmentRoleId: number;
  roleName: string;
  roleDescription: string;
  departmentUserId: number;
  emailId: string;
  contactNumber: number;
  lastLoggedIn?: string | null;
}

export type User = WorkerUser | EstablishmentUser | DepartmentUser;



// Worker login response → User
// export function mapWorkerToUser(data: any): WorkerUser {
//   return {
//     id: data.id,
//     type: "worker",
//     fullName: data.fullName,
//     emailId: data.emailId,
//     mobileNumber: data.mobileNumber,
//     lastLoggedIn: data.lastLoggedIn,
//   };
// }

// // Establishment login response → User
// export function mapEstablishmentToUser(data: any): User {
//   return {
//     id: data.establishmentId,
//     type: "establishment",
//     fullName: data.establishmentName, // normalize to fullName
//     emailId: data.emailId,
//     mobileNumber: data.mobileNumber,
//     contactPerson: data.contactPerson,
//     lastLoggedIn: data.lastLoggedIn,
//     establishmentName: data.establishmentName,
//   };
// }

// // Department login response → User
// export function mapDepartmentToUser(data: any): User {
//   return {
//     departmentUserId: data.departmentUserId,
//     type: "department",
//     // fullName: data.roleName, // or roleName + " Dept"
//     emailId: data.emailId,
//     contactNumber: data.contactNumber,
//     roleName: data.roleName,
//     lastLoggedIn: data.lastLoggedIn,
//     roleDescription: data.roleDescription,
//   };
// }


export function mapWorkerToUser(data: any): WorkerUser {
  return {
    type: "worker",
    id: data.id,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    fullName: data.fullName,
    emailId: data.emailId,
    mobileNumber: data.mobileNumber,
    lastLoggedIn: data.lastLoggedIn,
    establishmentId: data.establishmentId,
    estmtWorkerId: data.estmtWorkerId,
    establishmentName: data.establishmentName,
    workLocation: data.workLocation,
    status: data.status,
  };
}

// Establishment login response → User
export function mapEstablishmentToUser(data: any): EstablishmentUser {
  return {
    type: "establishment",
    establishmentId: data.establishmentId,
    establishmentName: data.establishmentName,
    emailId: data.emailId,
    mobileNumber: data.mobileNumber,
    contactPerson: data.contactPerson,
    lastLoggedIn: data.lastLoggedIn,
  };
}

// Department login response → User
export function mapDepartmentToUser(data: any): DepartmentUser {
  return {
    type: "department",
    departmentRoleId: data.departmentRoleId,
    departmentUserId: data.departmentUserId,
    roleName: data.roleName,
    roleDescription: data.roleDescription,
    emailId: data.emailId,
    contactNumber: data.contactNumber,
    lastLoggedIn: data.lastLoggedIn,
  };
}


interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  expiresAt?: number | null;   // 👈 add
  loading: boolean;            // 👈 add
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log(context, 'contenxt')
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: User) => {
    const expiresAt = Date.now() + 60 * 60 * 1000;
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authExpiry", expiresAt.toString());

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authExpiry");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedExpiry = localStorage.getItem("authExpiry");

    if (storedUser && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);

      if (Date.now() < expiryTime) {
        // setUser(JSON.parse(storedUser));
        try{
          const parsedUser = JSON.parse(storedUser);
          console.log(parsedUser, 'parsedUser');
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
        }
      } else {
        console.log("User session expired");
        logout(); // expired
      }
    }else{
      console.log("No user found");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;

    const expiryTime = Number(localStorage.getItem("authExpiry"));
    const remaining = expiryTime - Date.now();

    const timer = setTimeout(() => {
      logout();
    }, remaining);

    return () => clearTimeout(timer);
  }, [user]);

  const isAuthenticated = !!user;
  console.log("isAuthenticated:", isAuthenticated, user);
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated , loading }}>
      {children}
    </AuthContext.Provider>
  );
};