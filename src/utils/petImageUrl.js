export default function getPetImage(petId, stage) {
  if (!petId || !stage) return null

  try {
    // Vite의 import.meta.url로 정적 이미지 경로 생성
    return new URL(`../assets/pets/pet${petId}_stage${stage}.png`, import.meta.url).href
  } catch (err) {
    console.error('❌ 펫 이미지 로드 실패:', err)
    return null
  }
}
