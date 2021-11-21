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
  addNewQuestion,
  addAnswerToUniqQuestion,
  addAnswerToFixedQuestion,
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

const windowWidth = Dimensions.get('window').width

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { token, user } = useSelector((state) => state.auth)
  const { loading, groupedProducts, postedProducts, savedProducts } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const [product, setProduct] = useState({})
  const [activeSlide, setActiveSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState('') // "question", "answer", or "report"
  const [questionType, setQuestionType] = useState('') // "fixed" or "uniq"
  const [questionIndex, setQuestionIndex] = useState(0)
  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState({})
  const [reportItem, setReportItem] = useState({})
  const [reports, setReports] = useState([])

  const setProductByRoute = () => {
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
    const unsubscribe = navigation.addListener('focus', setProductByRoute)

    return unsubscribe
  }, [navigation])

  useEffect(setProductByRoute, [loading])

  // Handle submission from modal
  const submitQuestion = async () => {
    setIsModalOpen(false)
    try {
      dispatch(addNewQuestion({ token, id: product._id, params: question }))
      setQuestion({})
    } catch (e) {
      console.error(e)
    }
  }

  const submitAnswer = async () => {
    setIsModalOpen(false)
    try {
      if (answer.isUniqQuestion) {
        dispatch(addAnswerToUniqQuestion({ token, id: product._id, params: answer }))
      } else {
        dispatch(addAnswerToFixedQuestion({ token, id: product._id, params: answer }))
      }
      setAnswer({})
      setQuestion('')
    } catch (e) {
      console.error(e)
    }
  }

  const submitReport = async () => {
    setIsModalOpen(false)
    const params = { reportKeys: reports, target: reportItem }
    try {
      updateReport(token, params)
      setReports([])
    } catch (e) {
      console.error(e)
    }
  }

  // Handle icon on press actions
  const addUserToHighlight = async (data) => {
    const params = { userId: user._id, questionIndex: data.questionIndex }
    try {
      if (data.isUniqQuestion) {
        dispatch(addUserToUniqQuestionHighlight({ token, id: product._id, params }))
      } else {
        dispatch(addUserToFixedQuestionHighlight({ token, id: product._id, params }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  // Handle icon on press actions
  const removeUserFromHighlight = async (params) => {
    try {
      if (params.isUniqQuestion) {
        dispatch(
          removeUserFromUniqQuestionHighlight({
            token,
            id: product._id,
            userId: user._id,
            questionIndex: params.questionIndex,
          })
        )
      } else {
        dispatch(
          removeUserFromFixedQuestionHighlight({
            token,
            id: product._id,
            userId: user._id,
            questionIndex: params.questionIndex,
          })
        )
      }
    } catch (e) {
      console.error(e)
    }
  }

  const addUserToFavArray = async () => {
    const params = { userId: user._id }
    try {
      await dispatch(addUserToFavorite({ token, id: product._id, params }))
    } catch (e) {
      console.error(e)
    }
  }

  const removeUserFromFavArray = async () => {
    try {
      dispatch(removeUserFromFavorite({ token, id: product._id, userId: user._id }))
    } catch (e) {
      console.error(e)
    }
  }

  // Set up modal forms
  // setQuestionForm to be created
  const setAnswerForm = (index, type, questionDescription) => {
    setIsModalOpen(true)
    setModalContentType('answer')

    setQuestionIndex(index)
    setQuestionType(type)
    setQuestion(questionDescription)
  }

  const setQuestionForm = () => {
    setIsModalOpen(true)
    setModalContentType('question')
  }

  const setReportForm = (questionIndex, answerIndex, type) => {
    setIsModalOpen(true)
    setModalContentType('report')

    setReportItem({ QandAsId: product._id, questionIndex, answerIndex, type })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setQuestion('')
  }

  // Sub components to be rendered on the screen
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
    qas.map((qa, qaIndex) => (
      <>
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
                      setAnswerForm(qaIndex, type, type === 'uniq' ? qa.question.description : qa.question)
                    }
                  >
                    Answer
                  </Text>
                </VStack>
                <Pressable
                  onPress={() => {
                    const isHighlighted = qa.highlightedBy.includes(user._id)
                    const data = {
                      isUniqQuestion: type === 'uniq',
                      questionIndex: qaIndex,
                    }
                    isHighlighted ? removeUserFromHighlight(data) : addUserToHighlight(data)
                  }}
                >
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
                    <Pressable onPress={() => setReportForm(qaIndex, answerIndex, type)}>
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
        <Divider w="100%" my={4} />
      </>
    ))

  // set up modal props
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
          value={question}
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
          value={answer}
          onChangeText={(text) =>
            setAnswer({
              answer: {
                userId: user._id,
                description: text,
              },
              isUniqQuestion: questionType === 'uniq',
              questionIndex,
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
            {product.images?.length > 0 ? PaginationComponent(product.images) : null}
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
              <Pressable
                onPress={() => {
                  const isFavored = product.favoredUserIds.includes(user._id)
                  isFavored ? removeUserFromFavArray() : addUserToFavArray()
                }}
              >
                <Image
                  source={require('../assets/icons/like.png')}
                  alt="image"
                  width="28px"
                  height="28px"
                  padding={2}
                />
              </Pressable>
            </HStack>
          </View>
        </View>
      </View>
      <ScrollView variant="wrapper" flex={0.5} pt={4} mb={2}>
        {product.fixedQandAs && QaAccordions(product.fixedQandAs, 'fixed')}
        {product.uniqQandAs && QaAccordions(product.uniqQandAs, 'uniq')}

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
