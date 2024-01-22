var container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
  mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
  btnRoadview = document.getElementById('btnRoadview'), // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다
  btnMap = document.getElementById('btnMap'), // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
  rvContainer = document.getElementById('roadview'), // 로드뷰를 표시할 div 입니다
  mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다

// 지도와 로드뷰 위에 마커로 표시할 특정 장소의 좌표입니다
var placePosition = new kakao.maps.LatLng(33.442314, 126.571466);

// 지도 옵션입니다
var mapOption = {
  center: placePosition, // 지도의 중심좌표
  level: 3 // 지도의 확대 레벨
};

// 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 반경 내 가까운 파노라마 ID값 얻기
// var roadviewClient = new kakao.maps.RoadviewClient(),
//     roadview = new kakao.maps.Roadview(rvContainer);	// 로드뷰 객체를 생성합니다
//
// roadviewClient.getNearestPanoId(placePosition, 60, function(panoId) {
//
//     roadview.setPanoId(panoId, placePosition);
// });

var roadview = new kakao.maps.Roadview(rvContainer, {
  panoId : 1148584505, // 로드뷰 시작 지역의 고유 아이디 값
  panoX : 126.97837, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값
  panoY : 37.56613, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값
  pan: 218, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
  tilt: -12, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
  zoom: -1 // 로드뷰 줌 초기값
});

// 지도 중심을 표시할 마커를 생성하고 특정 장소 위에 표시합니다
var mapMarker = new kakao.maps.Marker({
  position: placePosition,
  map: map
});


// 로드뷰 초기화가 완료되면
kakao.maps.event.addListener(roadview, 'init', function() {

  // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다
  var rvMarker = new kakao.maps.Marker({
    position: placePosition,
    map: roadview
  });
});

// 지도와 로드뷰를 감싸고 있는 div의 class를 변경하여 지도를 숨기거나 보이게 하는 함수입니다
function toggleMap(active) {
  if (active) {

    // 지도가 보이도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
    container.className = "view_map"
  } else {

    // 지도가 숨겨지도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
    container.className = "view_roadview"
  }
}

function mapPanTo() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = placePosition;

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}

function rvPosition() {
  roadview.setPanoId(1148584505, placePosition);
}
