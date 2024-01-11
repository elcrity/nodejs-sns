routes는 경로, 미들웨어로 권한만 잡아주는 역할

//router의 post에 /join 이벤트를 추가, isNotLoggedIn 미들웨어를 통해 검사하여, 성공하면 controller의 join 메소드가 작동.
<!-- router.post('/join', isNotLoggedIn, join); -->