import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import postgresqlicon from "../../../public/postgresql_icon.svg";
import database_icon from "../../../public/database_icon.svg";
import schema_icon from "../../../public/schema_icon.svg";
import Image from "next/image";

function AccordionComponent() {
    return (
        <Accordion type="multiple" collapsible className="w-full ">
            {/* Main Database Accordion */}
            <AccordionItem value="postgresql">
                <AccordionTrigger className="flex items-center gap-2 py-2 px-4 text-lg font-semibold">
                    <Image src={postgresqlicon} alt="PostgreSQL Icon" width={20} height={20} />
                    <span>postgres@localhost</span>
                </AccordionTrigger>
                <AccordionContent className="pl-4 ml-2">
                    {/* Nested Database Accordion */}
                    <div className="tree-item">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="database">
                                <AccordionTrigger className="flex items-center gap-2 py-2 px-4 text-md font-medium">
                                    <Image src={database_icon} alt="Database Icon" width={20} height={20} />
                                    <span>customer_db</span>
                                </AccordionTrigger>
                                <AccordionContent className="pl-4 ">
                                    <div>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="schema">
                                                <AccordionTrigger className="flex items-center gap-2 py-2 px-4 text-sm font-normal">
                                                    <Image src={schema_icon} alt="Schema Icon" width={20} height={20} />
                                                    <span>public</span>
                                                </AccordionTrigger>
                                                <AccordionContent className="pl-4  ml-2">
                                                    {/* List of Tables */}
                                                    <ul className="ml-4 space-y-1">
                                                        <li className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                                            <span>customers</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                                            <span>users</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                                            <span>products</span>
                                                        </li>
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default AccordionComponent;
