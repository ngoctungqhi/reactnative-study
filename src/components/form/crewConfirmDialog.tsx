import { FC, memo } from 'react'
import {
  ButtonType,
  CrewButton,
} from 'components/elements/crewButton/crewButton'
import { Modal } from 'components/layouts/modal/modal'
import { useTranslation } from '@crew/modules/i18n'
import classNames from 'classnames'

export type CrewConfirmDialogProps = {
  isOpen: boolean
  message: string
  textStyle?: string
  onPermitButtonClick: () => void
  onCancelButtonClick: () => void
  renderItem?: React.ReactNode
  permitButtonText?: string
  cancelButtonText?: string
  permitButtonTheme?: ButtonType
  cancelButtonTheme?: ButtonType
  permitButtonDisabled?: boolean
}

export const CrewConfirmDialog: FC<CrewConfirmDialogProps> = memo(
  (props: CrewConfirmDialogProps) => {
    const { t } = useTranslation()

    return (
      <Modal
        title=""
        isOpen={props.isOpen}
        onClose={props.onCancelButtonClick}
        // 確認ダイアログが画面いっぱいに広がらないようにする対応。importantを付けないとModal側に記載されているスタイルと打ち消しあって適用されないため、importantを使用している
        className="!mx-auto !w-auto !max-w-4xl !h-auto !rounded-lg"
      >
        <div className="flex flex-col items-center justify-center gap-y-5">
          <div className="flex flex-col gap-y-2.5">
            <div className={classNames('text-center', props.textStyle)}>
              {props.message}
            </div>

            {/* Custom item for confirm dialog */}
            {props.renderItem}
          </div>

          <div className="flex justify-center gap-x-5">
            {/* OKボタン */}
            <CrewButton
              text={props.permitButtonText ?? t('action.confirmPermit')}
              type={props.permitButtonTheme ?? 'primary'}
              onClick={props.onPermitButtonClick}
              disabled={props.permitButtonDisabled}
            />

            {/* キャンセルボタン */}
            <CrewButton
              text={props.cancelButtonText ?? t('action.confirmCancel')}
              type={props.cancelButtonTheme ?? 'normal'}
              onClick={props.onCancelButtonClick}
            />
          </div>
        </div>
      </Modal>
    )
  }
)
