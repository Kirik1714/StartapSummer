import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './Pagination.module.scss'

const Pagination = ({currentPage,onChangePage}) => {
        
  return (
    <>
    <ReactPaginate
    className={style.main}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event=>onChangePage(event.selected+1)}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="<"
        renderOnZeroPageCount={null}
        disabledClassName='blurArrow'
        forcePage={currentPage -1}
        

      />
    </>
  )
}

export default Pagination