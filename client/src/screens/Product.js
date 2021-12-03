import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/core'
import { Dimensions, Keyboard } from 'react-native'
import {
  View,
  ScrollView,
  Center,
  VStack,
  HStack,
  Pressable,
  Accordion,
  Divider,
  Image,
  Text,
  FormControl,
  TextArea,
  Button,
  Checkbox,
  useTheme,
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
import { fetchUserById, patchUser } from '../api/auth'
import reportOptions from '../utils/reports'
import Loading from '../components/Loading'
import SlideModal from '../elements/SlideModal'
import FavIcon from '../assets/icons/Fav'
import DiamondIcon from '../assets/icons/Diamond'
import ReportRedIcon from '../assets/icons/ReportRed'
import { cloneDeep } from 'lodash'
import FilledHeartIcon from '../assets/icons/HeartFilledYellow'
import WhiteHeartIcon from '../assets/icons/HeartStrokeWhite'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { colors } = useTheme()

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

  const sortQuestionsByHighlight = (product) => {
    const clonedProduct = cloneDeep(product)
    clonedProduct.fixedQandAs.sort((a, b) => b.highlightedBy.length - a.highlightedBy.length)
    clonedProduct.uniqQandAs.sort((a, b) => b.highlightedBy.length - a.highlightedBy.length)
    return clonedProduct
  }

  // SET UP PRODUCT WHEN SCREEN OPENED
  const getProduct = () => {
    switch (route.name) {
      case 'GroupProduct':
        const groupedProduct = groupedProducts.find((product) => product._id === route.params.id)
        setProduct(sortQuestionsByHighlight(groupedProduct))
        break
      case 'MyProduct':
        const postedProduct = postedProducts.find((product) => product._id === route.params.id)
        setProduct(sortQuestionsByHighlight(postedProduct))
        break
      case 'Favorite':
        const savedProduct = savedProducts.find((product) => product._id === route.params.id)
        setProduct(sortQuestionsByHighlight(savedProduct))
        break
      default:
        break
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', getProduct)

    return unsubscribe
  }, [navigation])

  useEffect(getProduct, [loading])

  // SET UP MODAL FORM
  const setQuestionForm = () => {
    setIsModalOpen(true)
    setModalContentType('question')
  }

  const setAnswerForm = (id, type, description, highlightedBy) => {
    setIsModalOpen(true)
    setModalContentType('answer')

    setAnswerFormParams({ id, type, description, highlightedBy })
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

  const submitAnswer = async () => {
    setIsModalOpen(false)

    const params = { id: answerFormParams.id, type: answerFormParams.type, answer }
    dispatch(addAnswer({ token, params }))

    //send notification if question is highlighted
    const userIds = answerFormParams.highlightedBy
    const users = userIds.map((userId) => fetchUserById(token, userId))
    const fetchedUsers = await Promise.all(users)

    const notificationParams = {
      notifications: {
        read: false,
        message: `${user.firstName} answered your highlighted question`,
        productId: product._id,
      },
    }

    fetchedUsers.forEach(async (user) => {
      await patchUser(token, user._id, notificationParams)
    })

    const notifiedUsers = fetchedUsers.filter((user) => user.isNotificationOn)

    const notificationTokens = notifiedUsers.map((user) => user.notificationToken)

    const sendPushNotification = async (expoPushToken) => {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Got Answer!',
        body: 'Someone answered your highlighted qusetion!',
        data: { someData: 'goes here' },
      }

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
    }

    notificationTokens.forEach(async (token) => {
      await sendPushNotification(token)
    })

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
  const toggleHighlight = (questionId, questionType, isHighlighted) => {
    const params = { userId: user._id, questionId, questionType }
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
  const PaginationComponent = (images) => (
    <Center w={windowWidth}>
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: colors.primary[600],
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    </Center>
  )

  const QuestionAccordions = (questions, type) =>
    questions.map((question, index) => (
      <View my={1} borderRadius="md" bg="white" shadow={2}>
        <Accordion borderWidth={0} borderRadius="md">
          <Accordion.Item backgroundColor="white">
            <Accordion.Summary _expanded={{ backgroundColor: colors.primary[500] }}>
              <HStack alignItems="center">
                <VStack flex={1}>
                  <Text>{type === 'uniq' ? question.question.description : question.question}</Text>
                  <Text fontSize="xs">
                    This question has&nbsp;
                    {question.answers.length}
                    {question.answers.length > 1 ? ' answers' : ' answer'}
                  </Text>
                  <HStack
                    py={2}
                    paddingRight={2}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <HStack space={2} alignItems="center">
                      {/* <Avatar size={7} alt="user portrait" borderRadius="full" /> */}
                      <HStack space={0.5} alignItems="center">
                        <Pressable
                          variant="icon"
                          onPress={() => toggleHighlight(question._id, type, question.highlightedBy.includes(user._id))}
                        >
                          <Center size={6}>
                            <DiamondIcon width="20px" />
                          </Center>
                        </Pressable>
                        <Text>{question.highlightedBy.length}</Text>
                      </HStack>
                      {type === 'uniq' && (
                        <Pressable variant="icon" onPress={() => setReportForm(type, question._id, answer?._id)}>
                          <Center size={6}>
                            <ReportRedIcon width="20px" />
                          </Center>
                        </Pressable>
                      )}
                    </HStack>
                    <Button
                      onPress={() =>
                        setAnswerForm(
                          question._id,
                          type,
                          type === 'uniq' ? question.question.description : question.question,
                          question.highlightedBy
                        )
                      }
                      w="120px"
                    >
                      <Text>Answer</Text>
                    </Button>
                  </HStack>
                </VStack>

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
                  <VStack p={4}>
                    <Text pb={2}>{answer?.description}</Text>
                    <HStack space={2} alignItems="center">
                      {/* <Avatar size={7} alt="user portrait" borderRadius="full" /> */}
                      <Pressable variant="icon" onPress={() => setReportForm(type, question._id, answer._id)}>
                        <ReportRedIcon width="22px" />
                      </Pressable>
                    </HStack>
                  </VStack>
                  <Divider bg="white" w="100%" />
                </>
              ))}
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
      </View>
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
      <View height={windowHeight * 0.3} position="relative" bg="primary.100">
        <Carousel
          data={product?.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} alt="product image" w="100%" h="100%" resizeMode="contain" />
          )}
          itemWidth={windowWidth}
          sliderWidth={windowWidth}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View position="absolute" bottom={-12}>
          {product?.images?.length > 0 ? PaginationComponent(product?.images) : null}
        </View>
        <View position="absolute" bottom={1} right={3}>
          <Pressable variant="icon" onPress={toggleFavorite}>
            <Center size={8}>
              {product.favoredUserIds.includes(user._id) ? (
                <FilledHeartIcon width="20px" />
              ) : (
                <WhiteHeartIcon width="20px" />
              )}
            </Center>
          </Pressable>
        </View>
      </View>

      <ScrollView flex={1} pt={4}>
        <View variant="wrapper">
          {product?.uniqQandAs.length > 0 && QuestionAccordions(product?.uniqQandAs, 'uniq')}
          {product?.fixedQandAs.length > 0 && QuestionAccordions(product?.fixedQandAs, 'fixed')}
        </View>

        {/* add extra space to avoid contents to be hidden by FAB */}
        <View h="96px" />
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
