// Results.tsx
import { FC, useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import JobCard from "../JobCard/JobCard";
import SortableItem from "../SortableItem/SortableItem";



const Results: FC<{ jobsResults: any[] }> = ({ jobsResults }) => {
    const [jobs, setJobs] = useState(jobsResults);

    useEffect(() => {
        setJobs(jobsResults)
    }, [jobsResults]);

    // Initialize sensors
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setJobs((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={jobs} strategy={verticalListSortingStrategy}>
                {jobs.map((job) => (

                    <SortableItem key={job.id} id={job.id}>
                        <JobCard job={job} />
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default Results;
