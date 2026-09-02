# C5 랜덤 비트 메이커 — 음원 소스 및 재생 전략

> 상태: Decision memo v0.1 — MVP 권장안  
> 작성일: 2026-08-07  
> 결정 범위: UX/UI 검증에 사용할 음원의 확보·구조·랜덤화·재생 방식  
> 재검토 시점: 실제 배틀 유형, 1차 플랫폼, 라운드 길이가 확정된 뒤

## 1. 결론

첫 버전은 **권리를 직접 확보한 오프라인 `Battle Beat Pack`과 태그 기반 랜덤 큐**를 사용한다.

- 각 비트는 직접 제작하거나 앱용 권리를 명확히 확보해 의뢰한다.
- 제작 원본은 drums / bass / harmony / lead / FX 등의 stem으로 보존한다.
- MVP 앱에는 stem을 바로 조립하지 않고, 검수된 stereo battle master를 넣는다.
- 각 master에는 BPM, energy, genre, loop 구간, 안전 전환 마디를 함께 저장한다.
- 앱의 첫 random은 `실시간 AI 작곡`이 아니라 **검수된 비트를 상황에 맞게 고르는 통제 가능한 random**이다.
- 이후 같은 원본 stem을 사용해 호환성이 확인된 kit 안에서만 조합을 확장한다.

이 하이브리드 방식은 완성곡 재생의 안정성과 stem 조립의 장기 확장성을 동시에 확보한다.

## 2. 왜 이 방식인가

라이브 배틀에서는 무한한 다양성보다 다음이 먼저다.

1. 누르면 즉시 재생된다.
2. 네트워크가 없어도 동작한다.
3. 다음 곡이 언제 어떻게 바뀔지 예측할 수 있다.
4. 음량과 품질이 일정하다.
5. 사용 권한을 증명할 수 있다.
6. 잘못된 전환으로 공연 흐름이 끊기지 않는다.

클라우드 AI 생성은 다양하지만 생성 지연, 네트워크, 비용, 결과 품질, 권리 확인이 공연 순간에 함께 실패할 수 있다. 반대로 검수된 로컬 비트는 UX 테스트에서 음원 변수를 통제할 수 있어 화면 구조와 조작의 문제를 더 정확히 배울 수 있다.

## 3. 후보 비교

| 방식 | 오프라인·즉시성 | 음악 품질 통제 | 다양성 | 권리 명확성 | 구현 난도 | 결정 |
| --- | --- | --- | --- | --- | --- | --- |
| 완성곡 완전 무작위 셔플 | 매우 높음 | 높음 | 낮음 | 직접 확보 시 높음 | 매우 낮음 | 기술 smoke test |
| 태그 기반 완성곡 큐 | 매우 높음 | 높음 | 중간 | 직접 확보 시 높음 | 낮음~중간 | **MVP 채택** |
| 호환 kit 내 stem 조립 | 높음 | 중간~높음 | 매우 높음 | 직접 제작 시 높음 | 높음 | 2단계 확장 |
| MIDI/pattern 온디바이스 생성 | 높음 | 중간 | 매우 높음 | 직접 제작 시 높음 | 매우 높음 | 장기 실험 |
| 클라우드 AI 실시간 생성 | 낮음 | 낮음~중간 | 매우 높음 | 서비스별 변동 | 매우 높음 | 공연 중 사용 제외 |
| 사용자 음원 import | 분석 후 높음 | 사용자 파일에 따라 다름 | 매우 높음 | 사용자 책임과 앱 정책 필요 | 중간~높음 | 후속 pro 기능 |
| Spotify / Apple Music | 네트워크·구독 의존 | 높음 | 매우 높음 | DJ·상업·공연 사용과 충돌 | 중간 | 핵심 소스에서 제외 |

## 4. Battle Beat Pack v0

### 권장 수량

