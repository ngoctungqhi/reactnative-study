import { ComponentProps, forwardRef, memo, PropsWithChildren } from 'react'
import { SelectBox } from 'devextreme-react'
import { SEARCH_TIMEOUT_MSEC } from '@Test/configs/constants'

type Props = PropsWithChildren<ComponentProps<typeof SelectBox>>

/**
 * SelectBoxのラッパー（react-hook-form非対応版）
 */
export const TestSelectBox = memo(
  forwardRef<SelectBox, Props>(({ children, ...rest }, ref) => (
    <SelectBox
      {...rest}
      ref={ref}
      labelMode={rest.labelMode ?? 'static'}
      displayExpr={rest.displayExpr}
      valueExpr={rest.valueExpr}
      searchEnabled={rest.searchEnabled}
      searchExpr={rest.searchExpr}
      searchTimeout={rest.searchTimeout ?? SEARCH_TIMEOUT_MSEC}
      minSearchLength={rest.minSearchLength ?? 1}
      showClearButton={rest.showClearButton ?? true}
      wrapItemText={rest.wrapItemText ?? true}
    >
      {children}
    </SelectBox>
  ))
)
