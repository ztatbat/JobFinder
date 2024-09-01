import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import { FC, useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { H3, Paragraph, Small } from "../Typography/Typography";
import { Business, LocationOn, SchoolOutlined } from "@mui/icons-material";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const JobCard: FC<{ job: any }> = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const [contentHeight, setContentHeight] = useState("0px");
    const textRef = useRef<HTMLDivElement>(null);

    const name = job.name;
    const summary = job.summary;
    const skills = job.skills?.map((skill: { name: string }) => skill.name).join(", ") || "";
    const location = job.location?.text || "";

    const companyTag = job.tags?.find((tag: { name: string }) => tag.name === "company");
    const company = companyTag?.value || "N/A";

    const categoryTag = job.tags?.find((tag: { name: string }) => tag.name === "category");
    const category = categoryTag?.value || "N/A";

    const createdAt = job.created_at ? formatDate(job.created_at) : "N/A";
    const updatedAt = job.updated_at ? formatDate(job.updated_at) : "N/A";

    const isSmallScreen = useMediaQuery("(max-width:500px)");

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
            const maxLines = 2;
            const maxHeight = lineHeight * maxLines;

            if (textRef.current.scrollHeight > maxHeight) {
                setIsTruncated(true);
                setContentHeight(`${maxHeight}px`);
            } else {
                setContentHeight("auto");
            }
        }
    }, []);

    const toggleExpand = () => {
        if (textRef.current) {
            if (isExpanded) {
                const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
                const maxLines = 2;
                const maxHeight = lineHeight * maxLines;
                setContentHeight(`${maxHeight}px`);
            } else {
                setContentHeight(`${textRef.current.scrollHeight}px`);
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <Card sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        gap: isSmallScreen ? 2 : 20,
                    }}
                >
                    <Box style={{ flex: 1 }} marginLeft={1}>
                        <H3>{name}</H3>
                        <Paragraph color="text.disabled" fontWeight={500}>
                            {category}
                        </Paragraph>
                        <Small>
                            Created At: {createdAt}
                        </Small>
                        <Small >
                            Updated At: {updatedAt}
                        </Small>
                    </Box>
                    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }} marginLeft={1}>
                            <SchoolOutlined />
                            <Paragraph>{skills}</Paragraph>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }} marginLeft={1}>
                            <LocationOn />
                            <Paragraph>{location}</Paragraph>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }} marginLeft={1}>
                            <Business />
                            <Paragraph>{company}</Paragraph>
                        </Box>
                    </Box>
                </Grid>
                <Grid sx={{ flex: 5, marginTop: '10px' }}>
                    <Box
                        ref={textRef}
                        sx={{
                            overflow: "hidden",
                            transition: "height 0.8s ease",
                            height: contentHeight,
                        }}
                    >
                        {summary.length !== 0 ? summary : '--- NO DESCRIPTION AVAILABLE ---'}
                    </Box>
                    {isTruncated && (
                        <Typography
                            onClick={toggleExpand}
                            sx={{
                                color: "#2499ef",
                                cursor: "pointer",
                                marginTop: 1,
                                display: "inline-block",
                            }}
                        >
                            {isExpanded ? "Show Less" : "Show More"}
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Card>
    );
};

export default JobCard;
