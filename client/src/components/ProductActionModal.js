import { Image } from 'native-base'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, StyleSheet, Pressable, View, Keyboard } from 'react-native'
import { VStack, HStack, Checkbox, Box, Heading, Button, Text, Input } from 'native-base'
import { updateReview } from '../api/product'
import reportOptions from '../utils/reports'
import { addAnswer, addUniqQuestion, updateHighlight, updateFavorite } from '../api/product'
import Loading from '../components/Loading'

const ProductActionModal = (props) => {
  const { token, user } = useSelector((state) => state.auth)
  const { product, loading } = useSelector((state) => state.product)
  const [reports, setReports] = useState('')
  const [answer, setAnswer] = useState({})

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

  const handleAnswerSubmit = async () => {
    const params = { id: product._id, answer }
    try {
      await addAnswer(token, params)
      setAnswer({})
    } catch (e) {
      console.error(e)
    }
  }

  const modalContents = () => {
    console.log('baklaba')
    if (props.contentType === 'answer') {
      return (
        <Box>
          <VStack space={2}>
            <HStack alignItems="baseline">
              <Heading fontSize="lg">Answering a question</Heading>
            </HStack>
            <Text>{props.question}</Text>
            <Input
              placeholder="Write your answer here"
              blurOnSubmit={true}
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              value={answer}
              onChangeText={(text) => {
                setAnswer({
                  answer: {
                    userId: user._id,
                    description: text,
                  },
                  isUniqQuestion: props.type === 'uniq',
                  questionIndex: props.index,
                })
              }}
              alignItems="center"
            />
            <Button onPress={handleAnswerSubmit}>ANSWER</Button>
          </VStack>
        </Box>
      )
    }
    if (props.contentType === 'report') {
      return (
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
      )
    } else {
      return <Text> question</Text>
    }
  }
  if (loading) return <Loading />

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
            <Box>{modalContents()}</Box>
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
