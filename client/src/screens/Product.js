import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider, Pressable } from 'native-base'
import Loading from '../components/Loading'
import { setProduct } from '../features/product'
import Report from '../components/Report'
import ProductActionModal from '../components/ProductActionModal'

export default ({ navigation }) => {
  const route = useRoute()

  const { token } = useSelector((state) => state.auth)
  const { product, loading } = useSelector((state) => state.product)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportItem, setReportItem] = useState('')
  const dispatch = useDispatch()

  console.log('oraaaa', reportItem)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProduct({ token, id: route.params.id }))
    })

    return unsubscribe
  }, [navigation])

  const modalHandler = (item, fixedquestionIndex, answerIndex) => {
    setIsModalOpen(!isModalOpen)
    setReportItem({ fixedQandAsId: item._id, fixedquestionIndex: fixedquestionIndex, answerIndex: answerIndex })
  }

  if (loading) return <Loading />
  return (
    <>
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: item.url }} alt="product" size="xl" />
            <Pressable onPress={() => setReportItem({ image: item._id })}>
              <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
            </Pressable>
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
            <Button>Highlight</Button>
            {item.answers.map((answer, i) => (
              <>
                <Text>{answer.description}</Text>
                <Report modalHandler={() => modalHandler(item, index, i)} isModalOpen={isModalOpen} />
              </>
            ))}
            <Divider my={2} w="100%" />
          </>
        )}
        keyExtractor={(item) => item.question}
        showsVerticalScrollIndicator={false}
        w="100%"
      />
      <Button>Create New Question</Button>
      <ProductActionModal
        modalHandler={modalHandler}
        modalVisible={isModalOpen}
        reportItem={reportItem}
        setReportItem={setReportItem}
      />
    </View>
  )
}
