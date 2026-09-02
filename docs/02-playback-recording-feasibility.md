# C5 랜덤 비트 메이커 — 재생 중 영상·오디오 녹음 기술 검토

> 상태: Feasibility memo v0.1 — 구현 가능, 제품 범위 결정 전  
> 작성일: 2026-08-07  
> 가정 플랫폼: iOS / iPhone  
> 검토 범위: 앱 자체 비트 재생 중 카메라 촬영, 마이크 메모, 편집 가능한 멀티트랙 세션

## 1. 결론

두 기능 모두 iOS에서 구현할 수 있다.

| 요구 | 판정 | MVP 권장 방식 |
| --- | --- | --- |
| 음악을 재생하며 영상 촬영 | 가능 | 인앱 카메라 + 마이크 현장음 + 재생 비트 참조를 보존하고 촬영 후 합성 |
| 음악을 재생하며 오디오 메모 | 가능 | `AVAudioEngine`의 비트 재생과 `inputNode` 마이크 녹음을 동시에 실행 |
| 비트와 마이크를 편집 가능한 별도 트랙으로 저장 | 가능 | 원본 비트 또는 실제 beat bus + `mic.caf` + 동기화 metadata |
| 하나의 영상 파일에 영상·마이크·원본 비트를 함께 포함 | 가능 | 후합성 가능. 단, 마이크에 들어간 PA 누설은 제거되지 않음 |
| 큰 스피커 앞에서 내장 마이크만으로 깨끗한 보컬 stem 생성 | 보장 불가 | 헤드폰 또는 마이크 직접 입력이 가능한 USB audio interface 필요 |
| 여러 독립 마이크를 각 트랙으로 동시 녹음 | 장비 의존 | 다채널 USB audio interface를 후속 범위로 검증 |

핵심은 **음악이 들리는 것**과 **음악·목소리·영상이 서로 분리된 채 기록되는 것**을 구분하는 데 있다.

## 2. 신호를 먼저 구분한다

```text
원본 비트 / Beat bus ───────▶ 스피커·헤드폰·PA
          │
          └───────────────▶ Backing track 또는 재생 이벤트

마이크 입력 ───────────────▶ Mic track
카메라 입력 ───────────────▶ Video track

Backing + Mic + Video ─────▶ 촬영 후 공유용 mix/export
```

앱 내부에서 재생한 비트는 앱이 이미 원본 파일과 재생 시점을 알고 있다. 정적인 완성형 비트라면 이를 다시 녹음하지 않고 원본을 backing track으로 참조하는 편이 음질과 복구 가능성 모두 좋다.

반면 마이크는 방 안에서 실제로 들리는 소리를 기록한다. 폰이나 PA 스피커로 비트를 크게 틀면 그 비트가 마이크 트랙에도 섞인다. 트랙을 두 파일로 나눴다고 해서 이미 마이크에 들어간 누설음이 자동으로 분리되지는 않는다.

## 3. 기능 1 — 음악 재생 중 영상 촬영

### 기술 판정

가능하다. 앱이 카메라를 직접 제공하고, `usesApplicationAudioSession = true`인 공유 세션에서 activation 순서와 route를 올바르게 구성하면 `AVAudioEngine`의 비트 재생과 `AVCaptureSession`의 카메라·마이크 캡처가 공존하도록 구현할 수 있다. 오디오 세션은 입력과 출력이 모두 가능한 `playAndRecord`를 사용한다.

