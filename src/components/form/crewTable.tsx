import {
  Header,
  Table,
  TableOptions,
  flexRender,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import { genericMemo } from '../../../utils'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import {
  HTMLProps,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import South from '~icons/material-symbols/south'
import North from '~icons/material-symbols/north'
import Check from '~icons/material-symbols/check'
import BaselineMinus from '~icons/ic/baseline-minus'

import ReactDOM from 'react-dom'
import { useTranslation } from '@crew/modules/i18n'
import { CrewPagination } from '../crewPagination/crewPagination'

export const SelectCheckbox = memo(
  ({
    indeterminate,
    label,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className,
    ...rest
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate, rest.checked])

    return (
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="hidden" ref={ref} {...rest} />
        <div
          // Figma checkbox size is 18px, tailwindcss no value for 18px so i set w-[18px] and h-[18px]
          className={classNames(
            'w-[18px] h-[18px] border rounded flex justify-center items-center shrink-0 text-crew-blue-500 font-bold border-crew-gray-400 dark:border-crew-gray-500'
          )}
        >
          {rest.checked && <Check width={20} height={20} />}
          {indeterminate && <BaselineMinus width={20} height={20} />}
        </div>
        {label && <span className="ml-2">{label}</span>}
      </label>
    )
  }
)

type ColumnSelectorProps<T> = {
  table: Table<T>
}

// memo化するとtableのインスタンスに変更はないため、最新のデータが描画されなくなる
// なのでmemo化しない
const ColumnSelector = <T,>({ table }: ColumnSelectorProps<T>) => {
  const [referenceElement] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  })
  const { t } = useTranslation()

  return (
    <div className="flex">
      <Popover className="relative">
        {/* <Popover.Button
          className="hover:bg-crew-gray-200 dark:hover:bg-crew-gray-800 p-2 cursor-pointer w-full h-full text-left"
          ref={setReferenceElement}
        >
          {t('label.crewTable.selectColumn')}
        </Popover.Button> */}

        {ReactDOM.createPortal(
          <Popover.Panel
            className="p-4 border rounded-md crew-bg-default shadow-lg w-60 z-50"
            style={styles.popper}
            {...attributes.popper}
            ref={setPopperElement}
          >
            <div className="inline-block ">
              <div className="px-1">
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: table.getIsAllColumnsVisible(),
                      onChange: table.getToggleAllColumnsVisibilityHandler(),
                    }}
                  />
                  {t('label.crewTable.selectAll')}
                </label>
              </div>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id} className="px-1">
                    <label>
                      <input
                        {...{
                          type: 'checkbox',
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />
                      {t(`label.${column.id}`)}
                    </label>
                  </div>
                )
              })}
            </div>
          </Popover.Panel>,

          document.getElementById('popper')!
        )}
      </Popover>
    </div>
  )
}

export type CrewTableProps<T> = {
  tableOptions: TableOptions<T>
  onTableInit?: (table: Table<T>) => void
  showPager?: boolean
  showColumnSelector?: boolean
}

