export default function Ingredients({ ingredients }) {
  // ingredients 문자열을 배열로 변환
  const ingredientsArray = ingredients.split(",");

  return (
    <div>
      <p style={{ textAlign: "left", wordBreak: "break-word" }}>
        {ingredientsArray.map((ingredient, index) => (
          // 배열의 마지막 요소에는 <br /> 태그를 추가하지 않습니다.
          <div key={index}>
            {ingredient}
            {index < ingredientsArray.length - 1 && <br />}
          </div>
        ))}
      </p>
    </div>
  );
}
