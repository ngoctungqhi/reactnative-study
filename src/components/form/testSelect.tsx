import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TestSelectItemBottomSheet } from 'components/elements/TestSelectItemBottomSheet/TestSelectItemBottomSheet'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ViewProps } from 'react-native'
import { genericMemo } from 'utils'

import { Input } from './components/input'
import { TestText } from '../TestText'

export type TestSelectProps<TItem> = {
  data?: TItem[]
  value?: TItem | string | null | undefined
  placeholder?: string
  loading?: boolean
  showClear?: boolean
  disabled?: boolean
  valueExpr: keyof TItem
  displayExpr: keyof TItem
  enableSearch?: boolean
  searchTimeout?: number
  searchInputPlaceholder?: string
  onSearch?: (searchText: string) => void
  renderItem?: (item: TItem) => JSX.Element
  onValueChange?: (value: string | null) => void
  onChange?: (item: TItem | null) => void
  isInvalid?: boolean
} & ViewProps

export const TestSelect = genericMemo(
  <TItem,>({
    data = [],
    value,
    placeholder,
    showClear,
    disabled,
    valueExpr,
    displayExpr,
    enableSearch,
    searchTimeout,
    searchInputPlaceholder = 'Search',
    onSearch,
    renderItem,
    onValueChange,
    onChange,
    isInvalid,
    ...props
  }: TestSelectProps<TItem>) => {
    const [selectedItem, setSelectedItem] = useState<TItem | undefined>()
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    useEffect(() => {
      if (value) {
        const item = data.find((item) =>
          typeof item === 'object'
            ? _.get(item, valueExpr) === value
            : item === value
        )
        setSelectedItem(item)
      }
    }, [data, value, valueExpr])

    // Handle select item
    const handleContentSelect = useCallback(
      (item: TItem | undefined) => {
        const value = _.get(item, valueExpr)
        onChange?.(item ?? null)
        onValueChange?.(value)
        setSelectedItem(item)
        bottomSheetModalRef.current?.dismiss()
      },
      [onChange, onValueChange, valueExpr]
    )

    // show bottom sheet when press on input
    const handleInputPress = useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])

    // Handle clear selected item
    const handleClearButtonPress = useCallback(() => {
      handleContentSelect?.(undefined)
    }, [handleContentSelect])

    return (
      <>
        <Input
          onPress={handleInputPress}
          disabled={disabled}
          showClear={showClear}
          onClearSelectedItem={handleClearButtonPress}
          selectedItem={selectedItem}
          isInvalid={isInvalid}
          {...props}
        >
          {renderItem ? (
            selectedItem ? (
              renderItem(selectedItem)
            ) : (
              placeholder
            )
          ) : (
            <TestText numberOfLines={1} ellipsizeMode="tail">
              {_.get(selectedItem, displayExpr) || placeholder}
            </TestText>
          )}
        </Input>

        <TestSelectItemBottomSheet
          ref={bottomSheetModalRef}
          multiple={false}
          data={data}
          onSearch={onSearch}
          selectedItem={selectedItem}
          enableSearch={enableSearch}
          searchTimeout={searchTimeout}
          valueExpr={valueExpr}
          displayExpr={displayExpr}
          renderItem={renderItem}
          onSelect={handleContentSelect}
          searchInputPlaceholder={searchInputPlaceholder}
        />
      </>
    )
  }
)
