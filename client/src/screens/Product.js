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
  Divider,
  Image,
  Text,
  FormControl,
  TextArea,
  Button,
  Checkbox,
} from 'native-base'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {
  addQuestion,
  addAnswer,
  highlightQuestion,
  unhighlightQuestion,
  saveProduct,
  unsaveProduct,
} from '../features/product'
import { reportQuestion, reportAnswer } from '../api/product'
import reportOptions from '../utils/reports'
import Loading from '../components/Loading'
import SlideModal from '../elements/SlideModal'
import FavIcon from '../assets/icons/Fav'

const windowWidth = Dimensions.get('window').width

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const { loading, groupedProducts, postedProducts, savedProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState('') // "question", "answer", or "report"
  const [question, setQuestion] = useState(null)
  const [answerFormParams, setAnswerFormParams] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [reportFormParams, setReportFormParams] = useState(null)
  const [reportKeys, setReportKeys] = useState([])

  // SET UP PRODUCT WHEN SCREEN OPENED
  const getProduct = () => {
    switch (route.name) {
      case 'GroupProduct':
        setProduct(groupedProducts.find((product) => product._id === route.params.id))
        break
      case 'MyProduct':
        setProduct(postedProducts.find((product) => product._id === route.params.id))
        break
      case 'Favorite':
        setProduct(savedProducts.find((product) => product._id === route.params.id))
        break
      default:
        break
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getProduct)

    return unsubscribe
  }, [navigation])

  useEffect(getProduct, [loading])

  // SET UP MODAL FORM
  const setQuestionForm = () => {
    setIsModalOpen(true)
    setModalContentType('question')
  }

  const setAnswerForm = (id, type, description) => {
    setIsModalOpen(true)
    setModalContentType('answer')

    setAnswerFormParams({ id, type, description })
  }

  const setReportForm = (type, questionId, answerId) => {
    setIsModalOpen(true)
    setModalContentType('report')

    setReportFormParams({ type, questionId, answerId })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setQuestion(null)
    setAnswer(null)
  }

  // HANDLE SUBMISSION FROM MODAL
  const submitQuestion = () => {
    setIsModalOpen(false)

    const params = { productId: product?._id, question }
    dispatch(addQuestion({ token, params }))

    setQuestion(null)
  }

  const submitAnswer = () => {
    setIsModalOpen(false)

    const params = { id: answerFormParams.id, type: answerFormParams.type, answer }
    dispatch(addAnswer({ token, params }))

    setAnswer(null)
    setAnswerFormParams(null)
  }

  const submitReport = async () => {
    setIsModalOpen(false)

    const params = {
      productId: product?._id,
      type: reportFormParams.type,
      questionId: reportFormParams.questionId,
      answerId: reportFormParams.answerId,
      reportKeys,
    }

    // Report state is not stored in redux, thus calling api directly
    try {
      await reportAnswer(token, params)
    } catch (e) {
      console.error(e)
    }

    setReportKeys([])
    setReportFormParams(null)
  }

  // TOGGLE HIGHLIGHT / FAVORITE FROM ICON BUTTON
  const toggleHighlight = (questionIndex, questionType, isHighlighted) => {
    const params = { productId: product?._id, userId: user._id, questionIndex, questionType }
    if (isHighlighted) {
      dispatch(unhighlightQuestion({ token, params }))
    } else {
      dispatch(highlightQuestion({ token, params }))
    }
  }

  const toggleFavorite = () => {
    const isFavored = product?.favoredUserIds.includes(user._id)
    const params = { productId: product?._id, userId: user._id }
    if (isFavored) {
      dispatch(unsaveProduct({ token, params }))
    } else {
      dispatch(saveProduct({ token, params }))
    }
  }

  // SUB COMPONENTS
  const CarouselImages = ({ item }) => <Image source={{ uri: item.url }} alt="product image" size="100%" />

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

  const QuestionAccordions = (questions, type) =>
    questions.map((question, index) => (
      <Accordion>
        <Accordion.Item>
          <Accordion.Summary>
            <HStack alignItems="center">
              <VStack flex={1}>
                <Text>{type === 'uniq' ? question.question.description : question.question}</Text>
                <Text fontSize="xs">
                  This question has&nbsp;
                  {question.answers.length}
                  {question.answers.length > 1 ? ' answers' : ' answer'}
                </Text>
                <Text
                  onPress={() =>
                    setAnswerForm(
                      question.question.id,
                      type,
                      type === 'uniq' ? question.question.description : question.question
                    )
                  }
                >
                  Answer
                </Text>
              </VStack>
              <Pressable onPress={() => toggleHighlight(index, type, question.highlightedBy.includes(user._id))}>
                <Box>{`★ ${question.highlightedBy.length}`}</Box>
              </Pressable>
              <Accordion.Icon />
            </HStack>
          </Accordion.Summary>
          <Accordion.Details
            m={0}
            p={0}
            backgroundColor="linear-gradient(180deg, rgba(255, 200, 20, 0.52) 0%, rgba(255, 255, 255, 0.8) 85.42%);"
          >
            {question.answers.map((answer) => (
              <>
                <View p={4} flexDirection="row" justifyContent="space-between">
                  <Text>{answer?.description}</Text>
                  <Pressable onPress={() => setReportForm(type, question._id, answer._id)}>
                    <Image
                      source={require('../assets/icons/exclamation.jpeg')}
                      alt="exclamation"
                      width="18px"
                      height="18px"
                      padding={2}
                    />
                  </Pressable>
                </View>
                <Divider w="100%" />
              </>
            ))}
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    ))

  // SET UP MODAL PROPS
  const modalTitle =
    modalContentType === 'question'
      ? 'Ask a Question'
      : modalContentType === 'answer'
      ? 'Answer the Question'
      : modalContentType === 'report'
      ? 'Report the question'
      : ''

  const modalContent =
    modalContentType === 'question' ? (
      <FormControl>
        <TextArea
          placeholder="Please write your question here"
          blurOnSubmit
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={question?.question.description}
          onChangeText={(text) =>
            setQuestion({
              question: {
                userId: user._id,
                description: text,
              },
              highlightedBy: [user._id],
            })
          }
          textAlignVertical="top"
        />
      </FormControl>
    ) : modalContentType === 'answer' ? (
      <FormControl>
        <FormControl.Label>{answerFormParams?.question}</FormControl.Label>
        <TextArea
          placeholder="Write your answer here"
          blurOnSubmit
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={answer?.description}
          onChangeText={(text) =>
            setAnswer({
              userId: user._id,
              description: text,
            })
          }
          textAlignVertical="top"
        />
      </FormControl>
    ) : modalContentType === 'report' ? (
      <Checkbox.Group colorScheme="green" accessibilityLabel="Report" onChange={(values) => setReportKeys(values)}>
        {reportOptions.map((report) => (
          <Checkbox value={report.value} my={0.5}>
            {report.message}
          </Checkbox>
        ))}
      </Checkbox.Group>
    ) : null

  const modalAction =
    modalContentType === 'question'
      ? submitQuestion
      : modalContentType === 'answer'
      ? submitAnswer
      : modalContentType === 'report'
      ? submitReport
      : null

  if (loading || !product) return <Loading />
  return (
    <>
      <View flex={0.5}>
        <View position="relative">
          <Carousel
            data={product?.images}
            renderItem={CarouselImages}
            itemWidth={windowWidth}
            sliderWidth={windowWidth}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Text position="absolute" bottom={0}>
            {product?.images?.length > 0 ? PaginationComponent(product?.images) : null}
          </Text>
          <View position="absolute" bottom={0} right={3}>
            <HStack space={3}>
              <Pressable>
                <Image
                  source={require('../assets/icons/exclamation.jpeg')}
                  alt="exclamation"
                  width="28px"
                  height="28px"
                  padding={2}
                />
              </Pressable>
              <Pressable onPress={toggleFavorite}>
                <Center size={8}>
                  <FavIcon width="24px" />
                </Center>
              </Pressable>
            </HStack>
          </View>
        </View>
      </View>

      <ScrollView variant="wrapper" flex={0.5} pt={4} mb={2}>
        {product?.fixedQandAs && QuestionAccordions(product?.fixedQandAs, 'fixed')}
        {product?.uniqQandAs && QuestionAccordions(product?.uniqQandAs, 'uniq')}

        {/* add extra space to avoid contents to be hidden by FAB */}
        <View h="60px" />
      </ScrollView>

      <Button variant="fab" onPress={setQuestionForm}>
        Ask a Question
      </Button>

      <SlideModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
        action={modalAction}
        actionLabel="Submit"
      />
    </>
  )
}
