import React from 'react'
import { Modal, Button } from 'native-base'

export default ({ isOpen, onClose, title, content, action, actionLabel }) => (
  <Modal isOpen={isOpen} animationType="slide" onClose={onClose} size="full" justifyContent="flex-end">
    <Modal.Content bg="white" borderBottomRadius={0} pb={3}>
      <Modal.CloseButton right="auto" left={3} borderWidth="2px" borderColor="primary.500" borderRadius="full" />

      <Modal.Header
        borderBottomWidth="0px"
        _text={{ fontSize: 'lg', fontWeight: 'bold', position: 'relative', left: 12 }}
      >
        {title}
      </Modal.Header>

      <Modal.Body pt={3} _text={{ fontSize: 'md', color: 'black' }}>
        {content}
      </Modal.Body>

      <Modal.Footer bg="white" justifyContent="center">
        <Button onPress={action} size="fixed" alignSelf="center">
          {actionLabel}
        </Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
)
