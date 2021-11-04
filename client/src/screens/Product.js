import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider } from 'native-base'
import Loading from '../components/Loading'
import { fetchProductById } from '../features/product'
import Report from '../components/Report'
import ProductActionModal from '../components/ProductActionModal'

export default () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.product)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProductById(route.params.id))
  }, [])

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
        renderItem={({ item }) => (
          <>
            <Text>{item.question}</Text>
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
