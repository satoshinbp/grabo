import { Image } from 'native-base'
import React, { useState } from 'react'
import { Modal, StyleSheet, Pressable, View } from 'react-native'
import { VStack, HStack, Checkbox, Box, Heading, Button } from 'native-base'
import { updateReview } from '../api/product'
import reportOptions from '../utils/reports'

const ProductActionModal = (props) => {
  const [reports, setReports] = useState('')

  const handleSave = () => {
    props.modalHandler(false)
    const params = {
      reportKeys: reports,
      target: props.reportItem,
    }
    updateReview(params)
  }

  const handleCloseButton = () => {
    props.modalHandler(false)
    props.setReportItem('')
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.modalHandler(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => handleCloseButton()}>
              <Image
                source={require('../assets/close.jpeg')}
                alt="image"
                style={{ width: 30, height: 30, marginBottom: 15 }}
              />
            </Pressable>
            <Box>
              <VStack space={2}>
                <HStack alignItems="baseline">
                  <Heading fontSize="lg">Report</Heading>
                </HStack>
                <Checkbox.Group
                  colorScheme="green"
                  accessibilityLabel="Report"
                  onChange={(values) => {
                    setReports(values)
                  }}
                >
                  {reportOptions.map((report) => (
                    <Checkbox value={report.value} my=".5">
                      {report.message}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </VStack>
              <Button onPress={handleSave}>Report</Button>
            </Box>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default ProductActionModal
