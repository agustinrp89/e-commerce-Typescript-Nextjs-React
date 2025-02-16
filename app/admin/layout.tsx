import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title:'E-Shop Admin',
    desciption: "E-Shop Admin Dashboard"
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div>
            <div>
                <AdminNav/>
            </div>
            {children}
        </div>
     );
}
 
export default AdminLayout;