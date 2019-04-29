$(document).ready(function () {

  $.getJSON('data.json', showingdata);

  function showingdata(data)
  {

    var datas = data.fields;
    var fieldsType;
    var output;


    for (var i = 0; i < datas.length; i++) {

      var dataform = "<div class='form-group'>" +
                "<label for='" + data.fields[i].name + "' class ='" + data.fields[i].name + "'>" + data.fields[i].label + "</label>";

      $( ".data_form" ).append( dataform );

       if (datas[i].hasOwnProperty('options') && datas[i].type === "radio") {
         var options = datas[i].options;
         options.forEach(function(elem) {
           fieldsType = "<input type='" + data.fields[i].type + "' name='" + data.fields[i].name + "' value='" + elem + "'>" + elem;
           output = fieldsType + "</div>" ;

           $( "." + data.fields[i].name ).append( output );
         });
       } else {
         fieldsType = "<input type='" + datas[i].type + "' class='form-control' placeholder='' id ='" + data.fields[i].name + "'>";
         output = fieldsType + "</div>" ;

         $( "." + data.fields[i].name ).append( output );
       }
    }
  }

  $( "#submit" ).one('click', function () {
    $.getJSON('data.json', validate);
  });

  function validate (data) {

    var datas = data.rules;
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password_2 = document.getElementById("password_2");
    var age = document.getElementById("age");

    var requiredDataArr = [];

    for (var i = 0; i < datas.length; i++) {

      if (datas[i].type === "valid") {

        if (datas[i].hasOwnProperty('required')) {
          var requiredData = datas[i].on;
          requiredDataArr.push(requiredData);
        }
        if(datas[i].on === "email" && datas[i].hasOwnProperty('pattern')) {
          var reg = datas[i].pattern;
          var regex = new RegExp(reg);


          if(!regex.test(email.value)) {

            $( "#email" ).after("<p class='error'>This email formate is wrong </p>");
            $( ".error" ).show();
            // console.log('email is not right formate');
          }else {
            // console.log('email is right formate');
          }
        }


        if(datas[i].hasOwnProperty('match')) {

          if($( "#" + datas[i].from).val() !== $( "#" + datas[i].on).val()) {

              var password_error = "<p class='error'>The password is not match </p>";
              $( "#" + datas[i].from).after(password_error);
              $( "#" + datas[i].on).after(password_error);
              $( ".error" ).show();
            } else {

            }
        }
      }

      if (datas[i].type === "show") {

          if($( "#" + datas[i].from).val() > datas[i].gte) {
            $( "." + datas[i].on).show();
          } else {
            $( "." + datas[i].on).hide();
          }
      }

    } //end loop

    // checking required fields
    for(var i = 0; i < requiredDataArr.length; i++) {
      if($( "#" + requiredDataArr[i] ).val() === "") {

        $( "#" + requiredDataArr[i] ).after("<p class='error'>This input is reqiured, can not be empty. </p>");
        $( ".error" ).show();
      }
    }

  }


  });
