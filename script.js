$(document).ready(function() {
  getData();
  var longitude,
    latitude,
    url;


  function getData() {
    var args = arguments;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        (args.length) ?
        url = args[0]:
          url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' +
          longitude + '&units=metric&appid=e28cf24271fef1d65b272a5f41b95415';

        $.ajax({
          url: url,
          success: function(data) {
            var urlIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            if (!data.name || !data.sys.country) {
              $('.weather-info .location').html("Unknown location");
            }
            $('.weatherImg').attr('src', urlIcon);
            $('.weather-info .location').html(data.name + ',' + ' ' + data.sys.country);

            $('.weather-info .degrees').html(Math.round(data.main.temp) + ' ');
            $('.weather-info .description').html(data.weather[0].description);

            if (data.weather[0].main === "Clear") {
              $('.weather-info').css({
                "background": "url(https://media.giphy.com/media/xmW8F2ksN0KA0/giphy.gif)"
              })
            }
            if (data.weather[0].main === "Clouds") {
              $('.weather-info').css({
                "background-image": "url(https://media.giphy.com/media/5HK4TiiBeLSZq/giphy.gif)"
              })
            }
            if (data.weather[0].main === "Rain") {
              $('.weather-info').css({
                "background-image": "url(https://media.giphy.com/media/dI3D3BWfDub0Q/giphy.gif)"
              })
            }
          }
        });
      })
    }
  }
  $('.sign').on('click', function() {
    var temp = $('.weather-info .degrees').html();
    var newTemp;
    if ($(this).html() === "C") {
      newTemp = Math.round(temp * 9 / 5 + 32);
      $('.weather-info .degrees').html(newTemp);
      $(this).html("F");
      return false;
    }
    if ($(this).html() === "F") {
      newTemp = Math.round((temp - 32) * 5 / 9);
      $('.weather-info .degrees').html(newTemp);
      $(this).html("C");
      return false;
    }
  })

  var data;

  $('.location').on('focus', function() {

    $(this).attr('contenteditable', true).addClass('animation');
    data = $(this).text();
  }).on('blur', function(e) {
    $(this).removeClass('animation');
    if (data !== $(this).text()) {
      var cityUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + $(this).text() +
        '&units=metric&appid=e28cf24271fef1d65b272a5f41b95415';
      getData(cityUrl);
      $('.sign').html("C");
    }
  }).on('keydown', function(e) {
    if (e.which === 13) {
      e.preventDefault();
      $(this).blur();
    }
  });

})
