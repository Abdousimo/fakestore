import Nav from "@/components/Navbar";


function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return(
   <>
     <Nav/>
     {children}
   </>)
}

export default Layout;