export const CrewTable = genericMemo(
  <T,>({
    showColumnSelector = true,
    showPager = true,
    ...props
  }: CrewTableProps<T>) => {
    const table = useReactTable(props.tableOptions)

    useEffect(() => {
      props.onTableInit?.(table)
    }, [props, table])

    const handleSortingChange = useCallback(
      <T,>(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        header: Header<T, unknown>
      ) => {
        if (!header.column.getCanSort()) return
        let multiSort = false
        if (header.column.getCanMultiSort()) multiSort = event.shiftKey
        if (header.column.getSortIndex() >= 0) {
          if (header.column.getIsSorted() === 'desc')
            header.column.toggleSorting(false, multiSort)
          else header.column.toggleSorting(true, multiSort)
        } else {
          header.column.toggleSorting(false, multiSort)
        }
      },
      []
    )

    // Define a callback function to handle pagination changes
    const handlePaginationChange = useCallback(
      (pageIndex: number, pageSize: number) => {
        // Check if the pageIndex has changed
        if (table.getState().pagination.pageIndex !== pageIndex) {
          // If it has changed, update the table's pageIndex
          table.setPageIndex(pageIndex)
          // Reset row selection as the page has changed
          table.resetRowSelection()
        }

        // Check if the pageSize has changed
        if (table.getState().pagination.pageSize !== pageSize) {
          // If it has changed, update the table's pageSize
          table.setPageSize(pageSize)
          // Reset row selection as the page size has changed
          table.resetRowSelection()
        }
      },
      [table]
    )

    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2">
          {showPager && (
            <CrewPagination
              key="top-pagination"
              pageSize={table.getState().pagination.pageSize}
              pageIndex={table.getState().pagination.pageIndex}
              pageCount={table.getPageCount()}
              onPaginationChange={handlePaginationChange}
            />
          )}
          {showColumnSelector && <ColumnSelector table={table} />}
        </div>
        <div className="flex-grow overflow-auto border-y border-y-crew-gray-200 dark:border-y-crew-gray-700 divide-y divide-crew-gray-200 dark:divide-crew-gray-700">
          <table
            className="crew-table table-fixed divide-y divide-crew-gray-300 dark:divide-crew-gray-600"
            style={{
              width: table.getTotalSize(),
            }}
          >
            <thead className="sticky top-0 z-20 group text-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  style={{
                    height: table.options.meta?.headerRowHeight ?? 'auto',
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                        width: header.getSize(),
                      }}
                      className={classNames('relative', {
                        'cursor-pointer select-none':
                          header.column.getCanSort(),
                        'sticky left-0 z-10': header.column.getIsPinned(),
                        'sticky right-0 z-10':
                          header.column.getIsPinned() === 'right',
                      })}
                    >
                      <div
                        className="flex px-1 items-center"
                        onClick={(e) => {
                          handleSortingChange(e, header)
                        }}
                        style={{
                          justifyContent:
                            header.column.columnDef.meta?.align ?? 'left',
                        }}
                      >
                        <span className="flex whitespace-nowrap overflow-hidden text-ellipsis">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </span>

                        {header.column.getSortIndex() >= 0 && (
                          <span className="flex items-center">
                            {header.column.getIsSorted() === 'asc' ? (
                              <>
                                <North
                                  width={20}
                                  height={20}
                                  className="text-crew-blue-3-light  dark:text-crew-blue-2-dark"
                                />
                              </>
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <>
                                <South
                                  width={20}
                                  height={20}
                                  className="text-crew-blue-3-light  dark:text-crew-blue-2-dark"
                                />
                              </>
                            ) : null}
                          </span>
                        )}
                      </div>
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: classNames(
                            `absolute top-2 bottom-2 right-0 w-1 border-crew-gray-300 dark:border-crew-gray-600 group-hover:border-r group-hover:border-l cursor-col-resize user-select-none touch-action-none`
                          ),
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-crew-gray-200 dark:divide-crew-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    height: table.options.meta?.dataRowHeight ?? 'auto',
                  }}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                        width: cell.column.getSize(),
                      }}
                      className={classNames(
                        'group-hover:bg-crew-gray-100 dark:group-hover:bg-crew-gray-800',
                        {
                          'sticky left-0 z-10 bg-crew-white dark:bg-crew-gray-900':
                            cell.column.getIsPinned() === 'left',
                          'sticky right-0 z-10 bg-crew-white dark:bg-crew-gray-900':
                            cell.column.getIsPinned() === 'right',
                        }
                      )}
                    >
                      <div className={classNames('flex px-1 gap-1')}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
        <div className="flex items-center gap-2">
          {showPager && (
            <CrewPagination
              key="bottom-pagination"
              pageSize={table.getState().pagination.pageSize}
              pageIndex={table.getState().pagination.pageIndex}
              pageCount={table.getPageCount()}
              onPaginationChange={handlePaginationChange}
            />
          )}
          {showColumnSelector && <ColumnSelector table={table} />}
        </div>
      </div>
    )
  }
)
