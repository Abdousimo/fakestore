import UserNav from "./UserNav";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return(
     <>
       <UserNav/>
       {children}
     </>)
  }
  
  export default Layout;
  
