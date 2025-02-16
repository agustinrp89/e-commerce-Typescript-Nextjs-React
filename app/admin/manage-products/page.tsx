import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProduct from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {

    const products = await getProduct({category:null})
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Oops! Acces Denied"/>
    }

    return ( 
        <div className="pt-8">
            <Container>
                <ManageProductsClient products = {products}/>
            </Container>
        </div>
     );
}
 
export default ManageProducts;