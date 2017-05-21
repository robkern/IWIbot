var recording = false;

$(function () {
    // Call one time record to get the user agreement for using the microphone
    Fr.voice.record(false);
    Fr.voice.pause();
    Fr.voice.recorder.clear();
});

$(document).ready(function () {

    $("#record").click(function () {
            var $recordingButton = $(".btn-circle");

           if (!recording) {
                $recordingButton.css('background-color', '#FF7F50').addClass("recording");
                recording = true;
                Fr.voice.resume();
            } else {
                $recordingButton.css('background-color', '#e6e6e6').removeClass("recording").hide();
                $("#mainDiv").addClass("loader");
                recording = false;
                Fr.voice.pause();
                Fr.voice.export(function (blob) {

                    var payload = {"payload": blob};
                    $.ajax({
                        //url: 'https://speech.googleapis.com/v1/speech:recognize?key=API_KEY',
                        url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/Router.http',
                        //url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/speechToText.http',
                        //url : 'https://openwhisk.ng.bluemix.net/api/v1/web/kuar1013_kuar1013-Sued/default/speech-to-text.http',
                        type: 'POST',
                        data: JSON.stringify(payload),
                        /* Example object for Google Cloud Speech Service
                         {
                         "config": {
                         "encoding": "LINEAR16",
                         "sampleRateHertz": 16000,
                         "languageCode": "en-US"
                         },
                         "audio": {
                         "content": "/9j/7QBEUGhvdG9zaG9...base64-encoded-audio-content...fXNWzvDEeYxxxzj/Coa6Bax//Z"
                         }
                         }*/
                        contentType: "application/json",
                        processData: false,
                        success: function (data) {
                            console.log(data);
                            $("#mainDiv").removeClass("loader");
                            $recordingButton.show();
                            var obj = JSON.parse(data);
                            //obj = JSON.stringify(obj.payload);
                            console.log("Data: " + data);
                            $('.tts').attr('src', "data:audio/ogg;base64," + obj.payload.toString());
                            $('.stt').html(obj.text.toString());


                        },
                        error: function (err) {
                            console.log(err);
                            $("#mainDiv").removeClass("loader");
                            $recordingButton.show();
                            $('.stt').html(obj.text.toString());
                        }
                    });
                    console.log(blob);
                    /* var audio = document.createTextNode('audio');
                     audio.src = base64;
                     audio.controls = true;
                     audio.style.display = 'block';
                     document.appendChild(audio),
                     audio.play(); */

                }, "base64");
                Fr.voice.recorder.clear();
            }
        }
    )


});


