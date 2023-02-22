import { createContext, SetStateAction, useContext, useState, Dispatch } from "react";

interface UserIdContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}


const UserIdContext = createContext<UserIdContextType>({userId: "", setUserId: (val) => {val}});

export function useUserId() {
  return useContext(UserIdContext);
}

export function UserIdProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}
