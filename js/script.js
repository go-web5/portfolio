//*----------------------------*
//*  ドロワーメニュー
//*----------------------------*

$(function () {
  $('#js-hamburger').click(function () {
    $('body').toggleClass('is-drawerActive');

    //bodyにnoscrollクラスを付与(スクロールを固定)
    $('html').toggleClass('noscroll'); 
  
    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', 'true');
      $('#js-global-menu').attr('area-hidden','false');
    } else {
      $(this).attr('aria-expanded', 'false');
      $('#js-global-menu').attr('area-hidden','true');
    }
  });

  //背景の黒ボックスクリックでもドロワーが消えるようにする
  $('#js-drawer-background').click(function () {
    $('body').removeClass('is-drawerActive');
    $('#js-hamburger').attr('aria-expanded', 'false');
    $('#js-global-menu').attr('area-hidden','true');
  });

  var drawerNav = $(".drawer__nav a");

  drawerNav.click(function () {
    $('body').removeClass('is-drawerActive');
    $('#js-hamburger').attr('aria-expanded', 'false');
    $('#js-global-menu').attr('area-hidden','true');
    $('html').removeClass('noscroll'); 
  });
});


//*--------------------------*
//*  Swiper(自動＆手動スワイプ)
//*--------------------------*

var swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  speed: 800,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: 1.6,
  centeredSlides : true,

  breakpoints: {
    280: {
      slidesPerView: 1.3,
      spaceBetween: 20,
    },
    365: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 36,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 36,
    },
    992: {
      slidesPerView: 3.4,
      spaceBetween: 36,
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 36,
    }
  }
});


//*----------------------------*
//*  TOPページのヘッダー変化 (スクロール)
//*----------------------------*

$(function() {
  var header = $(".header__wrapper");
  var hamburger = $(".hamburger");

  $(window).scroll(function() {
    // 80px以上スクロールした時
    if($(window).scrollTop() > 45 ) { 

      header.addClass("header__wrapper_scroll");  /* ヘッダーの高さが短くなる */
      hamburger.addClass("hamburger__scroll");   /* ハンバーガーボタンの位置が上へ移動 */

    } else { /* 80px以上スクロールしてない時 */
      header.removeClass("header__wrapper_scroll");  /* ヘッダーの高さが元に戻る */
      hamburger.removeClass("hamburger__scroll");   /* ハンバーガーボタンの位置が元に戻る */
    }
  });
});


//*---------------------*
//*  フォーム
//*---------------------*

$(function () {

  // 全てのアラートを消す
  $(".alert").hide();

  // #submitBtnをクリックした時
  $("#submitBtn").click(function() {
    // 変数sendFlagにtureを代入
    var sendFlag = true;

    // 名前
    // もし、#nameのvalue属性の値を取得して何もなかったら、
    if(!$("#name").val()) {

      // #nameSectionのalretを表示する
      $("#nameSection .alert").show();
      // 変数sendFlagにfalseを再代入
      sendFlag = false;

      // #nameのvalue属性の値を取得して何かあったら、
    } else {
      // #nameSectionのalertを非表示にする
      $("#nameSection .alert").hide();
    }

    // フリガナ
    // もし、#furiganaのvalue属性の値を取得して何もなかったら、
    if(!$("#furigana").val()) {

      // #furiganaSectionのalretを表示する
      $("#furiganaSection .alert").show();
      // 変数sendFlagにfalseを再代入
      sendFlag = false;

    // #furiganaのvalue属性の値を取得して何かあったら、
    } else {
      // #furiganaSectionのalertを非表示にする
      $("#furiganaSection .alert").hide();
    }

    // メールアドレス
    if(!$("#mail").val()) {
      $("#mailSection .alert").show();
      sendFlag = false;

    } else {
      $("#mailSection .alert").hide();
    } 

    // お問い合わせ内容
    if(!$("#message").val()) {

      $("#textareaSection .alert").show();
      sendFlag = false;

    } else {
      $("#textareaSection .alert").hide();
    }

    // もし、チェックボックスにチェックがなかったら、
    if(!$("#inputCheck").prop('checked')) {

      // アラートをだす
      $("#checkboxSection .alert").show();
      // チェックボックスの下のmarginを変える（クラス追加）
      $(".contact__check-box_text").addClass("contact__margin_adjustment");

      // 変数sendFlagにfalseを再代入
      sendFlag = false;

      // そうじゃない場合、アラートを消す
    } else {
      $("#checkboxSection .alert").hide();
      $(".contact__check-box_text").removeClass("contact__margin_adjustment");
    }

    // 変数sendFlagがfalseなら送信できない
    if(sendFlag == false) {
      return false;
    }
  });
});


