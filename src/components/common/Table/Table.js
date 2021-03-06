import React from "react";
import PropTypes from "prop-types";

const Table = ({ headers, rowContent, loading, className, ...rest }) => {
  return (
    <section className="w-full max-w-240 mx-auto overflow-hidden" {...rest}>
      <div className={`w-full m-auto bg-white ${className}`}>
        <div className="rounded-md border border-primary overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary font-medium text-xs text-secondary">
              {/** Table headers */}
              <tr className="h-10">
                {headers.map((title, index) => (
                  <th className="text-center" key={index}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-sm text-primary">
              {/** Loading state for now */}
              {loading ? (
                <div>Null</div>
              ) : (
                /**Table Rows */
                rowContent.map((rowData, idx) => (
                  <tr
                    className="h-12 text-xs hover:bg-gray-100 bg-white transform duration-300"
                    key={idx}
                  >
                    {rowData.map((columnData, cidx) => (
                      <td key={cidx}>{columnData}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

Table.propTypes = {
  /**
   * Table headers
   */
  headers: PropTypes.arrayOf(PropTypes.string),
  /**
   * Table content as array or arrays
   */
  rowContent: PropTypes.arrayOf(PropTypes.node),
  /**
   * if table data is fetching
   */
  loading: PropTypes.bool,
};

Table.defaultProps = {
  headers: ["Header", "Header2"],
  rowContent: [
    [<p>R1 Column 1 content</p>, <p>R1 Column 2 content</p>],
    [<p>R2 Column 1 content</p>, <p>R2 Column 2 content</p>],
  ],
  loading: false,
};

export default Table;
