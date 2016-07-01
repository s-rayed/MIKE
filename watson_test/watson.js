$(document).ready(function(){
  $("#clicky").on('click', function(e){
    e.preventDefault();
    var question = $('#question').val();
    $.ajax({
      method: 'GET',
      username: 'xxxxxx',
      password: 'xxxxxxxx',
      question: ,
      url: "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sc56fcfec9_8f5d_4748_8204_a291227556ed/solr/example_collection/fcselect?ranker_id=3b140ax14-rank-3094&q=how%20do%20i%20get%20rid%20of%20my&wt=json&fl=id,body",
      datatype: 'json'
    }).done(function(error, data){
        if (error) {
          console.log(error);
        } else {
          console.log(data.docs[0].id)
        }
    });
});

    // var watson = require('watson-developer-cloud');
    // var dialog_service = watson.dialog({
    //   username: '63571437-b426-4a21-b046-3c056790b6a5',
    //   password: 'ywyQk8T2gQtK',
    //   version: 'v1'
    // });

    // var params = {
    //   input: question
    // };

    // dialog_service.conversation(params, function(err, conversation){
    //   if (err)
    //     console.log(err)
    //   else
    //     console.log(conversation);
    // });


