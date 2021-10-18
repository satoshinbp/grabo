import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider } from 'native-base'
import Loading from '../components/Loading'
import { fetchProduct } from '../utils/api'

export default () => {
  const route = useRoute()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    setProduct(fetchProduct(route.params.id))
    setLoading(false)
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
        data={product.fixedQuestions}
        renderItem={({ item }) => (
          <>
            <Text>{item.question}</Text>
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
