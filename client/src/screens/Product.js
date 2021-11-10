import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute } from '@react-navigation/core'
import { Box, View, FlatList, Image, Text, Button, Divider, Input, Center, Accordion, onEndReached } from 'native-base'

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
  const [questionIndex, setQuestionIndex] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportItem, setReportItem] = useState('')
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
        itemWidth={250}
        sliderWidth={350}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Text>{product.images ? PaginationComponent(product.images) : <Loading />}</Text>
      <FlatList
        data={product.uniqQandAs}
        renderItem={({ item, index }) => (
          <>
            <Accordion>
              <Accordion.Item>
                <Accordion.Summary>
                  <View style={{ flexDirection: 'column' }}>
                    <Text>{item.question.description}</Text>
                    <Text>This has 3 ansers</Text>
                  </View>
                  <Text style={{ textAlign: 'right' }}>Answer</Text>
                  <Accordion.Icon />
                </Accordion.Summary>
                <Accordion.Details
                  style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor:
                      'linear-gradient(180deg, rgba(255, 200, 20, 0.52) 0%, rgba(255, 255, 255, 0.8) 85.42%);',
                  }}
                >
                  {item.answers.map((answer, i) => (
                    <>
                      <View
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>{answer.description}</Text>
                        <Report modalHandler={() => modalHandler(item, index, i)} isModalOpen={isModalOpen} />
                      </View>
                      <Divider my={2} w="100%" />
                    </>
                  ))}
                </Accordion.Details>
              </Accordion.Item>
            </Accordion>

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

            <Divider my={2} w="100%" />
          </>
        )}
        keyExtractor={(item) => item.question}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={product.fixedQandAs}
        renderItem={({ item, index }) => (
          <>
            <Accordion>
              <Accordion.Item>
                <Accordion.Summary>
                  <View style={{ flexDirection: 'column' }}>
                    <Text>{item.question.description}</Text>
                    <Text>This has 3 ansers</Text>
                  </View>
                  <Text style={{ textAlign: 'right' }}>Answer</Text>
                  <Accordion.Icon />
                </Accordion.Summary>
                <Accordion.Details
                  style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor:
                      'linear-gradient(180deg, rgba(255, 200, 20, 0.52) 0%, rgba(255, 255, 255, 0.8) 85.42%);',
                  }}
                >
                  {item.answers.map((answer, i) => (
                    <>
                      <View
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>{answer.description}</Text>
                        <Report modalHandler={() => modalHandler(item, index, i)} isModalOpen={isModalOpen} />
                      </View>
                      <Divider my={2} w="100%" />
                    </>
                  ))}
                </Accordion.Details>
              </Accordion.Item>
            </Accordion>

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
