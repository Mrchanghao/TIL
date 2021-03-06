# modern pattern 

## Circuit breaker 

요즘은 마이크로 서비스가 대세. 대 부분을 다른 리모트 서비스에 의존하고 있다. 이런 무선 서비스들은 네트워크, 어플리케이션 로드 등 다양한 이유로 인해 응답에 실패 할 수 있다. 리트라이(재시도) 방식을 구축해 놓으면 이런 이슈들을 막을 수 있다. 

하지만 때때로 주요 이슈들(서비스의 손상이나 완전 서비스 실패)이 발생한다. 그럴 때는 재시도 하는 것이 아예 무의미 하다. 그래서 Circut breaker 패턴이 유용하다고 할 수 있다. 

![circuit breaker](https://miro.medium.com/max/1540/1*ObdN8WZTCUmsQDUtjHcjpQ.png)(사진 출처: MEdium의 역자 글)

위의 다이어그램이 서킷 브레이커 패턴을 구축해 놓은 것이다. 서비스 1이 지속적인 실패를 하면 재실행 대신 서비스 2가 호출 되고 서비스 1은 서비스 2를 호출하여 부른 다음 폴백 응답을 리턴 받는다. 넷플릭스의 오픈소스 라이브러리인 [Netflix’s Hystrix](https://github.com/Netflix/Hystrix/wiki/How-it-Works)가 이 패턴을 이용하여 구축되어 있다. 

만약 API 게이트 웨이를 사용하거나 사이드카 프록시를 사용하고 있다면 프록시 레벨에서 구축 되어야 한다. 

<strong>api 게이트웨이란?</strong> 

> Api 서버 앞단에서 api 서버들의 엔드포인트를 단일화하여 묶어주고 api에 대한 인증과 인가 기능에서 부터 메세지에 따라 여러 서버로 라우팅 하는 고급 기능까지 많은 기능을 담당

<strong>사이드카 프록시</strong>

> 제일 쉬운 예로 보안을 위해 NGINX에서 사이드카로 reverse proxy을 붙여 https 통신을 한다. 성능을 위해 NGINX content cache 등을 하는 예가 있다.



## Command and Query Responsibility Segregation(CQRS)

한글로 막상 번역 해 보면 명령과 쿼리의 책임 분리 라고 할 수 있는데 데이터 스토어에서 CRUD의 분리를 기본적인 원칙을 분리 하라고 하는 원칙 같다. 

sql 같은 DB로 어플리케이션을 만들때 데이터 저장이 필요한데 모두가 알 듯이 데이터 저장소에 데이터를 만드는 것에는 몇가지 스텝이 존재한다. 벨리데이션, 모델링, 지속이다. 그러므로 작성/업데이트 작업이 단순읽기 작업보다 더 길어진다. 싱글데이터 스토어를 사용할 때는 두가지 쓰고 읽기를 대규모에서 동시에 진행 할 수는 있지만 퍼포먼스 이슈를 볼 수 있게 된다.  

그래서 CQRS패턴이 유용하다. 데이터 스토어의 읽기와 쓰기 작업을 분리 하도록 지시 한다. 

![CQRS](https://miro.medium.com/max/1540/1*6Ko_R4er9q8S4C-utEUVkQ.png)
(CQRS 패턴, 사진은 원본글 미디움에서 발췌)


만약 클라우드 DB를 사용한다고 가정한다면, 많은 기업형 데이터베이스들이 이런 능력들을 제공하고 있다. 

1. 대형 어플리케이션을 만들 경우, 많은 수의 읽기와 쓰기 작업을 해야 할때 사용

2. 퍼포먼스를 튜닝(올리고 싶을때) 읽기와 쓰기 작업을 분리

3. 거의  실시간 또는 최종적으로 읽기 작업이 일관되게 정상적일때. 

## Event Sourcing

이벤트 소싱은 매우 재미있는 디자인 패턴이다. 도메인 이벤트가 저널로서 저장되거나 집계된 view는 어플리케이션의 현재 상태를 제공 한다. 

일반적으로 데이터 저장소를 감당 할 수 없고 이벤트의 기록을 계속 유지해야 하는 시스템에 사용된다.(호텔/좌석예약 등)

![이벤트 소싱](https://miro.medium.com/max/1540/1*D4kfUFDr7xnNbqXJwqyF0g.png)
(event souring Medium 원글에서 발췌)

유저들이 예약과 취소를 자유롭게 할 수 는 호텔룸예약 시스템을 가정해 보자. 예약과 취소를 저장할 수 있어야 한다. 이벤트의 시리즈로서, 그전에 모든 예약과 합계된 뷰는 가능한 방의 수를 보여줘야 하고 이벤트 저널을 봄으로

다양한 클라우드 서비스는 메세징 서비스를 제공한다. 이런 서비스들은 연속적으로  일관된 강력한 데이터 스토어를 제공한다. 
