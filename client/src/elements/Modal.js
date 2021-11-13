import React from 'react'
import { Modal, Button } from 'native-base'

export default ({ isOpen, onClose, body, action }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <Modal.Content bg="white">
      <Modal.CloseButton />
      <Modal.Header borderBottomWidth="0px" />
      <Modal.Body _text={{ fontSize: 'md', fontWeight: 'bold' }}>{body}</Modal.Body>
      <Modal.Footer bg="white">
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
            Cancel
          </Button>
          <Button onPress={action}>OK</Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
)
