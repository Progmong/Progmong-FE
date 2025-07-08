import BaseContainer from '@/components/BaseContainer'
import useCommnunityApi from '@/constants/Community'
import usePetApi from '@/constants/pet'

const Wrapper = styled(BaseContainer)`
  display: flex;
  padding: 0;
`

const PetGuidContainer = styled.div`
  flex-grow: 1;

  background-color: #ccc;
  z-index: 0;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`

const PetGuidMessage = styled.div`
  color: var(--text-white);
  font-size: var(--font-size-2xl);
  font-weight: bold;
  font-family: 'Binggrae';
  max-width: 80%;
`

const PetInfoContaainer = styled.div`
  flex-grow: 5;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-radius: 1rem;
  background-color: var(--text-white);
  z-index: 1;
  margin-left: -10px;

  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  display: flex;
`

const PetImageContainer = styled.div`
  margin-left: 2rem;
`

const PetInfoContext = styled.div`
  flex-grow: 1;
  font-family: 'Binggrae';
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  justify-content: center;
`

const PetName = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
`

const PetStage = styled.div`
  margin-top: 0.5rem;
`

const PetLevel = styled.div``

// 프로그레스바 전체 컨테이너
const ProgressBarContainer = styled.div`
  max-width: 60%;
  width: 100%;
  height: 2rem;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin-top: 0.5rem;
`

// 채워지는 부분
const ProgressFiller = styled.div`
  height: 100%;
  background-color: var(--color-neon-4);
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease-in-out;
`

// 중앙 텍스트
const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-sm);
  font-weight: bold;
  color: #fff;
  pointer-events: none;
`

const PetExpContainer = styled.div`
  opacity: 0.6;
`

const CommunityActiveContainer = styled.div`
  flex-grow: 3;
  background-color: #ccc;
  color: var(--text-white);

  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Binggrae';

  gap: 1rem;
`

const ActiveTitle = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
`

const ActiveCateContainer = styled.div``

const ActiveCateTitle = styled.div`
  font-size: var(--font-size-xl);
`

const ActiveCateContent = styled.div`
  font-size: var(--font-size-lg);
  margin-top: 0.5rem;
`

const LoadingActivity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;
`

const BasePetInfo = ({ nickname }) => {
  const [pet, setPet] = useState(null)
  const [petLoading, setPetLoading] = useState(true)

  const [commuityAct, setCommunityAct] = useState(null)
  const [actLoading, setActLoading] = useState(true)

  const { getPetInfo } = usePetApi()
  const { communityActivity } = useCommnunityApi()

  // 펫 정보 불러오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await getPetInfo()
        console.log(res.data.data)
        setPet(res.data.data)

        setPetLoading(false)
      } catch (err) {
        console.log('펫 정보 불러오기 오류')
      }
    }

    const pet = fetchPostData()
    setPet(pet)

    // 해당 post를 불러올 때 까지 loading 찾을 띄움
  }, [])

  // 커뮤니티 활동 불러오기
  useEffect(() => {
    const fetchActData = async () => {
      try {
        const res = await communityActivity()
        console.log(res.data.data)
        setCommunityAct(res.data.data)

        setActLoading(false)
      } catch (err) {
        console.log('커뮤니티 활동 불러오기 오류')
      }
    }

    fetchActData()

    // 해당 post를 불러올 때 까지 loading 찾을 띄움
  }, [])

  // 이미지 경로 생성 (동적 import 사용 불가하므로 URL 방식 사용)
  const petImage = useMemo(() => {
    if (!pet?.petId || !pet?.evolutionStage) return null

    console.log('검사')
    console.log(pet)
    try {
      return new URL(
        `../assets/pets/pet${pet.petId}_stage${pet.evolutionStage}.png`,
        import.meta.url,
      ).href
    } catch (err) {
      console.error('❌ 펫 이미지 로드 실패:', err)
      return null
    }
  }, [pet])

  const stageToText = (evolutionStage) => {
    switch (evolutionStage) {
      case 1:
        return '알'
      case 2:
        return '성장기'
      case 3:
        return '성인기'

      default:
        return '알수없음'
    }
  }

  if (petLoading) return <IconLineMdLoadingTwotoneLoop />

  // 퍼센트 및 텍스트 계산
  const exp = pet.currentExp
  const maxExp = pet.maxExp
  const percent = Math.min(Math.max((exp / maxExp) * 100, 0), 100)
  const text = `${exp} / ${maxExp} (${Math.round(percent)}%)`

  return petLoading === false ? (
    <Wrapper>
      <PetGuidContainer>
        <PetGuidMessage>'{nickname}'</PetGuidMessage>
        <PetGuidMessage>님의</PetGuidMessage>
        <PetGuidMessage>프로그몽</PetGuidMessage>
      </PetGuidContainer>
      <PetInfoContaainer>
        <PetImageContainer>
          <img src={petImage} width={150}></img>
        </PetImageContainer>
        <PetInfoContext>
          <PetName>{pet.nickname}</PetName>
          <PetStage>단계 : {stageToText(pet.evolutionStage)}</PetStage>
          <PetLevel>레벨 : LV.{pet.level}</PetLevel>
          <ProgressBarContainer>
            <ProgressFiller $percent={percent} />
            {/* <ProgressText>{text}</ProgressText> */}
          </ProgressBarContainer>
          <PetExpContainer>
            경험치 {pet.currentExp} / {pet.maxExp}
          </PetExpContainer>
        </PetInfoContext>
      </PetInfoContaainer>
      <CommunityActiveContainer>
        <ActiveTitle>활동</ActiveTitle>
        {actLoading === false ? (
          <>
            <div style={{ textAlign: 'center' }}>
              <ActiveCateTitle>게시글</ActiveCateTitle>
              <ActiveCateContent>{commuityAct.postCount}</ActiveCateContent>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ActiveCateTitle>댓글</ActiveCateTitle>
              <ActiveCateContent>{commuityAct.commentCount}</ActiveCateContent>
            </div>
          </>
        ) : (
          <LoadingActivity>
            <IconLineMdLoadingTwotoneLoop />
          </LoadingActivity>
        )}
      </CommunityActiveContainer>
    </Wrapper>
  ) : (
    <IconLineMdLoadingTwotoneLoop />
  )
}
export default BasePetInfo
