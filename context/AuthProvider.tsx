// import React, { createContext, useContext, useState, ReactNode, FC } from "react";

// // Define the AuthContext type
// export interface AuthContextType {
//   user: any;  // You can refine 'any' to a specific type for the user if needed
//   loading: boolean;
//   createUser: () => void;
//   logIn: (data: any) => Promise<void>;
//   logOut: () => void;
// }

// // Create the AuthContext with a default value of null
// export const AuthContext = createContext<AuthContextType | null>(null);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Define the AuthProvider component
// const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);  // Set the user type if you have a specific type
//   const [loading, setLoading] = useState<boolean>(true);

//   // Simulate user creation function
//   const createUser = () => {
//     // Your logic here to create a user
//   };

//   // Simulate log in function
//   const logIn = async (data: any) => {
//     // Your logic here to log in the user
//     setUser(data);  // Store the logged-in user's data
//     setLoading(false);  // Set loading to false after login
//   };

//   // Simulate log out function
//   const logOut = () => {
//     // Your logic here to log out the user
//     setUser(null);  // Clear the user data
//     setLoading(true);  // Set loading to true while logging out
//   };

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     logIn,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;