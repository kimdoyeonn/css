# 박스 모델

css가 표시하는 모든 것은 박스이다.

border-radius을 이용하여 원처럼 보이는 박스이든, 그저 텍스트만 있더라도 모든 것이 박스로 되어있다는 것은 항상 기억하고 있어야 한다.

## 콘텐츠 및 크기

- 박스는 display 값, 설정된 치수 및 박스 안에 있는 콘텐츠에 따라 다르게 동작한다.
- 콘텐츠는 자식 요소에 의해 생성된 많은 수의 박스일수도, 일반 텍스트일수도 있다. 어느 쪽이든, 콘텐츠는 박스의 크기에 영향을 미친다.
- 콘텐츠의 크기를 조절하는 방법은 **외부 크기 조정**, **내부 크기 조정**이 있다.

- 외부 크기 조정

  - 박스에 고정된 너비가 있으면 외부 크기 조정 방식이다. 이 때 고정한 너비가 자식 콘텐츠의 크기를 제어한다.
  - 이 때 문제는 자식 콘텐츠의 크기가 너무 커서 부모 박스의 테두리 밖으로 오버플로우 될 수 있다는 것이다.

- 내부 크기 조정
  - 자식 콘텐츠의 크기가 너무 커서 부모 박스의 테두리 밖으로 오버플로우되는 현상을 방지하는 방법 중 하나는 `width`를 `min-content`로 설정하여 박스의 크기를 내부 크기로 설정하는 것이다.
  - `min-content`는 박스가 콘텐츠의 최소 내부 너비만큼만 넓어지도록 지시한다.

## 박스 모델의 영역

![박스모델](https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/ECuEOJEGnudhXW5JEFih.svg)

- 박스는 모두 특정 작업을 수행하는 박스 모델 영역으로 구성되어 있다.
- 안쪽부터 content box, padding box, border box, margin box

- content box: 콘텐츠가 있는 영역으로, 부모 콘텐츠의 크기를 제어할 수 있다.
- padding box: 콘텐츠 박스를 둘러싸고 있으며 `padding` 속성에 의해 생성되는 공간이다. 박스에 `overflow: auto` 또는 `overflow: scroll` 과 같은 오버플로 규칙이 설정되어 있을 때 생성되는 스크롤바도 이 공간에 위치한다.
- border box: padding box를 둘러싸고 있으며 `border` 속성에 의해 공간이 채워진다. 박스의 경계이며 시작적으로 프레임하는데 사용된다.
- margin box: `margin` 속성에 의해 정의되는 박스의 주변 공간이다. `outline`, `box-shadow` 같은 속성이 이 공간을 차지하고, 박스의 크기에는 영향을 미치지 않는다.

## 박스 모델 제어

박스 모델을 제어하는 방법을 이해하기 위해서는 브라우저에서 어떤 일이 발생하는지 이해해야 한다.

모든 브라우저는 HTML 문서에 사용자 에이전트 스타일시트를 적용한다. 사용되는 css는 브라우저마다 다르지만 콘텐츠를 더 쉽게 읽을 수 있도록 합리적인 기본값을 제공한다.

css가 별도로 정의되지 않은 경우 이 사용자 에이전트 스타일시트에 의해 요소의 모양과 동작이 정의된다.

### display

- `<div>`: `display: block`
- `<li>`: `display: list-item`
- `<span>`: `display: inline`

- `inline`: 콘텐츠만큼의 크기를 가진다. 높이, 너비 적용 안됨 padding, margin(top, bottom) 적용 안됨
- `block`: 한 줄을 차지함. 다음 블럭은 다음 줄에
- `inline-block`: 가장 중요한 성질은 `inline`과 비슷함. 대신 높이, 너비, padding, margin(top, bottom) 적용 가능함
- `block` 요소는 사용 가능한 한 줄을 다 채우는 반면 `inline`과 `inline-block` 요소는 콘텐츠만큼만 커진다.

### box-sizing

박스 크기 계산하는 방법 알려준다.
기본적으로 모든 요소에는 `box-sizing: content-box`와 같은 사용자 에이전트 스타일이 있다.

- `content-box`

  - `width`와 `height` 같은 치수를 설정할 때 content box를 기준으로 적용된다는 것을 의미한다.
  - 이 상태에서 `padding`, `border`를 설정하면 고정된 콘텐츠 박스의 크기에 더해지는 방식으로 적용된다.
  - 때문에 박스의 정확한 크기를 알고 싶으면 추가적인 계산이 필요하다.

- `border-box`
  - border box를 기준으로 `width`와 `height`가 설정된다.
  - 때문에 `content-box`의 단점을 해결할 수 있다.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

`border-box`를 사용하는 것이 박스 모델을 예측하는데 더 편리하기 때문에 개발자들은 종종 위와 같은 규칙을 포함하여 css를 재설정한 후 개발을 진행한다.

또, 브라우저마다 사용자 에이전트 스타일시트에 차이가 있는 것을 통일하기 위해 전체 css를 재설정하는 규칙을 추가한다.([A Mordern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/))

### 브라우저별 사용자 에이전트 스타일시트

- [Chromium](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css)
- [Firefox](https://searchfox.org/mozilla-central/source/layout/style/res/html.css)
- [Webkit](https://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css)
