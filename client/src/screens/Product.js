import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider, Input } from 'native-base'
import Loading from '../components/Loading'
import { fetchProductById } from '../features/product'
import { addAnswer } from '../utils/api'
import Report from '../components/Report'
import ProductActionModal from '../components/ProductActionModal'

export default ({ navigation }) => {
  const route = useRoute()
  const { product, loading } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const [questionIndex, setQuestionIndex] = useState()
  const [answer, setAnswer] = useState()
  console.log(user)

  const handleAnswerSubmit = async () => {
    const params = { docId: product._id, answer, questionIndex }
    //console.log('docId', params.docId, 'answer', params.answer, 'questionIdx', params.questionIdx)
    const res = await addAnswer(params)
    setAnswer()
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchProductById(route.params.id))
    })

    return unsubscribe
  }, [navigation])

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen)
  }

  if (loading) return <Loading />
  return (
    <View>
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: item.url }} alt="product" size="xl" />
            <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
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
                setQuestionIndex(index)
                setAnswer({
                  userId: user._id,
                  description: text,
                  report: {
                    wrong: 0,
                    affiliate: 0,
                    threats: 0,
                    privacy: 0,
                  },
                })
              }}
            />
            <Button onPress={handleAnswerSubmit}>Submit Answer</Button>

            <Button>Highlight</Button>
            <FlatList
              data={item.answers}
              renderItem={({ item }) => (
                <>
                  <Text>{item.description}</Text>
                  <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
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
      <ProductActionModal modalHandler={modalHandler} modalVisible={isModalOpen} />
    </View>
  )
}
