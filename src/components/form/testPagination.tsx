import { useTranslation } from '@Test/modules/i18n'
import KeyboardArrowLeft from '~icons/material-symbols/keyboard-arrow-left'
import KeyboardArrowRight from '~icons/material-symbols/keyboard-arrow-right'
import FirstPage from '~icons/material-symbols/first-page'
import LastPage from '~icons/material-symbols/last-page'
import { TestButton } from 'components/elements/TestButton/TestButton'
import { ROWS_PER_PAGE_OPTIONS } from 'configs/constants'
import { ChangeEvent, memo, useCallback, useMemo } from 'react'
import classNames from 'classnames'

export type TestPaginationProps = {
  pageSize: number
  pageIndex: number
  pageCount: number
  onPaginationChange?: (pageIndex: number, pageSize: number) => void
  className?: string | undefined
}

// Component used for displaying pagination
export const TestPagination = memo((props: TestPaginationProps) => {
  const { t } = useTranslation()

  // Check if it's possible to go to the previous page
  const canPreviousPage = useMemo(() => {
    return props.pageIndex > 0
  }, [props.pageIndex])

  // Check if it's possible to go to the next page
  const canNextPage = useMemo(() => {
    return props.pageIndex < props.pageCount - 1
  }, [props.pageCount, props.pageIndex])

  // handle go to first page
  const handleGoToFirstPage = useCallback(() => {
    props.onPaginationChange?.(0, props.pageSize) // 0 is first page
  }, [props])

  // handle go to previous page
  const handleGoToPreviousPage = useCallback(() => {
    props.onPaginationChange?.(props.pageIndex - 1, props.pageSize)
  }, [props])

  // handle go to next page
  const handleGoToNextPage = useCallback(() => {
    props.onPaginationChange?.(props.pageIndex + 1, props.pageSize)
  }, [props])

  // handle go to last page
  const handleGoToLastPage = useCallback(() => {
    props.onPaginationChange?.(props.pageCount - 1, props.pageSize)
  }, [props])

  // handle page size change
  const handlePageSizeChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const pageSize = Number(event.target.value)
      props.onPaginationChange?.(0, pageSize) // Reset to the first page when changing the number of items displayed per page
    },
    [props]
  )

  return (
    <div className={classNames('flex gap-1 items-center', props.className)}>
      {/* Button to go to the first page */}
      <TestButton
        icon={<FirstPage width={24} height={24} />}
        onClick={handleGoToFirstPage}
        disabled={!canPreviousPage}
        stylingMode="text"
        size="sm"
      />

      {/* Button to go to the previous page */}
      <TestButton
        icon={<KeyboardArrowLeft width={24} height={24} />}
        onClick={handleGoToPreviousPage}
        disabled={!canPreviousPage}
        stylingMode="text"
        size="sm"
      />

      {/* Display information about the current page */}
      <span className="flex items-center gap-1 mx-2">
        {props.pageIndex + 1} / {props.pageCount}
      </span>

      {/* Button to go to the next page */}
      <TestButton
        icon={<KeyboardArrowRight width={24} height={24} />}
        onClick={handleGoToNextPage}
        disabled={!canNextPage}
        stylingMode="text"
        size="sm"
      />

      {/* Button to go to the last page */}
      <TestButton
        icon={<LastPage width={24} height={24} />}
        onClick={handleGoToLastPage}
        disabled={!canNextPage}
        stylingMode="text"
        size="sm"
      />

      {/* Dropdown to select the number of items displayed per page */}
      <select
        value={props.pageSize}
        onChange={handlePageSizeChange}
        className="Test-text-default Test-bg-default"
      >
        {ROWS_PER_PAGE_OPTIONS.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t('label.TestTable.numberItemOfPage', { page: pageSize })}
          </option>
        ))}
      </select>
    </div>
  )
})
