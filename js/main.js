$(function(){
  var t; // 윈도우 상단 좌표 변수
  var w2; // 윈도우 가로 크기 변수
  var h; // 윈도우 세로 크기 변수
  var n=0; // 카테고리 번호 변수
  var e;
  var c=0;

  var w=100+"%"; // 배너 한 개체 사이즈
  var amount=0;
  var a=$(window).width();
  // resize : 화면 구성 이벤트, 콘텐츠와 가로 크기 세로 지정

  $(".a1").stop().delay(450).animate({"left" : -400}, 1400);
  $(".a2").stop().delay(450).animate({"right" : -400}, 1400);
  $(".section .page:nth-child(1)").addClass("active");
  function scrollEvent() {
    console.log(t);
    $(".section").animate({top:t}, 700, function(){
      $(".aside .item").removeClass("on");
      $(".aside .item").eq(n).addClass("on");
      if(n != 0){ // !=not
        // 상단 고정 메뉴가 내려와야 함
            $(".section .nav").stop().fadeOut(100);
            $(".background").stop().fadeIn(1200);
            $(".header .nav").stop().fadeIn(600);
            $(".handslider").stop().fadeOut(100);
      }
      else{
        // n=0, 즉 윈도우 제일 위로 올라가면, 상단 고정 메뉴가 올라감
            $(".section .nav").stop().fadeIn(1000);
            $(".background").stop().fadeOut(300);
            $(".header .nav").stop().fadeOut(10);
            $(".handslider").stop().fadeIn(1200);
      }
      if ($(".aside li:nth-child(2)").hasClass("on") == true){
          $("div.one").addClass("active");
      }
      else if ($(".aside li:nth-child(3)").hasClass("on")) {
          $("div.two").addClass("active");
          $(".page2_bar li:nth-child(1) .c2").stop().animate({"width" : 85+"%"}, 1100);
          $(".page2_bar li:nth-child(2) .c2").stop().animate({"width" : 65+"%"}, 1100);
          $(".page2_bar li:nth-child(3) .c2").stop().animate({"width" : 78+"%"}, 1100);
          $(".page2_bar li:nth-child(4) .c2").stop().animate({"width" : 82+"%"}, 1100);
          $(".page2_bar li:nth-child(5) .c2").stop().animate({"width" : 65+"%"}, 1100);
          $(".page2_bar li:nth-child(6) .c2").stop().animate({"width" : 51+"%"}, 1100);
          $(".page2_bar li .c4").stop().delay(1100).fadeIn(300);
      }
      else if ($(".aside li:nth-child(4)").hasClass("on") == true){
          $("div.three").addClass("active");
      }
      else if ($(".aside li:nth-child(5)").hasClass("on") == true){
          $("div.four").addClass("active");
      }
    });
  }
  setInterval(function(){
      $(".n2").fadeOut(700).delay(1000);
      $(".n2").fadeIn(700).delay(1000);
  }, 100);


  $(window).resize(function(){
    // console.log("resize");
    w2=$(window).width();
    h=$(window).height();
    t=(-1)*n*h;
    $(".section").css({top:t}); // 버그 해결 -  화면 리사이즈 시, 위치 재설정
    $(".section .page").css({width:w2, height:h});
    $(".aside .item").removeClass("on");
    $(".aside .item").eq(n).addClass("on");
  });
  $(window).trigger("resize");
  // click
  $(".nav .menu a, .aside .item a").click(function(e){
    e.preventDefault();
    // console.log("click");
    n=$(this).parent().index();
    t=(-1)*n*h;
    scrollEvent();
  });
  // keyboard
  $(window).keydown(function(e){ // UI 고지 필요, 상하 방향 버튼 활용 가능
    // console.log("keyboard : "+e.keyCode);
    // jQuery.is(":visible") : 보이면 true, 안보이면 false
    // form elements.is(":checked") : 체크되면 true, 안되면 false
    // animate jQuery.is(":animated") : 애니메이션 되고 있을 경우 true, 아니면 false
    if($(".section").is(":animated")){
      return;
    }
    // e.keyCode
    // 38 : 위 방향키, 카테고리 번호가 낮아짐(0까지)
    // 40 : 아래 방향키, 카테고리 번호가 커짐(4번까지)
    if(e.keyCode == 38){
      if(n > 0){
        n=n-1;
      }
    }
    else if(e.keyCode == 40){
      if(n < 4){
        n=n+1;
      }
    }
    else if(e.keyCode == 39){
      leftMoving($("ul.portfolio"), a);
    }
    else if(e.keyCode == 37){
      rightMoving($("ul.portfolio"), a);
    }
    t=(-1)*n*h;
    scrollEvent();
  });



  // mousewheel : UI 고지 필요
  $(".wrapper").mousewheel(function(e, delta){
  // e : 이벤트 발생 시 자동 생성되는 객체
  // delta : 마우스 휠 이벤트 발생시 생성되는 위치 정보
  // console.log("mousewheel event : " delta);
    if($(".section").is(":animated")){
      return;
    }
    var direction="";
    if(delta > 0){
      direction="up";
    }
    else{
      direction="down";
    }
    if(direction == "up"){ // 위로 올리면 카테고리 번호가 높아짐
      if(n > 0){
        n=n-1;
      }
    }
    else {
      if(n < 4){ // 아래로 내리면 카테고리 번호가 낮아짐
        n=n+1;
      }
    }
    t=(-1)*n*h;
    scrollEvent();
  });



  $(".section .page.loading:nth-child(2) ul li:nth-child(1) a").click(function(e){
    e.preventDefault();
    $(".section .page.loading:nth-child(2) ul li:nth-child(2) .info").stop().fadeOut(300);
    $(".section .page.loading:nth-child(2) ul li:nth-child(1) .info").stop().fadeIn(300);
  });
  $(".section .page.loading:nth-child(2) ul li:nth-child(2) a").click(function(e){
    e.preventDefault();
    $(".section .page.loading:nth-child(2) ul li:nth-child(1) .info").stop().fadeOut(300);
    $(".section .page.loading:nth-child(2) ul li:nth-child(2) .info").stop().fadeIn(300);
  });



	// 구문 정리
	// mobile event api
	// gal : 움직이는 대상
	// wid : 한 개체가 움직일 위치
	function leftMoving(gal, wid){
		amount=amount-wid;
		gal.animate({"left" : amount}, 500, function(){
			gal.append(gal.children("li").first()); // gal.children().first()
			amount=amount+wid;
			gal.css({"left" : amount});

			gal.children("li").each(function(i){
				if(i == 0){
					$(this).addClass("active");
				}
				else{
					$(this).removeClass("active");
				}
			});
		});
		// 최초 오브젝트 li를 마지막 위치로 이동
		// append : 처음 노드를 마지막 위치에 배치
	}
	function rightMoving(gal, wid){
		gal.prepend(gal.children("li").last());
		amount=amount-wid;
		gal.css({"left" : amount});
		amount=amount+wid;
		gal.animate({"left" : amount}, 500, function(){
			gal.children("li").each(function(i){
				if(i == 0){
					$(this).addClass("active");
				}
				else{
					$(this).removeClass("active");
				}
			});
		});
	}

  $(".right").click(function(e){
    e.preventDefault();
    leftMoving($("ul.portfolio"), a);
    // leftMoving 가로 안에 좌측 방향으로 움직일 노드를 입력
  });
  $(".left").click(function(e){
    e.preventDefault();
    rightMoving($("ul.portfolio"), a);
    // rightMoving 가로 안에 좌측 방향으로 움직일 노드를 입력
  });
  /*
  c=$(".section .page.loading:nth-child(4)").scrollLeft();
  if (c == $(".sc2").offset().left) {
    $(".sc1").css({"display" : "none"});
  }
  */


});
