import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

import {TablePaginationActions} from './Pagination';



export function PaginationBar({count, colSpan, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  return(
    <TablePagination
      rowsPerPageOptions={[20, 50, 100]}
      colSpan={colSpan}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}  
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  )
}