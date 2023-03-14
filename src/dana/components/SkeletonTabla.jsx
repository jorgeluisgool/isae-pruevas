import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from 'primereact/skeleton';
import { Card } from "primereact/card";

export const SkeletonTabla = ({headers = []}) => {
    const products = Array.from({ length: 5 });
    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }
    return (
        <Card style={{ margin: '3rem' }}>
            <DataTable value={products} className="p-datatable-striped">
                {headers.map((head, index)=>(
                    <Column key= {index} field={head} header={head} style={{ width: '25%' }} body={bodyTemplate}></Column>
                ))}
            </DataTable>
        </Card>
    )
}