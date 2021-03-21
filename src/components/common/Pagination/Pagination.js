import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const Pagination = ({ children, loading, pagination, ...rest }) => {
  return (
    <section className="w-full container mx-auto overflow-hidden" {...rest}>
      {children}
      {pagination?.totalPage > 1 && !loading && (
        <div className="mt-5 flex justify-end">
          <ReactPaginate
            breakLabel={"..."}
            pageCount={pagination.totalPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={pagination.handlePageClick}
            forcePage={pagination.currentpage - 1}
            containerClassName={`flex border border-primary text-sm rounded-md divide-x text-secondary ${pagination.containerClassName}`}
            disabledClassName="bg-white"
            pageClassName="w-10 h-10 flex cursor-pointer flex justify-center items-center"
            pageLinkClassName="focus:outline-none w-full h-full flex items-center justify-center"
            activeClassName="bg-primary"
            previousClassName={`${
              pagination.currentpage === 1 ? "hidden" : ""
            } flex justify-center items-center w-10 h-10`}
            previousLinkClassName="focus:outline-none w-full h-full flex items-center justify-center"
            nextClassName="flex justify-center items-center w-10 h-10"
            nextLinkClassName="focus:outline-none w-full h-full flex items-center justify-center"
            previousLabel="<"
            nextLabel=">"
            breakClassName="w-10 h-10 flex cursor-pointer"
            breakLinkClassName="focus:outline-none w-full h-full flex items-center justify-center"
          />
        </div>
      )}
    </section>
  );
};

Pagination.propTypes = {
  /**
   * if data is fetching
   */
  loading: PropTypes.bool,
  /**
   * pagination details
   */
  pagination: PropTypes.shape({
    /**
     * total number of pages
     */
    totalPage: PropTypes.number,
    /**
     * current page number
     */
    currentpage: PropTypes.number,
    /**
     * onHandle click function
     */
    handlePageClick: PropTypes.func,
    /**
     * pagination conainer class
     */
    containerClassName: PropTypes.string,
  }),
};

Pagination.defaultProps = {
  loading: false,
};

export default Pagination;
