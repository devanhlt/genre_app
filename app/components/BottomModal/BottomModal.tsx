import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet"
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react"
import { View, ViewStyle } from "react-native"

import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import { ModalBackdrop } from "./ModalBackdrop"
import { ModalHeader } from "./ModalHeader"
import { spacing } from "app/theme"
import { isFunction } from "app/utils/func"

interface BottomModalProps extends BottomSheetModalProps {
  ModalFooterComponent?: JSX.Element
  style?: ViewStyle
  contentStyle?: ViewStyle
  title?: string
  id?: string
  children: React.ReactNode
  snapPoints: string[]
}

export const BottomModal = forwardRef<BottomSheetModalMethods, BottomModalProps>(
  function BottomModal(props, ref) {
    const {
      style: $containerStyleOverride,
      contentStyle: $contentStyleOverride,
      title = "",
      id = `bottom-modal-${new Date().getTime}`,
      ModalFooterComponent,
      snapPoints: bottomModalSnapPoints = ["50%"],
      children,
    } = props

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    // variables
    const snapPoints = useMemo(() => bottomModalSnapPoints, [bottomModalSnapPoints])

    const onCloseModal = () => {
      if (isFunction(bottomSheetModalRef?.current?.close)) {
        bottomSheetModalRef.current.close()
      }
    }

    const onDismissModal = () => null

    const renderBackdrop = useCallback((props) => <ModalBackdrop {...props} />, [])

    useImperativeHandle(
      ref,
      () => {
        return bottomSheetModalRef.current
      },
      [],
    )

    const content = children || <></>
    return (
      <BottomSheetModal
        name={id}
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        enablePanDownToClose={false}
        detached={true}
        snapPoints={snapPoints}
        onDismiss={onDismissModal}
      >
        <View style={[$modalContainer, $containerStyleOverride]}>
          <ModalHeader label={title} onCLose={onCloseModal} style={$modalHeader} />
          <View style={[$modalContent, $contentStyleOverride]}>{content}</View>
          {ModalFooterComponent}
        </View>
      </BottomSheetModal>
    )
  },
)

const $modalContainer: ViewStyle = {
  flex: 1,
}

const $modalContent: ViewStyle = {
  flex: 1,
}

const $modalHeader: ViewStyle = {
  paddingHorizontal: spacing.size16,
}
