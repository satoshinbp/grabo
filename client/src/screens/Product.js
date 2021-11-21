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
  addAnswerToUniqQn,
  addAnswerToFixedQn,
  addUserToFixedQuestionHighlight,
  addUserToUniqQuestionHighlight,
  removeUserFromFixedQuestionHighlight,
  removeUserFromUniqQuestionHighlight,
  addUserToFavorite,
  removeUserFromFavorite,
} from '../features/product'
import { updateReport } from '../api/product'
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
  const [questionType, setQuestionType] = useState('') // "fixed" or "uniq"
  const [questionIndex, setQuestionIndex] = useState(0)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [reportItem, setReportItem] = useState(null)
  const [reports, setReports] = useState([])

  // SET UP PRODUCT WHEN SCREEN OPENED
  const getProduct = () => {
    switch (route.name) {
      case 'GroupProduct':
        setProduct(groupedProducts.filter((product) => product._id === route.params.id)[0])
        break
      case 'MyProduct':
        setProduct(postedProducts.filter((product) => product._id === route.params.id)[0])
        break
      case 'Favorite':
        setProduct(savedProducts.filter((product) => product._id === route.params.id)[0])
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

  // HANDLE SUBMISSION FROM MODAL
  const submitQuestion = () => {
    setIsModalOpen(false)

    const params = { id: product?._id, question }
    dispatch(addQuestion({ token, params }))

    setQuestion(null)
  }

  const submitAnswer = () => {
    setIsModalOpen(false)

    const params = { id: product?._id, questionIndex, answer }
    if (questionType === 'fixed') {
      dispatch(addAnswerToFixedQn({ token, params }))
    } else {
      dispatch(addAnswerToUniqQn({ token, params }))
    }

    setAnswer(null)
  }

  const submitReport = () => {
    setIsModalOpen(false)
    const params = { reportKeys: reports, target: reportItem }
    updateReport(token, params)
    setReports([])
  }

  // TOGGLE HIGHLIGHT / FAVORITE
  const addUserToHighlight = (data) => {
    const params = { userId: user._id, questionIndex: data.questionIndex }
    if (data.isUniqQuestion) {
      dispatch(addUserToUniqQuestionHighlight({ token, id: product?._id, params }))
    } else {
      dispatch(addUserToFixedQuestionHighlight({ token, id: product?._id, params }))
    }
  }

  const removeUserFromHighlight = (params) => {
    if (params.isUniqQuestion) {
      dispatch(
        removeUserFromUniqQuestionHighlight({
          token,
          id: product?._id,
          userId: user._id,
          questionIndex: params.questionIndex,
        })
      )
    } else {
      dispatch(
        removeUserFromFixedQuestionHighlight({
          token,
          id: product?._id,
          userId: user._id,
          questionIndex: params.questionIndex,
        })
      )
    }
  }

  const toggleHighlight = (qa, questionIndex) => {
    const isHighlighted = qa.highlightedBy.includes(user._id)
    const data = {
      isUniqQuestion: type === 'uniq',
      questionIndex,
    }

    if (isHighlighted) {
      removeUserFromHighlight(data)
    } else {
      addUserToHighlight(data)
    }
  }

  const toggleFavorite = () => {
    const isFavored = product?.favoredUserIds.includes(user._id)
    if (isFavored) {
      dispatch(removeUserFromFavorite({ token, id: product?._id, userId: user._id }))
    } else {
      const params = { userId: user._id }
      dispatch(addUserToFavorite({ token, id: product?._id, params }))
    }
  }

  // SET UP MODAL FORM
  const setQuestionForm = () => {
    setIsModalOpen(true)
    setModalContentType('question')
  }

  const setAnswerForm = (index, type, questionDescription) => {
    setIsModalOpen(true)
    setModalContentType('answer')

    setQuestionIndex(index)
    setQuestionType(type)
    setQuestion(questionDescription)
  }

  const setReportForm = (questionIndex, answerIndex, type) => {
    setIsModalOpen(true)
    setModalContentType('report')

    setReportItem({ QandAsId: product?._id, questionIndex, answerIndex, type })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setQuestion(null)
    setAnswer(null)
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

  const QaAccordions = (qas, type) =>
    qas.map((qa, questionIndex) => (
      <Accordion>
        <Accordion.Item>
          <Accordion.Summary>
            <HStack alignItems="center">
              <VStack flex={1}>
                <Text>{type === 'uniq' ? qa.question.description : qa.question}</Text>
                <Text fontSize="xs">
                  This question has&nbsp;
                  {qa.answers.length}
                  {qa.answers.length > 1 ? ' answers' : ' answer'}
                </Text>
                <Text
                  onPress={() =>
                    setAnswerForm(questionIndex, type, type === 'uniq' ? qa.question.description : qa.question)
                  }
                >
                  Answer
                </Text>
              </VStack>
              <Pressable onPress={() => toggleHighlight(qa, questionIndex)}>
                <Box>{`★ ${qa.highlightedBy.length}`}</Box>
              </Pressable>
              <Accordion.Icon />
            </HStack>
          </Accordion.Summary>
          <Accordion.Details
            m={0}
            p={0}
            backgroundColor="linear-gradient(180deg, rgba(255, 200, 20, 0.52) 0%, rgba(255, 255, 255, 0.8) 85.42%);"
          >
            {qa.answers.map((answer, answerIndex) => (
              <>
                <View p={4} flexDirection="row" justifyContent="space-between">
                  <Text>{answer?.description}</Text>
                  <Pressable onPress={() => setReportForm(questionIndex, answerIndex, type)}>
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
        <FormControl.Label>{question}</FormControl.Label>
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
      <Checkbox.Group colorScheme="green" accessibilityLabel="Report" onChange={(values) => setReports(values)}>
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
          <View backgroundColor="black" width={windowWidth}>
            <HStack position="absolute" bottom={13} right={13} space={3}>
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
        {product?.fixedQandAs && QaAccordions(product?.fixedQandAs, 'fixed')}
        {product?.uniqQandAs && QaAccordions(product?.uniqQandAs, 'uniq')}

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