Apple은 [`playAndRecord`](https://developer.apple.com/documentation/avfaudio/avaudiosession/category-swift.struct/playandrecord)를 동시 녹음과 재생에 적합한 category로 정의한다. 영상 촬영에는 [`videoRecording`](https://developer.apple.com/documentation/avfaudio/avaudiosession/mode-swift.struct/videorecording) mode를 함께 사용할 수 있으며, 카메라 방향에 적합한 내장 마이크와 신호 처리를 선택한다.

시스템 Camera 앱으로 전환하는 방식은 C5의 핵심 흐름으로 사용하지 않는다. 앱이 백그라운드로 이동하면 카메라 세션과 오디오 세션의 소유권·중단을 안정적으로 통제하기 어렵기 때문이다. **인앱 카메라**가 전제다.

### 중요한 제약

`AVCaptureMovieFileOutput`은 capture session에 연결된 audio input connection, 즉 내장·외장 마이크 등의 오디오를 기록한다. `AVAudioPlayerNode`가 출력하는 앱 내부 비트가 영상 파일에 깨끗한 디지털 트랙으로 자동 삽입되지는 않는다.

- 내장 스피커 또는 PA 사용: 영상의 마이크 트랙에 비트가 현장음으로 다시 들어간다. 잔향, 에코, 왜곡이 생길 수 있다.
- 헤드폰 사용: 공기를 통한 비트 누설을 크게 줄일 수 있지만, 원본 비트는 영상 파일에 자동 포함되지 않는다.
- 유선·USB로 PA 출력: 디지털 신호 경로는 분리되지만 room mic에는 PA의 비트가 여전히 들어간다.
- 공유용 결과물: 원본 비트와 정확한 시작 시점을 보존한 뒤 촬영 후 영상·마이크와 합친다.

원본 비트를 깨끗한 backing으로 포함할 수는 있지만, 마이크에 들어간 PA 누설까지 제거되는 것은 아니다. 누설이 있는 mic와 원본 비트를 그대로 더하면 echo나 comb filtering이 생길 수 있으므로, 최종 mix는 route와 mic 배치에 따라 현장음 레벨·필터·정렬을 조정해야 한다.

### 권장 MVP 파이프라인

```text
1. 카메라·마이크 권한 확인
2. 현재 input/output route 확인
3. 캡처 준비 및 실제 녹화 시작 확인
4. 짧은 count-in 후 비트를 예약 재생
5. beat ID와 시작 시각/sample offset 기록
6. 촬영 종료 및 원본 보존
7. Video + Mic + Original Beat를 후합성
8. 공유용 영상과 편집용 원본을 각각 저장
```

[`AVMutableComposition`](https://developer.apple.com/documentation/avfoundation/avmutablecomposition)은 여러 media track을 배열하고, [`AVMutableAudioMix`](https://developer.apple.com/documentation/avfoundation/avmutableaudiomix)는 음량과 fade를 조절한다. 여기에 export 단계를 더해 공유 파일을 만든다. 실시간으로 모든 신호를 하나의 파일에 쓰려면 video/audio sample buffer와 음악 PCM을 공통 timeline에 맞춰 [`AVAssetWriterInput`](https://developer.apple.com/documentation/avfoundation/avassetwriterinput)에 공급해야 한다. 가능하지만 동기화·오류 복구 난도가 커서 MVP 후순위로 둔다.

## 4. 기능 2 — 음악 재생 중 오디오 메모와 멀티트랙

### 오디오 메모

가능하다. `AVAudioEngine`에서 다음 경로를 동시에 운영한다.

```text
AVAudioPlayerNode(s) ─▶ BeatMixer ─▶ MainMixer ─▶ Output
AVAudioEngine.inputNode ───────────▶ tap ───────▶ mic.caf
```

Apple의 [`AVAudioEngine`](https://developer.apple.com/documentation/avfaudio/avaudioengine)은 재생과 실시간 audio graph를 관리하며, [`inputNode`](https://developer.apple.com/documentation/avfaudio/avaudioengine/inputnode)는 마이크 입력을 제공한다. node의 tap은 해당 지점의 PCM buffer를 받아 녹음·관찰할 수 있다.

마이크를 출력 mixer에 다시 연결할 필요는 없다. 헤드폰이 없는 상태에서 live monitoring을 켜면 스피커와 마이크 사이에 피드백이 생길 수 있으므로, MVP에서는 **녹음은 하되 monitoring은 기본 끔**으로 둔다.

### 편집 가능한 2트랙 세션

정적인 stereo master를 재생하는 현재 MVP에서는 비트를 다시 녹음하지 않는다.

```text
take_001/
├── mic.caf
├── session.json
└── preview.m4a        # 선택적 자동 mixdown

session.json
├── beat_id / audio_version / beat_asset_hash
├── source_start_frame / engine sample rate
├── scheduled host time / 첫 render sample·host time
├── mic 첫 buffer의 sample·host time
├── video recording start PTS             # 영상 세션일 때
├── gain / pause / resume 이벤트
├── input·output route / latency 측정값
└── interruption·route·sample-rate 변경 segment
```

세션을 열 때 원본 Battle Beat Pack의 master를 Track 1로, `mic.caf`를 Track 2로 배치한다. 이 구조는 원본 비트의 음질을 보존하고 녹음 실패 시에도 각 자산을 따로 복구할 수 있으므로, 하나의 혼합 파일만 저장하는 것보다 낫다.

### random loop·stem으로 확장할 때

나중에 재생 중 stem이 교체되거나 loop 조합이 계속 달라지면 manifest만으로 실제 결과를 재현하기 어려울 수 있다. 그때는 `BeatMixer`에도 tap을 설치한다.

```text
BeatMixer tap ─────▶ backing.caf
InputNode tap ─────▶ mic.caf
Playback events ───▶ session.json
```

이것이 C5에서 말하는 실용적인 멀티트랙의 시작점이다. DAW 전체를 구현하지 않아도 `backing / mic`의 음량, mute, trim, 시작 offset을 별도로 편집하고 하나의 preview로 mixdown할 수 있다.

## 5. “분리 저장”과 “깨끗한 분리”는 다르다

| 출력·입력 환경 | 녹음 가능 | 마이크와 비트 분리 품질 | 권장 용도 |
| --- | --- | --- | --- |
| 내장 스피커 + 내장 마이크 | 가능 | 낮음 — 비트 누설·잔향 | 현장 기록, 빠른 메모 |
| 유선 헤드폰 + 내장/유선 마이크 | 가능 | 비트 누설 기준 상대적으로 높음 | 개인 랩 연습, isolated take |
| 유선·USB output + PA + room mic | 가능 | 낮음~중간 — PA 누설이 남음 | 현장 분위기와 배틀 기록 |
| USB interface + 직접 연결한 마이크 + PA out | 가능 | 장비·지향성·배치가 적절할 때 높음 | 실제 배틀, production capture |
| Bluetooth headset | 가능하나 route·codec·지연 변동 | 기기 의존 | 편의 기능, 핵심 QA route에서는 제외 |

내장 마이크 여러 개를 stereo로 녹음하는 기능은 `보컬 / 비트`처럼 의미적으로 분리된 두 트랙을 만드는 기능이 아니다. 여러 마이크를 각각 독립 track으로 받으려면 입력 channel을 노출하는 외부 interface가 필요하다.

Echo cancellation은 내장 스피커 누설을 줄이는 보조 수단일 뿐 깨끗한 stem을 보장하지 않는다. 음성 통화용 processing은 랩 보컬의 음색과 dynamics를 바꿀 수 있으며, 외부 PA 소리는 앱이 가진 기준 출력과 다른 음향 경로를 지나므로 더 신뢰하기 어렵다.

## 6. 동기화와 지연

디지털 timeline의 동기화는 가능하지만 실제 소리의 도착 시점은 route마다 다르다.

- output latency
- input latency
- I/O buffer duration
- Bluetooth·USB 장치 내부 지연
- PA와 마이크 사이의 음향 전파
- echo cancellation 등 추가 processing

비트는 미래의 `AVAudioTime`에 예약한다. audio render sample time과 영상 capture PTS는 서로 다른 clock domain일 수 있으므로, 녹음 buffer timestamp와 재생 이벤트를 무조건 같은 숫자로 취급하지 않고 host-time anchor와 timebase 변환 정보를 함께 저장한다. 이후 각 route에서 나타나는 고정 offset을 실기기에서 측정해 보정한다. Apple은 [`inputLatency`](https://developer.apple.com/documentation/avfaudio/avaudiosession/inputlatency), [`outputLatency`](https://developer.apple.com/documentation/avfaudio/avaudiosession/outputlatency), [`ioBufferDuration`](https://developer.apple.com/documentation/avfaudio/avaudiosession/iobufferduration)을 런타임에 제공한다. AirPlay는 약 2초의 출력 지연이 생길 수 있으므로 정밀한 배틀 cue와 녹음 기준 route로 두지 않는다.

## 7. Audio session 소유권

재생과 녹음을 각 화면이 따로 설정하면 한 기능을 시작할 때 다른 기능의 route나 mode가 바뀔 수 있다. 제품의 수동 구성에서는 하나의 `AudioSessionCoordinator`가 다음을 소유한다.

- category, mode, activation
- input/output route와 route change
- playback engine lifecycle
- recording state
- interruption 복구
- latency snapshot

영상 모드의 목표 구성은 다음과 같다.

```text
AVAudioSession.category = .playAndRecord
AVAudioSession.mode = .videoRecording
AVCaptureSession.usesApplicationAudioSession = true
```

`AVCaptureSession.automaticallyConfiguresApplicationAudioSession`의 기본값은 `true`이며, 카메라·마이크에 맞게 공유 오디오 세션을 바꾼다. 이를 `false`로 설정하면 앱이 모든 설정을 책임지며 호환되지 않는 구성에서는 녹음이 실패할 수 있다. 자세한 제약은 [Apple 문서](https://developer.apple.com/documentation/avfoundation/avcapturesession/automaticallyconfiguresapplicationaudiosession)를 따른다.

기술 spike에서는 소유권이 다른 두 전략을 명시적으로 비교한다.

- 자동 baseline: capture session이 설정을 소유하고 coordinator는 상태 관찰과 복구를 담당한다.
- 수동 구성: 자동 구성을 끄고 coordinator가 category, mode, options, activation을 전담하며 route별 호환성을 책임진다.

제품에는 실기기 검증을 통과한 한 전략만 고정한다.

오디오 전용 Practice Take는 `.playAndRecord`와 음악 보존에 적합한 mode를 별도 실험한다. voice/video chat mode의 voice processing을 음악 녹음 기본값으로 사용하지 않는다.

## 8. 제품 UX 권장안

한 개의 모호한 `Record` 버튼보다 목적이 다른 두 모드를 구분한다.

### Battle Video

- 목적: 춤·배틀·관객 반응을 영상으로 남기기
- 저장: 원본 video/mic + beat reference + 공유용 합성 영상
- 기본 route: 유선 또는 USB 출력 + room mic
- 사용자 기대: 현장감 있는 영상, 즉시 공유
- mix 선택: `현장음 중심` 또는 `원본 비트 중심`; PA 누설이 있으면 room mic 레벨·정렬을 조정

### Practice Take

- 목적: 랩·퍼포먼스를 다시 듣고 비교하기
- 저장: 원본 beat + isolated mic + session metadata + preview
- 기본 route: 헤드폰 또는 USB interface
- 사용자 기대: 두 트랙의 음량·trim을 나중에 조정 가능

두 모드는 같은 session timeline과 `AudioSessionCoordinator`를 공유할 수 있지만, 촬영 화면·출력 안내·품질 약속은 달라야 한다.

녹화 시작 전에 UI가 최소한 다음 상태를 보여줘야 한다.

- 현재 output과 microphone
- `현장음` 또는 `분리 가능한 테이크` 품질 상태
- 헤드폰 없이 monitoring이 꺼지는 이유
- 권한 거부·route 분리·저장 공간 부족
- 녹화 중단과 복구된 segment

## 9. 권한과 실패 복구

카메라와 마이크는 각각 명시적 권한이 필요하다. `Info.plist`에는 최소한 다음 목적 문자열을 둔다.

- `NSCameraUsageDescription`
- `NSMicrophoneUsageDescription`
- 사진 보관함에 저장한다면 `NSPhotoLibraryAddUsageDescription`

Apple의 [capture authorization 안내](https://developer.apple.com/documentation/avfoundation/requesting-authorization-to-capture-and-save-media)에 따라 기능을 실제로 선택한 시점에 권한을 요청한다. 최소 온보딩 원칙상 앱 첫 실행 때 카메라·마이크 권한을 한꺼번에 요구하지 않는다.

전화·Siri·알람, USB 분리, 헤드폰 분리, Bluetooth route 변경이 발생하면 다음을 기본 동작으로 한다.

1. 현재 녹음 파일을 안전하게 닫는다.
2. 완료된 구간을 삭제하지 않고 `interrupted` segment로 보존한다.
3. 비트·녹음 상태가 불일치하면 자동 재생을 재개하지 않는다.
4. 사용자에게 route 변화와 저장된 범위를 명확히 보여준다.
5. 사용자가 확인한 뒤 새 segment로 재개한다.

## 10. 권장 구현 순서

### Spike A — 오디오 2트랙

- 자체 비트 재생 + mono mic 녹음
- `beat ID + start sample + mic.caf` 저장
- 헤드폰과 내장 스피커에서 누설·offset 비교
- 자동 preview mixdown

### Spike B — Battle Video

- 1080p / 30 fps 기준 인앱 카메라
- 촬영 시작 후 count-in과 비트 예약 재생
- 영상·마이크·원본 비트 후합성
- 10분 연속 촬영의 발열, frame drop, audio drift 측정

### Stage C — 실제 random 결과 보존

- BeatMixer tap으로 `backing.caf` 저장
- reroll, transition, pause, gain 이벤트 기록
- 앱 내부의 간단한 trim, balance, mute

### Stage D — production input

- USB audio interface의 direct microphone input
- 장치가 노출하는 channel별 독립 track
- PA output과 recording input의 route matrix
- 실시간 `AVAssetWriter` 또는 다중 audio track container는 필요가 확인된 뒤 도입

## 11. 기술 통과 조건

- 비트 재생 중 영상 녹화를 시작·종료해도 예기치 않은 무음이나 engine reset이 없음
- 영상·mic·beat가 10분 녹화 끝에서도 허용 offset 안에 유지됨
- immutable beat, 완전한 event log, 중단 없는 정적 재생에서는 mic 파일과 beat 참조로 같은 preview를 다시 생성할 수 있음
- 내장 스피커, 유선 헤드폰, USB interface에서 route별 결과를 기록함
- 헤드폰/USB 분리와 전화 interruption 뒤 완료된 segment가 보존됨
- 권한 거부 상태에서 핵심 재생 기능은 계속 사용할 수 있음
- UI가 `현장음`과 `분리 가능한 테이크`를 잘못 약속하지 않음

허용 offset, 지원 장치, 최소 녹화 시간의 실제 수치는 Spike A/B의 실기기 측정 뒤 확정한다.

## 12. 현재 제품 결정 제안

- **채택:** 재생 중 영상 촬영은 기술적으로 가능한 중요 후보 기능이다.
- **채택:** 재생 중 오디오 메모는 가장 먼저 검증할 recording MVP다.
- **채택:** 정적 비트는 다시 녹음하지 않고 원본 + mic + timeline으로 세션화한다.
- **유보:** Battle Video와 Practice Take를 모두 첫 출시 P0로 넣을지는 사용자 관찰 뒤 결정한다.
- **후순위:** stem별 편집, 여러 외부 마이크, 실시간 다중 track writer.
- **비목표:** 내장 마이크 하나로 큰 PA 환경의 보컬을 완전히 분리한다는 약속.

이 결정은 [음원 소스 및 재생 전략](01-audio-source-and-playback-strategy.md)의 offline Battle Beat Pack을 전제로 한다.
