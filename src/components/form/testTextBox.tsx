import { ComponentProps, forwardRef, memo, PropsWithChildren } from 'react'
import { TextBox } from 'devextreme-react'

type Props = PropsWithChildren<ComponentProps<typeof TextBox>>

export const TestTextBox = memo(
  forwardRef<TextBox, Props>(({ children, ...rest }, ref) => (
    <TextBox ref={ref} {...rest}>
      {children}
    </TextBox>
  ))
)