// 送信完了＆送信失敗画面コード②

$(document).ready(function () {

  $('#js-form').submit(function (event) {
    var form = $('#js-form');
    var formData = $('#js-form').serialize();

    $(".contact__form").css("padding-bottom", "0");
    $.ajax({
      url: form.attr('action'),
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          $(".end-message").slideDown();
          $(".submit__btn").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          //送信に失敗したときの処理
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
    return false; 
  });
});


//*---------------------*
//*  スムーズスクロール
//*---------------------*

$(function() {
  // a要素のhref属性が#だけのものを除外した、
  // href属性が#で始まるもののどれかをクリックした時、
  $("a[href^='#']:not([href='#'])").click(function() {

    // クリックしたa要素のhref属性を取得し(例:#contactなど)、
    // そのコンテンツからtopまでの距離を変数targetに代入
    var target = $($(this).attr('href')).offset().top;

    // 画面横幅の値を取得し、変数windowSizeに代入
    var windowSize = window.innerWidth;

    if (windowSize <= 991) {

      // 変数targetの位置からヘッダー分(79px)を減らして再代入
      target -= 79;

      // コンテンツからtopまでの移動を
      $('html,body').animate({scrollTop: target}, 500);
      // return false;

    } else if (windowSize >= 992) {

      // 変数targetの位置からヘッダー分(79px)を減らして再代入
      target -= 119;

      // コンテンツからtopまでの移動を
      $('html,body').animate({scrollTop: target}, 500);
      return false;
    }
  });
});


//*---------------------*
//*  トップへ戻るボタン
//*---------------------*

$(function() {

  const pageTop = $('#js-pagetop');

  // aboutの位置を取得し、その値を代入
  const aboutTop = $('#about').offset().top;

  // console.log(aboutTop);

  $(window).on('scroll', () => {
    if ($(this).scrollTop() > aboutTop) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });

  // // クリックでトップへ戻る
  const speed = 500;
  pageTop.on('click', () => {
    $('body, html').animate({
      scrollTop: 0
    }, speed);
    return false;
  });
});


//*---------------------*
//*  メインビジュアルのvh指定の調整
//*---------------------*

$(function () {
  var windowHeight = $(window).height();
  var spMv = windowHeight + 220 + 'px';
  var spGlobalMenu = windowHeight + 'px';
  var windowWidth = window.innerWidth;
  // console.log(spMv);

  // 画面横幅のサイズを取得、575px以下だったら
  if (windowWidth <= 575) {
    $('#jsMv').css('height', spMv);
  }

  // 画面横幅のサイズを取得、991px以下だったら
  if (windowWidth <= 991) {
    $('sp-global-menu').css('height', spGlobalMenu);
  }
});


//*---------------------*
//*  音楽再生ボタン
//*---------------------*

$(function() {
  var beat = document.querySelector("#beat");
  beat.volume = 0;  //ボリュームを最低値にする

  $("#beatOn").click(function () {
    $("#beat").get(0).play();

    let timerid = setInterval( ()=>{
      // ボリュームが0.4になったら終了
      if( (beat.volume + 0.1) >= 0.4 ) {
        beat.volume = 0.4;
        clearInterval(timerid);  //タイマー解除
      }
      // 0.05ずつボリュームを足していく
      else{
        beat.volume += 0.05;
      }
    }
    , 200); //0.2秒ごとに繰り返す
  });

  $("#beatOff").click(function () {
    // $("#beat").get(0).pause();

    let timerid = setInterval( ()=>{
      // ボリュームが0になったら終了
      if( (beat.volume - 0.1) <= 0 ){
        beat.volume = 0;
        beat.pause();
        clearInterval(timerid);  //タイマー解除
      }
      // 0.05ずつボリュームを減らしていく
      else{
        beat.volume -= 0.05;
      }
    }
    , 200); //0.2秒ごとに繰り返す
  });
});