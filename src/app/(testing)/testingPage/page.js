import AccordionComponent from "../_component/AccordionComponent"
import TableComponent from "../_component/TableComponent"


function page() {
    return (
        <div className="w-screen h-sreen grid grid-cols-12 space-x-10 px-20 py-10">
            <div className="col-span-2">
                <AccordionComponent />
            </div>
            <div className="col-span-10">
                <TableComponent />
            </div>
        </div>
    )
}

export default page