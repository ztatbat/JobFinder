import { Box, Button, Card, Pagination } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import useGetSearchResults from "../../hooks/useGetSearchResults";
import DropDownSelect from "../../components/DropDownSelect/DropDownSelect";
import SearchInput from "../../components/SearchInput/SearchInput";
import OrderCmp from "../../components/OrderCmp/OrderCmp";
import { StyledBox } from "../../components/StyledBox/StyledBox";
import Grid from '@mui/material/Grid2';
import Results from "../../components/Results/Results";
import LoadingScreen from "../../components/LoadingCmp/LoadingCmp";
import toast from "react-hot-toast";
import { SearchOff } from "@mui/icons-material";
import { Paragraph } from "../../components/Typography/Typography";


export interface FilterType {
    searchString: string | undefined;
    category:
    | "AI / Research & Development"
    | "Artificial Intelligence"
    | "Financial Services"
    | "Human Resources"
    | "Software Engineering"
    | "All";
    sortBy: 'Name' | 'Creation Date' | 'Update Date' | 'None';
    sortType: 'ASC' | 'DESC';
    page: number;
}

const availableCategories = ["All", "AI / Research & Development", "Artificial Intelligence", "Financial Services", "Human Resources", "Software Engineering"];
const sortByOptions = ['None', 'Name', 'Creation Date', 'Update Date'];
const defaultFilter: FilterType = { searchString: undefined, category: 'All', sortBy: 'None', sortType: 'ASC', page: 1 };

const JobsSearchCmp: FC = () => {
    const [filters, setFilters] = useState<FilterType>(defaultFilter);

    useEffect(() => {
        const savedFilters = localStorage.getItem('filters');
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters);
            setFilters((prev) => ({
                ...prev,
                searchString: parsedFilters?.searchString ?? prev.searchString,
                category: parsedFilters?.category ?? prev.category,
                sortBy: parsedFilters?.sortBy ?? prev.sortBy,
                sortType: parsedFilters?.sortType ?? prev.sortType,
                page: parsedFilters?.page ?? prev.page,
            }));
        }
    }, []);

    const { displayedElements, totalPages, loading, error } = useGetSearchResults(filters);

    const handleChange = (value: string, filter: 'searchString' | 'sortBy' | 'sortType' | 'category') => {
        setFilters((prev) => {
            const newFilters = { ...prev, [filter]: value };
            if (JSON.stringify(newFilters) !== JSON.stringify(defaultFilter)) {
                localStorage.setItem('filters', JSON.stringify(newFilters));
            }
            return newFilters;
        });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setFilters((prev) => {
            const newFilters = { ...prev, page };
            if (JSON.stringify(newFilters) !== JSON.stringify(defaultFilter)) {
                localStorage.setItem('filters', JSON.stringify(newFilters));
            }
            return newFilters;
        });
    };

    const resetFields = () => {
        localStorage.setItem('filters', JSON.stringify(defaultFilter));
        setFilters(defaultFilter);
        toast.success("The filter has been reset succesfully");
    };

    useEffect(() => {
        error && toast.error(error);

    }, [error])

    return (
        <>
            <StyledBox pt={2} pb={4} style={{ width: '100%' }}>
                <Card sx={{ padding: 4 }}>
                    <Grid style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <SearchInput
                            placeholder="Search a job..."
                            sx={{ my: 2 }}
                            onChange={(event) => handleChange(event.target.value, 'searchString')}
                            value={filters.searchString || ''}
                        />
                        <Button type="submit" variant="contained" style={{ height: 45 }} onClick={resetFields}>
                            Reset
                        </Button>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                        <DropDownSelect
                            value={filters.category}
                            onSelect={(value) => handleChange(value, 'category')}
                            options={availableCategories}
                            defaultValue={availableCategories[0]}
                            label="Select a category"
                        />
                        <DropDownSelect
                            value={filters.sortBy}
                            onSelect={(value) => handleChange(value, 'sortBy')}
                            options={sortByOptions}
                            defaultValue={sortByOptions[0]}
                            label="Sort By"
                        />
                        {filters.sortBy !== 'None' && (
                            <>
                                <OrderCmp
                                    type="ASC"
                                    active={filters.sortType === 'ASC'}
                                    onClick={() => handleChange('ASC', 'sortType')}
                                />
                                <OrderCmp
                                    type="DESC"
                                    active={filters.sortType === 'DESC'}
                                    onClick={() => handleChange('DESC', 'sortType')}
                                />
                            </>
                        )}
                    </Grid>
                </Card>
            </StyledBox>

            {loading && <LoadingScreen />}
            {displayedElements.length === 0 && !loading && <Box>
                <SearchOff
                    sx={{
                        fontSize: 100,
                        color: 'text.disabled',
                        marginTop: '30px'
                    }}
                />
                <Paragraph style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }} color="text.disabled" fontWeight={500}>
                    No results
                </Paragraph>
            </Box>}
            {!loading && <Results jobsResults={displayedElements} />}
            {!loading && totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={filters.page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </>
    );
};

export default memo(JobsSearchCmp);