- UX 구조 검증: 8~12개
- 현장 pilot: 24개 이상을 목표로 하되, 실제 반복 체감 테스트 후 결정

8~12개면 재생·선택·next cue·lock·reroll UX를 검증하기에는 충분하다. 콘텐츠 부족을 감추려고 초기부터 생성 엔진을 만들지 않는다.

### 한 비트의 음악 구조

- 4마디 intro
- 8 또는 16마디 core loop
- 선택적 break / variation
- 선택적 outro 또는 안전 종료 지점
- 보컬 없는 stereo master
- 일정한 sample rate와 channel format
- pack 전체에서 일관된 체감 음량과 true peak 관리
- frame 기준 loop start / loop end / safe exit 정보

이 구조라면 30초, 45초, 60초 등 라운드 길이가 달라져도 core를 반복한 뒤 안전한 마디에서 종료하거나 다음 비트로 넘어갈 수 있다.

### 음악 manifest

```yaml
id: beat_001
title: Working title
bpm: 0
time_signature: 4/4
key: unknown
genre_tags: []
energy_level: 0
battle_types: []
intro_bars: 4
core_bars: 16
loop_start_frame: 0
loop_end_frame: 0
safe_exit_bars: []
duration_frames: 0
audio_version: 1
license_id: license_001
```

BPM·장르·에너지의 실제 범위는 진행자와 참가자 관찰 뒤 정한다. 개발 편의를 위해 먼저 숫자를 고정하지 않는다.

## 5. Random은 어떻게 동작해야 하는가

순수 난수는 DJ를 대신하지 못한다. MVP에서는 **constraint-based shuffle bag**을 사용한다.

### 기본 규칙

- 현재 선택된 battle type, BPM 범위, genre, energy 조건 안에서만 선택
- 최근 재생 목록을 제외해 짧은 반복 방지
- 같은 곡이 나와도 직전 곡과 바로 반복되지 않음
- current와 next를 모두 미리 결정하고 preload
- 사용자가 next를 lock하면 자동 선택이 바꾸지 않음
- reroll은 next만 교체하고 현재 재생을 건드리지 않음
- skip now는 즉시 끊기보다 다음 safe exit에서 전환하는 것이 기본
- 긴급 정지만 별도 위험 행동으로 분리

### 사용자에게 보일 설명

시스템은 `랜덤으로 골랐습니다`가 아니라 선택 이유를 짧게 보여준다.

```text
92 BPM · Boom bap · Medium energy
현재 설정과 비슷한 템포 · 최근 5곡과 중복 없음
```

### 초기 제어 문법

- `Energy Up / Down`: 다음 비트의 에너지만 조정
- `Keep BPM`: BPM 범위를 잠금
- `Lock Next`: 다음 비트를 고정
- `Reroll`: 다음 비트만 다시 선택
- `Surprise`: 제한을 넓히되 안전 범위는 유지

이 문법은 나중에 stem 조립으로 확장해도 그대로 유지할 수 있다. 예를 들어 `Lock drums` 후 bass나 harmony만 reroll할 수 있다.

## 6. iOS 재생 구조 가설

```text
Local Battle Beat Pack
        ↓
Constraint-based Queue
        ↓
Current + Next Preload
        ↓
Player A ─┐
          ├─ Mixer ─ Wired / USB Audio Output
Player B ─┘
```

- `AVAudioEngine`은 배틀 화면 진입 시 미리 준비한다.
- 두 `AVAudioPlayerNode`에 current와 next를 올린다.
- 다음 safe bar를 같은 player timeline 기준으로 예약한다.
- 전환은 downbeat cut 또는 짧은 bar-aligned crossfade 두 방식으로 비교 테스트한다.
- 파일·buffer의 sample rate와 channel format을 통일한다.
- 전화, 시스템 interruption, cable·interface 분리 같은 route change를 UI 상태로 노출한다.
- 공연에서는 유선 또는 USB audio interface를 기본 출력으로 검증한다. Bluetooth와 AirPlay는 별도 실측 전까지 정밀 cue 출력으로 간주하지 않는다.

