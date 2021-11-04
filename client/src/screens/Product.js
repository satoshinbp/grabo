import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider } from 'native-base'
import Loading from '../components/Loading'
import { fetchProductById } from '../features/product'
import { putAnswer } from '../utils/api'

export default () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.product)

  const handleAnswerSubmit = async () => {
    console.log('handleAnswer', product._id)
    const params = { docId: product._id, answer: "It's sweet and really good!" }
    const res = await putAnswer(params)
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
        renderItem={({ item }) => (
          <>
            <Text>{item.question}</Text>
            <Button onPress={handleAnswerSubmit}>Answer this question</Button>
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
