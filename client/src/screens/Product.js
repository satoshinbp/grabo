import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { View, FlatList, Image, Text, Button, Divider, Input, Center } from 'native-base'
import { setProduct } from '../features/product'
import { addAnswer } from '../api/product'
import Loading from '../components/Loading'
import ProductActionModal from '../components/ProductActionModal'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Report from '../components/Report'

export default ({ navigation }) => {
  const route = useRoute()

  const { token, user } = useSelector((state) => state.auth)
  const { product, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const [questionIndex, setQuestionIndex] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportItem, setReportItem] = useState(null)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProduct({ token, id: route.params.id }))
    })

    return unsubscribe
  }, [navigation])

  const handleAnswerSubmit = async () => {
    const params = { id: product._id, answer }
    try {
      await addAnswer(token, params)
      setAnswer('')
    } catch (e) {
      console.error(e)
    }
  }

  const modalHandler = (item, fixedquestionIndex, answerIndex) => {
    setIsModalOpen(!isModalOpen)
    setReportItem({ fixedQandAsId: item._id, fixedquestionIndex: fixedquestionIndex, answerIndex: answerIndex })
  }

  const carouselImages = ({ item }) => {
    return <Image source={{ uri: item.url }} alt="product image" size="100%" />
  }

  const PaginationComponent = (images) => {
    return (
      <View>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'rgba(255, 255, 255)' }}
          alignSelf="center"
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.54)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Center
          width={{
            base: 400,
            lg: 600,
          }}
        ></Center>
      </View>
    )
  }

  if (loading) return <Loading />

  return (
    <>
      <Carousel
        data={product.images}
        renderItem={carouselImages}
        itemWidth={650}
        sliderWidth={650}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Text>{product.images ? PaginationComponent(product.images) : <Loading />}</Text>
      <FlatList
        data={product.uniqQandAs}
        renderItem={({ item, index }) => (
          <>
            <Text>{item.question.description}</Text>
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
                setAnswer({
                  answer: {
                    userId: user._id,
                    description: text,
                  },
                  isUniqQuestion: true,
                  questionIndex: index,
                })
              }}
            />
            <Button onPress={handleAnswerSubmit}>Submit Answer</Button>

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
                setAnswer({
                  answer: {
                    userId: user._id,
                    description: text,
                  },
                  isUniqQuestion: false,
                  questionIndex: index,
                })
              }}
            />
            <Button onPress={handleAnswerSubmit}>Submit Answer</Button>

            <Button>Highlight</Button>
            {item.answers.map((answer) => (
              <>
                <Text>{answer.description}</Text>
                <Report modalHandler={modalHandler} isModalOpen={isModalOpen} />
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
    </>
  )
}
