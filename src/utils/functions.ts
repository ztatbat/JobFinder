
/**
 * Filters job results based on search string and category.
 */
export const filterResults = (results: any[], searchString?: string, category?: string): any[] => {
    return results.filter((item: any) => {
      const matchesSearchString = searchString
        ? item.name.toLowerCase().includes(searchString.toLowerCase())
        : true;
  
      const matchesCategory = category === 'All'
        ? true
        : item.tags.some((tag: any) =>
            tag.name === 'category' && tag.value === category
          );
  
      return matchesSearchString && matchesCategory;
    });
  };
  
/**
 * Sorts job results based on the given sort criteria.
 */
export const sortResults = (results: any[], sortBy: string, sortType: 'ASC' | 'DESC'): any[] => {
    return results.sort((a: any, b: any) => {
      let compareA: any;
      let compareB: any;
  
      switch (sortBy) {
        case 'Name':
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case 'Creation Date':
          compareA = new Date(a.created_at).getTime();
          compareB = new Date(b.created_at).getTime();
          break;
        case 'Update Date':
          compareA = new Date(a.updated_at).getTime();
          compareB = new Date(b.updated_at).getTime();
          break;
        default:
          return 0; // No sorting if sortBy is 'None' or any other unhandled case
      }
  
      if (sortType === 'ASC') {
        return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
      } else {
        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
      }
    });
  };
  
  
  /**
   * Paginates the job results based on the current page.
   */
  export const paginateResults = (results: any[], page: number, elementsPerPage: number): any[] => {
    const startIndex = (page - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    return results.slice(startIndex, endIndex);
  };