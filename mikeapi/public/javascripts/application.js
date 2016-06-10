$(document).ready(function(){
  $("#clicky").on('click', function(e){
    e.preventDefault();
    question = $('#question').val();
  });
});

var watson = require('watson-developer-cloud');
var retrieve_and_rank = watson.retrieve_and_rank({
  username: '63571437-b426-4a21-b046-3c056790b6a5',
  password: 'ywyQk8T2gQtK',
  version: 'v1'
});

var params = {
  cluster_id: 'sc56fcfec9_8f5d_4748_8204_a291227556ed',
  collection_name: 'example_collection'
};

var qs = require('qs');
// Get a Solr client for indexing and searching documents.
// See https://github.com/watson-developer-cloud/node-sdk/blob/master/services/retrieve_and_rank/v1.js
solrClient = retrieve_and_rank.createSolrClient(params);

var ranker_id = '3b140ax14-rank-3094';
var question1  = 'q=' + question;
var query     = qs.stringify({q: question1, ranker_id: ranker_id, fl: 'id,body'});

solrClient.get('fcselect', query, function(err, searchResponse) {
  if(err) {
    console.log('Error searching for documents: ' + err);
  }
    else {
      console.log(JSON.stringify(searchResponse.response.docs, null, 2));
    }
});




//     $.ajax({
//       method: 'GET',
//       username: '63571437-b426-4a21-b046-3c056790b6a5',
//       password: 'ywyQk8T2gQtK',
//       question: question,
//       url: "https://gateway.watsonplatform.net/retrieve-and-rank/api/v1/solr_clusters/sc56fcfec9_8f5d_4748_8204_a291227556ed/solr/example_collection/fcselect?ranker_id=3b140ax14-rank-3094&q=how%20do%20i%20get%20rid%20of%20my&wt=json&fl=id,body",
//       datatype: 'json'
//     }).done(function(error, data){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(data.docs[0].id)
//         }

// });


// "63571437-b426-4a21-b046-3c056790b6a5":""