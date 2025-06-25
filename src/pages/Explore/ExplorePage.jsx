import { useState, useEffect } from 'react' // ✅ useState를 import 해야 오류 없음

import petImage from '../../assets/pets/pet1.png'
import passImage from '../../assets/pass.png'
import missImage from '../../assets/miss.png' // MISS 이미지 경로
import attackImage from '../../assets/attack.png'
import killImage from '../../assets/kill.png'
import CooldownCircle from './CooldownCircle'
import successImage from '../../assets/success.png'
import failImage from '../../assets/fail.png'
import { useNavigate } from 'react-router-dom'
import useExploreApi from '../../constants/explore'

import styled, { keyframes } from 'styled-components'
import bgImage from '../../assets/explore-bg.png'
import { swordCursor } from '../../utils/cursorBase64'
import {
  monsterHit,
  fadeTransition,
  lightningReveal,
  fadeInOut,
  resultPop,
} from './ExploreAnimations'

export const ProblemBoxContent = styled.div`
  animation: ${fadeTransition} 0.4s ease-in-out;
`

export const requireMonster = (n) =>
  new URL(`../../assets/monsters/monster-${n}.png`, import.meta.url).href

export const ResultImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  z-index: 999;
  animation: ${resultPop} 2.2s ease-in-out;
  pointer-events: none;
`

export const Background = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export const AttackEffect = styled.img`
  position: absolute;
  top: 20%;
  left: 45%;
  width: 180px;
  transform: translateX(-50%);
  z-index: 15;
  animation: ${lightningReveal} 0.7s ease-out;
  pointer-events: none;
`

// 🔧 MISS 이미지 (이제 MonsterContainer 안에서 위치 잡음)
export const MissImage = styled.img`
  position: absolute;
  top: 0px;
  left: 25%;
  transform: translateX(-50%);
  width: 120px;
  animation: ${fadeInOut} 1.2s ease-in-out;
  z-index: 5;
`

export const KillImage = styled.img`
  position: absolute;
  top: 0px;
  left: 25%;
  transform: translateX(-50%);
  width: 120px;
  animation: ${fadeInOut} 1.2s ease-in-out;
  z-index: 5;
`

// 🔧 몬스터+MISS 묶는 컨테이너
export const MonsterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  gap: 40px;
`

export const TransparentBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 24px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PetBox = styled(TransparentBox)`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위아래 간격 벌리기 */
  align-items: center;
`
export const ProblemBox = styled(TransparentBox)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위아래 간격 벌리기 */
  align-items: center;
  position: relative;
`
export const SequenceIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  z-index: 10;
`

export const ActionButton = styled.button`
  width: 150px;
  padding: 14px 28px;
  font-size: 18px;
  border-radius: 12px;
  border: 2px solid white; /* ✅ 흰색 테두리 */
  color: white;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ color }) => color};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  box-shadow: 0px 6px 0px ${({ color }) => darkenColor(color, 10)}; /* ✅ 그림자 효과 */
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color }) => darkenColor(color, 10)}; /* ✅ hover 시 색상 어둡게 */
    transform: translateY(-2px);
    box-shadow: 0px 8px 0px ${({ color }) => darkenColor(color, 10)};
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 0px ${({ color }) => darkenColor(color, 10)};
  }
`

export const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

