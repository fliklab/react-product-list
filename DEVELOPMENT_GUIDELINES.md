# 개발 가이드라인

이 문서는 프로젝트 개발 시 준수해야 할 가이드라인을 정의합니다.

## 1. 컴포넌트 구조

### 관심사의 분리(Separation of Concerns)

- 각 컴포넌트는 단일 책임 원칙(Single Responsibility Principle)을 따라야 합니다.
- 비즈니스 로직, UI 로직, 스타일을 명확히 분리합니다.
- 큰 컴포넌트는 작은 재사용 가능한 컴포넌트로 분리합니다.

### 컴포넌트 디렉토리 구조

```
src/
  components/
    ComponentName/
      index.tsx              # 컴포넌트 메인 파일
      ComponentName.module.css  # 스타일 모듈
      ComponentName.test.tsx    # 테스트 파일 (필요시)
      ComponentName.utils.ts    # 컴포넌트 관련 유틸리티 함수 (필요시)
```

## 2. CSS 스타일링

### CSS 모듈 사용

- 모든 컴포넌트는 `[ComponentName].module.css` 파일을 사용해야 합니다.
- 글로벌 스타일은 `src/index.css`에만 정의합니다.
- CSS 클래스명은 camelCase로 작성합니다.

예시:

```tsx
// Button.tsx
import styles from "./Button.module.css";

export const Button = ({ children }) => {
  return <button className={styles.primaryButton}>{children}</button>;
};
```

```css
/* Button.module.css */
.primaryButton {
  background: blue;
  color: white;
  padding: 8px 16px;
}
```

## 3. 버전 관리

### 커밋 메시지 규칙

- 모든 커밋 메시지는 **영어**로 작성합니다.
- 커밋 메시지는 다음 형식을 따릅니다:

  ```
  type: subject

  body (optional)
  ```

### 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 프로세스, 패키지 매니저 설정 등 변경

### 커밋 메시지 예시

```
feat: add product filter component

- Add price range filter
- Add category filter
- Connect filters to product list
```
