import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider, Input } from 'native-base'
import Loading from '../components/Loading'
import { fetchProductById } from '../features/product'
import { putAnswer } from '../utils/api'

export default () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const [answerModal, setAnswerModal] = useState(false)
  const [qestionIdx, setQnIdx] = useState()
  const [answer, setAnswer] = useState()
  const { product, loading } = useSelector((state) => state.product)

  const handleAnswerSubmit = async () => {
    const params = { docId: product._id, answer: answer, questionIdx: qestionIdx }
    //console.log('docId', params.docId, 'answer', params.answer, 'questionIdx', params.questionIdx)
    const res = await putAnswer(params)
    setAnswer()
  }

  useEffect(() => {
    dispatch(fetchProductById(route.params.id))
  }, [])

  if (loading) return <Loading />
  return (
    <View>
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: item.url }} alt="product" size="xl" />
            <Button>Report</Button>
          </>
        )}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        w="100%"
      />
      <FlatList
        data={product.fixedQandAs}
        renderItem={({ item, index }) => (
          <>
            <Text>{item.question}</Text>
            <Button
              onPress={() => {
                setQnIdx(index)
                console.log(index)
                setAnswerModal(true)
              }}
            >
              {answerModal === true && qestionIdx === index ? 'Close the answer textarea' : 'Answer this question'}
            </Button>
            {answerModal && (
              <>
                <Input
                  mb="10"
                  placeholder="Please write an answer here"
                  blurOnSubmit={true}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss()
                  }}
                  alignItems="center"
                  value={answer}
                  onChangeText={(text) => {
                    setQnIdx(index)
                    console.log(index)
                    setAnswer(text)
                  }}
                />
                <Button onPress={handleAnswerSubmit}>Submit Answer</Button>
              </>
            )}
            <Button>Highlight</Button>
            <FlatList
              data={item.answers}
              renderItem={({ item }) => (
                <>
                  <Text>{item.description}</Text>
                  <Button>Report</Button>
                </>
              )}
              keyExtractor={(item) => item.description}
              showsVerticalScrollIndicator={false}
              w="100%"
            />
            <Divider my={2} w="100%" />
          </>
        )}
        keyExtractor={(item) => item.question}
        showsVerticalScrollIndicator={false}
        w="100%"
      />
      <Button>Create New Question</Button>
    </View>
  )
}
