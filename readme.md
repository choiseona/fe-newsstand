# 설계

## 언론사 랜덤화

0. 언론사의 id(0~95)를 담은 json 형태의 객체 리터럴을 만든다.

1. 언론사가 96개 이므로 숫자를 0~95까지 랜덤으로 돌려서 새로운 배열을 만든다.

2. 랜덤으로 생성된 숫자들이 들어가 있는 배열을 이용해서 4개의 페이지 생성
   1페이지: 인덱스가 0-23에 해당하는 id값을 가진 이미지가 각 그리드에 나타남  
   2페이지: 인덱스가 24-47에 해당하는 id값을 가진 이미지가 각 그리드에 나타남  
   3페이지: 인덱스가 48-71에 해당하는 id값을 가진 이미지가 각 그리드에 나타남  
   4페이지: 인덱스가 72-95에 해당하는 id값을 가진 이미지가 각 그리드에 나타남

3. 페이지 이동 버튼을 누르면 이벤트가 발생한다.  
   -> 기존의 li태그를 DOM에서 모두 삭제 후 전환되는 페이지에 해당하는 id 값을 가지는 이미지들을 li태그를 이용해 DOM API를 이용해서 화면에 나타낸다.  
   이 때, 가장 첫 페이지에는 왼쪽 페이지 이동 버튼 display:none 설정. 마지막 페이지에서는 오른쪽 페이지 이동 버튼 display: none

## 최신 뉴스 자동 롤링

#### 애니메이션

0. 왼쪽 최신 뉴스, 오른쪽 최신 뉴스 각각 롤링될 내용의 리스트들을 ul,li태그를 이용해 DOM에 셍성한다.

1. css를 통해 current 최신 뉴스는 화면에 띄우고, next 최신 뉴스는 최신 뉴스 박스 아래에 위치시킨 후 화면에 보이지 않게 한다. prev 최신 뉴스, 나머지 최신 뉴스들은 최신 뉴스 박스 위에 위치시킨 후 화면에 보이지 않게 한다.

2. JS로 className이 current인 것은 이후 prev로 바꿔 최신 뉴스 박스 위에 위치하개 한 후 화면에 보이지 않게한다. className이 next인 것은 이후 current로 바꿔 최신 뉴스 화면에 위치하여 화면에 보이게 한다. next로 설정할 것이 없으면 첫 번째 리스트를 next로 설정해준다.

3. css를 통해 리스트들이 넘어감에 따라 적절한 애니메이션을 준다.

#### 5초마다 무한 롤링

0. setInterval(callback,5000)을 통해 callback함수가 5초마다 실행되도록 한다.

1. 왼쪽 최신 뉴스 영역과 오른쪽 최신 뉴스 영역이 각각 바뀌어야 하므로 callback함수의 인자로 정보를 넘겨주어 왼쪽 최신 뉴스 영역이면 바로 setInterval(callback,5000)를 실행하도록, 오른쪽 최신 뉴스 영역이면 1초 멈췄다가 setInterval(callback,5000)을 실행하도록 한다.

#### 좌우 영역의 시간차 1초 두기

0. 왼쪽은 setInterval(callback,5000)를 바로 실행하고, 오른쪽은 setTimeout(callback,1000)의 callback함수로 setInterval(callback,5000)을 주어 1초 후 setInterval(callback,5000)이 실행될 수 있도록 한다.

#### 마우스를 호버 시 무한 롤링 일시 정지와 밑줄 표시

0. 마우스 호버 시 css에서 :hover를 통해 밑줄 표시해준다.

1. 최신 뉴스 리스트에 mouseenter 이벤트를 걸어 마우스를 위에 올리면 setInterval을 끝내서 무한 롤링을 중지시키고, 마우스를 떼면 setInterval를 다시 걸어줘서 무한 롤링 시켜준다.

> 아직 해결해야 하는 부분  
> : 롤링 재개 후 오른쪽과 왼쪽 롤링 시간 차를 1초로 유지하게 하기

## 리스트 보기(동일 카테고리에서 페이지 넘기기)

0. 리스트 아이콘을 클릭하면 그리드를 display:none해서 안보이게 처리하고 리스트는 display: block 또는 display:flex를 통해 화면에 띄워준다. 언론사 이미지를 넘기는 좌우 페이지 이동 버튼도 display:none을 하고 언론사를 넘기는 좌우 언론사 페이지 이동 버튼은 display:block을 해준다. (이때 맨 처음에는 왼쪽 페이지 이동 버튼은 화면에 나타내지 않는다)

1. 그리드에서 리스트로 넘어가면 그리드 아이콘과 리스트 아이콘 색을 변경해준다.

2. 언론사 기사 뉴스가 담긴 배열에서 각 카테고리별로 나눠서 새로운 배열에 저장한다.

3. 만들어진 새로운 배열의 각 카테고리에 해당 하는 객체를 랜덤을 섞는다.

4. 각 카테고리에서 언론사 기사들 띄우기
   각 카테고리에 맞는 언론사 별 기사들을 데이터로 미리 만들어 놓았고 언론사 id, name, main news title, main news thumbnail, sub news title가 저장되어 있다고 가정하면 섬네일 위의 info부분에는 언론사 이름을 나타낸다. 섬네일 부분에는 main thumbnail 데이터를 불러온다. 섬네일 아래에는 main news title을 가져온다. 오른쪽에는 sub news title들을 나열한다.

5. 초기 화면은 종합/경제 카테고리에 해당하는 배열의 첫 번째 객체의 내용이다.

6. 0 페이지에서는 왼쪽 페이지 이동 버튼은 숨긴다. 마지막 페이지에서는 오른쪽 페이지 이동 버튼을 숨긴다.

7. 페이지 이동 버튼을 누르면 해당 카테고리에 해당하는 다음 객체의 내용을 보여준다.
   <br><br><br>

# 📌 Header

1. 화면 새로고침
2. 오늘의 날짜
   <img width = "80%" src = "https://github.com/choiseona/fe-newsstand/assets/52223965/e2249b44-9b90-4d66-976a-a5a6d75b6812">
   <br><br><br>

# 📌 Banner

1. 최신 뉴스 롤링
   <img width = "80%" src = "https://github.com/choiseona/fe-newsstand/assets/52223965/351c8baf-2e09-4763-8bb0-60209fe7a0fd">
   <br><br><br>

# 📌 Main

1. 그리드 보기
2. 리스트 보기
3. 프로그래스바
4. 구독하기/해지하기
   <img width = "80%" src="https://github.com/choiseona/fe-newsstand/assets/52223965/f74a7a28-c665-4eff-8f0d-6ccb2af0973a">
   <img width = "80%" src="https://github.com/choiseona/fe-newsstand/assets/52223965/bec1c09e-e691-4122-8061-3b86c70faf66">
