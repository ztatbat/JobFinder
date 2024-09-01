import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StyledBox } from "../StyledBox/StyledBox";

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
    id,
    children,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <StyledBox pt={2} pb={4} style={{ width: "100%", paddingTop: "0", ...style }} ref={setNodeRef} {...attributes} {...listeners}>

            {children}
        </StyledBox>
    );
};

export default SortableItem;
