import { cn } from "@/lib/utils";

export default function CustomTable({
  data,
  selectedColumn = null,
  onColumnSelect = null,
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  tableClassName = "",
  horizontalScroll = false,
  verticalScroll = false,
  containerClassName = "",
  showIndex = false,
}) {
  const headers = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div
      className={cn(
        "rounded-sm scrollbar-hide h-full w-full",
        "scrollbar-hide h-full w-full",
        horizontalScroll ? "overflow-x-auto" : "",
        verticalScroll ? "overflow-y-auto" : "",
        containerClassName
      )}
    >
      <table
        className={cn(
          "w-full h-full rounded-sm scrollbar-hide",
          "w-full h-full  scrollbar-hide",
          tableClassName
        )}
      >
        <thead>
          <tr>
            {showIndex && (
              <th
                className={cn(
                  "bg-gray-200 z-10 sticky text-center p-2 top-0 ",
                  headerClassName
                )}
              >
                <span className="invisible">No</span>
              </th>
            )}

            {headers.map((header) => (
              <th
                key={header}
                className={cn(
                  "p-2 text-left sticky top-0 bg-gray-200 z-10",
                  headerClassName,
                  onColumnSelect && "cursor-pointer",
                  selectedColumn === header && "bg-blue-100"
                )}
                onClick={
                  onColumnSelect ? () => onColumnSelect(header) : undefined
                }
              >
                {header ? header.charAt(0).toUpperCase() + header.slice(1) : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="scrollbar-hide">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={cn(rowClassName, index % 2 === 0 && "bg-gray-100")}
              >
                {showIndex && (
                  <td
                    className={cn(
                      "text-center bg-white border text-slate-500",
                      rowClassName
                    )}
                  >
                    {index + 1}
                  </td>
                )}

                {headers.map((header) => (
                  <td
                    key={header}
                    className={cn(
                      "p-2 border",
                      cellClassName,
                      selectedColumn === header && "bg-blue-50"
                    )}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="bg-white w-full h-full">
              <td
                colSpan={headers.length + (showIndex ? 1 : 0)}
                className="text-center text-gray-500 p-4"
              >
                <span className="invisible">No data available</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
