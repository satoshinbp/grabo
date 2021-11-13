import React from 'react'
import { Modal, Button } from 'native-base'

export default ({
  isOpen,
  onClose,
  header,
  body,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <Modal.Content bg="white">
      <Modal.CloseButton right="auto" left={3} borderWidth="2px" borderColor="primary.500" borderRadius="full" />

      <Modal.Header
        borderBottomWidth="0px"
        _text={{ fontSize: 'lg', fontWeight: 'bold', position: 'relative', left: 12 }}
      >
        {header}
      </Modal.Header>

      <Modal.Body pt={3} _text={{ fontSize: 'md', color: 'black' }}>
        {body}
      </Modal.Body>

      <Modal.Footer bg="white">
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="gray" onPress={secondaryAction}>
            {secondaryActionLabel}
          </Button>
          <Button onPress={primaryAction}>{primaryActionLabel}</Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
)