export const ButtonSection = styled(TransparentBox)`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 1280px;
`
export const ButtonWithCooldown = styled.div`
  position: relative;
  width: 140px; // 버튼 고정 너비
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CooldownCircleWrapper = styled.div`
  position: absolute;
  right: -70px; // 버튼 오른쪽 외부로 띄우기
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`
/* square_bg */

export const PetInfoBox = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15); // 흰색 반투명
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`
export const ExpBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`

export const ExpBarFill = styled.div`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: linear-gradient(90deg, #ffd700, #ffa500);
  transition: width 0.3s ease;
`

export const ExpText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #000; /* 검은색 또는 어두운 글씨로 가독성 확보 */
  font-weight: bold;
  white-space: nowrap;
  pointer-events: none;
`

export const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
`

export const TooltipCursor = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  background: rgba(0, 0, 0, 0.85);
  color: #ffd700;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Press Start 2P', sans-serif;
  white-space: nowrap;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  border: 2px solid #ffd700;
`

export const MonsterImage = styled.img`
  width: 240px;
  height: auto;
  margin-bottom: 16px;
`

export const AnimatedMonsterImage = styled(MonsterImage)`
  &.hit {
    animation: ${monsterHit} 0.9s ease;
  }
`

export const MonsterLink = styled.a`
  cursor: ${swordCursor}, auto;
`

export const ProblemTitleLink = styled.a`
  color: #fff;
  text-decoration: none;
  cursor: ${swordCursor}, auto;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin: 4px 0;
`

export const ProblemInfoBox = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  text-align: left; // ⬅ 왼쪽 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PetImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(255, 182, 255, 0.6); /* 부드러운 빛 효과 */
`
export const PetImage = styled.img`
  width: 60%; /* 적절한 비율로 조절 */
  height: auto;
  object-fit: cover;
`

const ExplorePage = () => {
  const [cooldown, setCooldown] = useState(0) // 남은 쿨타임 (초)
  const [missVisible, setMissVisible] = useState(false)
  const [attackVisible, setAttackVisible] = useState(false)
  const [killVisible, setKillVisible] = useState(false)
  const [passVisible, setPassVisible] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [failVisible, setFailVisible] = useState(false)
  const [problems, setProblems] = useState([])
  const [monsterHitClass, setMonsterHitClass] = useState(false)
  const navigate = useNavigate()
  const { currentExplore, successProblem, passProblem, checkProblem } = useExploreApi()

  const handlePass = async () => {
    try {
      const res = await passProblem()
      if (res.data.success === true) {
        const { recommendProblems, finish, totalExp } = res.data.data

        // ✅ PASS 애니메이션 실행
        setPassVisible(true)
        setTimeout(() => {
          setPassVisible(false)
          localStorage.removeItem('exploreCooldownEnd')

          if (finish) {
            // ✅ 결과 페이지로 이동
            navigate('/explore/result', {
              state: {
                problems: recommendProblems,
                totalExp: totalExp,
              },
            })
          } else {
            setProblems(recommendProblems)
            setCooldown(0)
          }
        }, 1500) // 애니메이션 시간과 동일
      } else {
        alert('문제 추천에 실패했습니다.')
      }
    } catch (err) {
      console.error('탐험 시작 실패', err)
      alert('서버 오류로 탐험을 시작할 수 없습니다.')
    }
  }
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await currentExplore()
        if (res.data.success === true) {
          setProblems(res.data.data.recommendProblems)
        }
      } catch (err) {
        console.error('진행 상태 불러오기 실패', err)
        alert('진행 상태 불러오기 실패')
      }
    }

    fetchProgress()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const savedEndTime = localStorage.getItem('exploreCooldownEnd')
    if (savedEndTime) {
      const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000)
      if (remaining > 0) {
        setCooldown(remaining)
      } else {
        localStorage.removeItem('exploreCooldownEnd') // 만료된 정보 삭제
      }
    }
  }, [])

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((prev) => {
          const updated = prev > 0 ? prev - 1 : 0
          if (updated === 0) {
            localStorage.removeItem('exploreCooldownEnd')
          }
          return updated
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [cooldown])

  const handleAttack = async () => {
    if (cooldown > 0) return

    const problemId = currentProblem.id

    setCooldown(60)
    localStorage.setItem('exploreCooldownEnd', (Date.now() + 60_000).toString())
    setAttackVisible(true)
    setMonsterHitClass('hit')

    try {
      const res = await checkProblem(problemId)

      const isSolved = res.data.data

      setTimeout(async () => {
        setMonsterHitClass('')
        setAttackVisible(false)

        if (isSolved) {
          setKillVisible(true)

          try {
            const successRes = await successProblem()

            const { recommendProblems, finish, totalExp } = successRes.data.data

            setTimeout(() => {
              setKillVisible(false)
              setSuccessVisible(true)
            }, 800)
            setTimeout(() => {
              setSuccessVisible(false)

              if (finish) {
                navigate('/explore/result', {
                  state: {
                    problems: recommendProblems,
                    totalExp: totalExp,
                  },
                })
              } else {
                setProblems(recommendProblems)
                setCooldown(0)
                localStorage.removeItem('exploreCooldownEnd')
              }
            }, 2500)
          } catch (e) {
            console.error('백엔드 성공 처리 실패', e)
          }
        } else {
          // ❌ 실패 처리
          setMissVisible(true)

          setTimeout(() => {
            setMissVisible(false)
            setFailVisible(true)
          }, 800)

          setTimeout(() => {
            setFailVisible(false)
          }, 2500)
        }
      }, 900)
    } catch (err) {
      console.error('solved.ac API 오류', err)
      alert('solved.ac 조회 실패')
    }
  }

  const currentExp = 300
  const maxExp = 1000
  const expPercent = (currentExp / maxExp) * 100

  const currentProblem = problems.find((p) => p.status === '전투')
  if (!currentProblem) {
    return (
      <Background>
        <Layout>
          <p style={{ color: 'white' }}>현재 전투 중인 문제가 없습니다.</p>
        </Layout>
      </Background>
    )
  }

  return (
    <Background>
      {successVisible && <ResultImage src={successImage} alt="성공" />}
      {failVisible && <ResultImage src={failImage} alt="실페" />}
      {passVisible && <ResultImage src={passImage} alt="패스" />}
      <Layout>
        {/* 왼쪽 펫 정보 */}
        <PetBox>
          <PetImageWrapper>
            <PetImage src={petImage} alt="펫" />
          </PetImageWrapper>
          <PetInfoBox>
            <InfoRow>
              <span>이름</span>
              <span>프로그몽</span>
            </InfoRow>
            <InfoRow>
              <span>레벨</span>
              <span>3</span>
            </InfoRow>
            <InfoRow>
              <span>상태</span>
              <span>전투</span>
            </InfoRow>
            <InfoRow>
              <span>진화 단계</span>
              <span>2단계</span>
            </InfoRow>

            <InfoRow>
              <span>EXP</span>
            </InfoRow>
            <ExpBarWrapper>
              <ExpBarFill percent={expPercent} />
              <ExpText>
                {currentExp} / {maxExp} ({Math.floor(expPercent)}%)
              </ExpText>
            </ExpBarWrapper>
          </PetInfoBox>
        </PetBox>

        {/* 가운데 문제 + 몬스터 */}

        <ProblemBox>
          <SequenceIndicator>
            {currentProblem.sequence} / {problems.length}
          </SequenceIndicator>
          <ProblemBoxContent key={currentProblem.id}>
            <MonsterContainer>
              {attackVisible && <AttackEffect src={attackImage} alt="Attack" />}
              {missVisible && <MissImage src={missImage} alt="MISS" />}
              {killVisible && <KillImage src={killImage} alt="KILL" />}

              <ProblemTitleLink
                href={`https://www.acmicpc.net/problem/${currentProblem.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'none' }}
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                {currentProblem.id} {currentProblem.title}
              </ProblemTitleLink>
              <MonsterLink
                href={`https://www.acmicpc.net/problem/${currentProblem.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <AnimatedMonsterImage
                  className={monsterHitClass}
                  src={requireMonster(currentProblem.monsterImageIndex)}
                  alt="몬스터"
                />
              </MonsterLink>
              {showCursor && (
                <CursorWrapper style={{ left: cursorPos.x, top: cursorPos.y }}>
                  <TooltipCursor>문제 풀러 가기</TooltipCursor>
                </CursorWrapper>
              )}
            </MonsterContainer>
          </ProblemBoxContent>

          <ProblemInfoBox>
            <span>정보</span>
            <InfoRow>
              <span>문제 번호</span>
              <span>{currentProblem.id}</span>
            </InfoRow>
            <InfoRow>
              <span>난이도</span>
              <span>{currentProblem.tier}</span>
            </InfoRow>
            <InfoRow>
              <span>알고리즘</span>
              <span>{currentProblem.mainTagKo}</span>
            </InfoRow>
            <InfoRow>
              <span>맞힌 사람</span>
              <span>{currentProblem.solvedUserCount.toLocaleString()}</span>
            </InfoRow>
            <InfoRow>
              <span>획득 EXP</span>
              <span>{currentProblem.level * 10} EXP</span>
            </InfoRow>
          </ProblemInfoBox>
        </ProblemBox>
      </Layout>

      {/* 하단 버튼 */}
      <ButtonSection>
        <ActionButton color="#C3F154">나가기</ActionButton>

        <ButtonWithCooldown>
          <ActionButton color="#FD3B40" onClick={handleAttack} disabled={cooldown > 0}>
            공격
          </ActionButton>

          <CooldownCircleWrapper visible={cooldown > 0}>
            <CooldownCircle cooldown={cooldown} />
          </CooldownCircleWrapper>
        </ButtonWithCooldown>

        <ActionButton color="#4CDAFE" onClick={handlePass}>
          패스
        </ActionButton>
      </ButtonSection>
    </Background>
  )
}

export default ExplorePage