Apple의 `AVAudioPlayerNode`는 buffer와 파일 segment를 지정 시점 또는 앞선 segment 직후에 예약할 수 있으며, `AVAudioEngine`은 player와 mixer를 연결하는 실시간 audio graph를 제공한다. 따라서 로컬 asset과 frame 단위 cue를 사용하면 이 구조를 구현할 수 있다.

## 7. 음원 확보 우선순위

### 1순위 — 직접 제작

BK가 직접 작곡·편곡·믹스해 composition과 master 권리의 출처를 명확하게 유지한다. 외부 performer나 sample이 들어가면 별도로 기록한다.

### 2순위 — 앱 전용 의뢰

작곡가 또는 producer에게 stem 납품까지 포함해 의뢰한다. 계약 또는 확인서에는 다음이 필요하다.

- composition과 master recording 양쪽의 권리
- performer·vocal 참여자의 동의
- 전 세계·영구적 앱 및 상업 배포
- offline bundle과 후속 content pack
- cut, loop, mix, remix, stem 분리, time-stretch, pitch 변경
- 배틀·공연 재생과 홍보 영상 사용
- 제3자 sample 목록과 해당 사용권 보증
- credit 방식, 원본 project, stem 납품

### 3순위 — CC0 또는 검증된 CC BY

- CC0를 우선한다.
- CC BY는 creator, source, license version, modification을 표시할 수 있을 때만 사용한다.
- BY-SA는 파생물 정책 검토가 필요하다.
- NC와 ND는 상업화·remix 가능성이 있는 이 프로젝트에서 제외한다.

### 일반 sample pack을 그대로 번들하지 않는 이유

`royalty-free`는 곡 제작에 쓸 수 있다는 뜻이지, 앱 사용자가 individual loop나 stem을 반복·조합할 수 있도록 다시 배포해도 된다는 뜻은 아니다. Splice와 Apple Loops는 완성 음악·creative work 사용은 허용하지만, 개별 sample·loop를 독립적으로 배포하거나 sample library처럼 재포장하는 것을 제한한다.

외부 sample pack을 써야 한다면 앱 바이너리 포함, individual trigger, loop, edit, time-stretch, pitch-shift, worldwide commercial distribution을 명시적으로 허용하는 별도 서면 조건을 확인한다.

## 8. 권리 manifest

음악 metadata와 권리 증거는 분리해 관리한다.

```yaml
license_id: license_001
composition_owner: BK
master_owner: BK
performers: []
source_type: original
third_party_assets: []
app_embedding: allowed
commercial_distribution: allowed
editing_and_looping: allowed
live_performance_grant: review
territory: worldwide
term: perpetual
credit_requirement: none
agreement_path: null
source_url: null
downloaded_at: null
source_hash: null
ai_assisted: false
ai_service_and_terms_version: null
```

앱 안에 넣을 권리와 실제 공개 행사에서 재생할 권리는 별개의 검토 대상일 수 있다. 상용 출시나 유료 행사 적용 전에는 한국의 공연권·이용허락 범위를 운영 방식에 맞춰 다시 확인한다.

## 9. AI 음악의 올바른 역할

### MVP에서 사용

- genre·mood 후보 발산
- reference description 생성
- arrangement variation 아이디어
- BPM·energy·instrument metadata 초안
- 반복·유사도·무음 구간 QA 보조
- 행사 전에 생성한 후보의 human curation

### MVP에서 사용하지 않음

- 관객 앞에서 버튼을 누른 뒤 cloud에서 곡 생성
- 무료 플랜으로 만든 결과물을 상업용 정식 library로 편입
- 특정 artist의 이름·목소리·스타일 모방
- 권리 없는 reference track 또는 sample 업로드
- AI 출력의 `소유`를 곧바로 저작권 확보로 해석

