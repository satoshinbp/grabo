import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, ScrollView, FlatList, Image, Text, Button, Divider } from 'native-base'
import Loading from '../components/Loading'
import { setProduct } from '../features/product'
import Report from '../components/Report'
import ProductActionModal from '../components/ProductActionModal'

export default ({ navigation }) => {
  const route = useRoute()

  const { token } = useSelector((state) => state.auth)
  const { product, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProduct({ token, id: route.params.id }))
    })

    return unsubscribe
  }, [navigation])

  const modalHandler = () => setIsModalOpen(!isModalOpen)

  const ImageList = ({ item }) => (
    <>
      <Image source={{ uri: item.url }} alt="product" size="xl" />
      <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
    </>
  )

  const QuestionList = ({ item }) => (
    <>
      <Text>{item.question}</Text>
      <Button>Highlight</Button>
      {item.answers.map(() => (
        <>
          <Text>{item.description}</Text>
          <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
        </>
      ))}
      <Divider my={2} w="100%" />
    </>
  )

  if (loading) return <Loading />
  return (
    <>
      <FlatList
        data={product.images}
        renderItem={ImageList}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        horizontal
        showsHorizontalScrollIndicator
      />
      <ScrollView>
        <View variant="wrapper">
          <FlatList data={product.fixedQandAs} renderItem={QuestionList} keyExtractor={(item) => item.question} />
          {product.fixedQandAs?.map((QandA) => (
            <>
              <Text>{QandA.question}</Text>
              <Button>Highlight</Button>
              {QandA.answers.map(() => (
                <>
                  <Text>{QandA.description}</Text>
                  <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
                </>
              ))}
              <Divider my={2} w="100%" />
            </>
          ))}
        </View>
      </ScrollView>
      <ProductActionModal modalHandler={modalHandler} modalVisible={isModalOpen} />
      <Button variant="fab">Create New Question</Button>
    </>
  )
}
