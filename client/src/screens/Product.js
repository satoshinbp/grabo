import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/core'
import { Dimensions, Keyboard } from 'react-native'
import {
  View,
  ScrollView,
  Box,
  VStack,
  HStack,
  Center,
  Pressable,
  Accordion,
  Image,
  Text,
  Button,
  Divider,
  Input,
} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { setProduct } from '../features/product'
import { addAnswer, addUniqQuestion, updateHighlight, updateFavorite } from '../api/product'
import Loading from '../components/Loading'
import ProductActionModal from '../components/ProductActionModal'
import Report from '../components/Report'

const windowWidth = Dimensions.get('window').width

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const { product, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [activeSlide, setActiveSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportItem, setReportItem] = useState(null)
  const [answer, setAnswer] = useState({})
  const [question, setQuestion] = useState({})
  const [contentType, setContentType] = useState('')
  const [index, setIndex] = useState(0)
  const [type, setType] = useState('')
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setProduct({ token, id: route.params.id }))
    })

    return unsubscribe
  }, [navigation])

  const handleAnswerSubmit = async () => {
    const params = { id: product._id, answer }
    console.log(answer)
    try {
      await addAnswer(token, params)
      setAnswer({})
    } catch (e) {
      console.error(e)
    }
  }

  const handleQuestionSubmit = async () => {
    const params = { id: product._id, question }
    try {
      await addUniqQuestion(token, params)
      setQuestion({})
    } catch (e) {
      console.error(e)
    }
  }

  const handleHighlightSubmit = async (params) => {
    try {
      await updateHighlight(token, params)
    } catch (e) {
      console.error(e)
    }
  }

  const handleFavoriteSubmit = async (params) => {
    try {
      await updateFavorite(token, params)
    } catch (e) {
      console.error(e)
    }
  }

  const answerClickHandler = (index, type, questionDescription) => {
    setIsModalOpen(true)
    setContentType('answer')
    setIndex(index)
    setType(type)
    setQuestion(questionDescription)
  }

  const modalHandler = (item, fixedquestionIndex, answerIndex) => {
    setIsModalOpen(!isModalOpen)
    setReportItem({ fixedQandAsId: item._id, fixedquestionIndex, answerIndex })
    setContentType('report')
  }

  const carouselImages = ({ item }) => <Image source={{ uri: item.url }} alt="product image" size="100%" />

  const PaginationComponent = (images) => (
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
      <Center w={windowWidth} />
    </View>
  )

  const QandAAccordions = (QandAs, type) =>
    QandAs.map((QandA, index) => (
      <>
        <Accordion>
          <Accordion.Item>
            <Accordion.Summary>
              <HStack alignItems="center">
                <VStack flex={1}>
                  <Text>{type === 'uniq' ? QandA.question.description : QandA.question}</Text>
                  <Text fontSize="xs">
                    This question has&nbsp;
                    {QandA.answers.length}
                    {QandA.answers.length > 1 ? ' answers' : ' answer'}
                  </Text>
                  <Text
                    onPress={() =>
                      answerClickHandler(index, type, type === 'uniq' ? QandA.question.description : QandA.question)
                    }
                  >
                    Answer
                  </Text>
                </VStack>
                <Pressable
                  onPress={() => {
                    const highlightStatus = QandA.highlightedBy.includes(user._id)
                    const params = {
                      id: product._id,
                      userId: user._id,
                      isUniqQuestion: type === 'uniq',
                      questionIndex: index,
                      isHighlighted: highlightStatus,
                    }
                    handleHighlightSubmit(params)
                  }}
                >
                  <Box>{`★ ${QandA.highlightedBy.length}`}</Box>
                </Pressable>
                <Accordion.Icon />
              </HStack>
            </Accordion.Summary>
            <Accordion.Details
              margin={0}
              padding={0}
              backgroundColor="linear-gradient(180deg, rgba(255, 200, 20, 0.52) 0%, rgba(255, 255, 255, 0.8) 85.42%);"
            >
              {QandA.answers.map((answer, i) => (
                <>
                  <View padding={4} flexDirection="row" justifyContent="space-between">
                    <Text>{answer.description}</Text>
                    <Report modalHandler={() => modalHandler(QandA, index, i)} isModalOpen={isModalOpen} />
                  </View>
                  <Divider w="100%" />
                </>
              ))}
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
        <Input
          placeholder="Please write an answer here"
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
              isUniqQuestion: type === 'uniq',
              questionIndex: index,
            })
          }}
          alignItems="center"
        />
        <Button onPress={handleAnswerSubmit}>Answer</Button>
        <Divider w="100%" my={4} />
      </>
    ))

  if (loading) return <Loading />
  return (
    <>
      <View flex={0.5}>
        <Carousel
          data={product.images}
          renderItem={carouselImages}
          itemWidth={windowWidth}
          sliderWidth={windowWidth}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Text>{product.images?.length > 0 ? PaginationComponent(product.images) : null}</Text>
      </View>
      <>
        <Button
          onPress={() => {
            const favoriteStatus = product.favoredUserIds.includes(user._id)
            const params = {
              id: product._id,
              userId: user._id,
              isFavored: favoriteStatus,
            }
            handleFavoriteSubmit(params)
          }}
        >
          ❤︎
        </Button>
      </>

      <ScrollView variant="wrapper" flex={0.5} mb={2}>
        {product.fixedQandAs && QandAAccordions(product.fixedQandAs, 'fixed')}
        {product.uniqQandAs && QandAAccordions(product.uniqQandAs, 'uniq')}

        {/* to be inside a modal */}
        <>
          <Input
            placeholder="Please write your question here"
            blurOnSubmit={true}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            alignItems="center"
            value={question}
            onChangeText={(text) => {
              setQuestion({
                question: {
                  userId: user._id,
                  description: text,
                },
              })
            }}
          />
          <Button onPress={handleQuestionSubmit}>Question</Button>
        </>
        <ProductActionModal
          modalHandler={modalHandler}
          modalVisible={isModalOpen}
          reportItem={reportItem}
          setReportItem={setReportItem}
          contentType={contentType}
          index={index}
          type={type}
          question={question}
        />
      </ScrollView>
    </>
  )
}