Suno는 현재 유료 구독 기간에 생성된 output에 한해 자신이 보유한 권리를 사용자에게 양도하지만, 저작권 성립이나 output의 고유성을 보증하지 않는다. 미국 저작권청도 prompt 제공만으로는 부족하고 사람이 충분한 표현 요소를 결정하거나 창의적으로 편집해야 보호 가능하다는 입장이다. 따라서 AI 결과를 사용한다면 생성 기록을 보존하고 사람이 편곡·연주·재녹음·구조화한 기여를 남긴다.

## 10. 단계별 실행안

### Stage A — UX audio pack

- 직접 제작·의뢰한 8~12개 beat kit 확보
- 각 kit의 stereo battle master와 stem 원본 보존
- 음악·권리 manifest 작성
- offline cold start, loop, pause, stop 테스트

### Stage B — Battle queue

- tag filter와 shuffle bag
- no-repeat history
- next preview, lock, reroll
- safe-bar transition
- 출력 장치·interruption·무음 오류 상태

### Stage C — Semi-procedural variation

- 호환성이 검수된 2~3개 kit만 선택
- drums 또는 texture 한 레이어부터 교체
- 자유조합이 아니라 허용 조합표 사용
- 모든 결과를 batch render해 clipping, silence, harmony, repetition 검수

### Stage D — 확장

- 행사 전 AI-assisted pack 제작
- downloadable offline pack
- 사용자 import와 BPM·cue·loudness 분석
- 충분한 성능·권리 근거가 생겼을 때만 MIDI 또는 온디바이스 생성 실험

## 11. MVP 통과 조건

- airplane mode에서 모든 P0 재생 과업 완료
- cold start 후 첫 비트가 목표 시간 안에 재생됨
- current와 next가 항상 화면 상태와 일치함
- safe exit 전환에서 예기치 않은 무음·중복 재생 없음
- 최근 반복 방지와 lock/reroll 규칙이 설명과 동일하게 동작함
- cable 또는 audio interface 분리 시 위험한 자동 재생을 하지 않음
- 모든 탑재 음원에 music manifest와 rights manifest가 존재함
- 사용한 외부 asset과 AI 도구의 조건을 생성 시점 기준으로 추적할 수 있음

## 12. 공식 참고 자료

- [Apple AVAudioEngine](https://developer.apple.com/documentation/avfaudio/avaudioengine)
- [Apple AVAudioPlayerNode](https://developer.apple.com/documentation/avfaudio/avaudioplayernode)
- [Apple audio route changes](https://developer.apple.com/documentation/avfaudio/responding-to-audio-route-changes)
- [Apple audio interruptions](https://developer.apple.com/documentation/avfaudio/handling-audio-interruptions)
- [Apple MusicKit 이용 조건](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/)
- [한국 Apple 미디어 서비스 이용 약관](https://www.apple.com/kr/legal/internet-services/itunes/kr/terms.html)
- [Spotify Developer Policy](https://developer.spotify.com/policy)
- [Splice Sounds Licensing FAQ](https://support.splice.com/en/articles/8652642-splice-sounds-licensing-faq)
- [Apple GarageBand loop license 안내](https://support.apple.com/ko-kr/102034)
- [Creative Commons license 비교](https://creativecommons.org/share-your-work/use-remix/cc-licenses/)
- [Suno Terms of Service](https://suno.com/terms/)
- [U.S. Copyright Office AI copyrightability report 안내](https://www.copyright.gov/newsnet/2025/1060.html)
- [KOMCA 신탁관리 범위](https://www.komca.or.kr/komca2/komca_0202.jsp)

이 문서는 MVP 제품 결정을 위한 위험 정리이며 법률 자문이 아니다. 상용 배포·유료 행사 적용 전에는 실제 계약과 행사 형태를 기준으로 별도 확인한다.
