var titre;// = "";
var text;// = "";
var mesBlogsObj;
var recup;
/*
$("#titre").keyup(function(){
    titre = $("#titre").val();

});    

$("#text").keyup(function(){
    text = $("#text").val();

});    

$("#envoyer").click(function(){

   var valeur = {"titre" : titre, "text" : text};
    $("input").val("");
    $("textarea").val("");
    
  $.ajax({
      
       url:'http://localhost:3000',
      
       data: {
          
           method: 'set',
          
          
           value: JSON.stringify(valeur),
       }
   });
   
});

*/
/*function Ajouter(Add){
    for (var i = 0; i < Add.length; i++) {
        $("#title").append('<a class="lien" href="#" data-id="'+i+'"><div><li>'+Add[i].titre+'</li></div></a>');
        //$("#article").append('<div>'+Add[i].text+'</div>');
    }
    $(".lien").click(function(){
      var curid = $(this).data("id");
      $("#article").html(mesBlogsObj[curid].text);
    });
}*/



function Addadmin(admin){
for (var i = 0; i < admin.length; i++) {
        console.log(admin[i]);
        $("#suptitle").append('<a class="lien2" href="#" data-id="'+i+'"><div><li>'+admin[i].titre+'</li></div></a>');
        //$("#suparticle").append('<div>'+ admin[i].text + '<button  data-id="'+admin[i]._id+'"class="sup btn btn-warning">x</button><button  data-id="'+admin[i]._id+'"class="modif btn btn-primary">?</button></div>');
    }
    $(".lien2").click(function(){
      var curid = $(this).data("id")
      $("#suparticle").html(mesBlogsObj[curid].text);
      $("#suparticle").append('<button data-id="'+admin[curid]._id+'"class="sup btn btn-warning">x</button><button data-id="'+admin[curid]._id+'"class="modif btn btn-primary">?</button>');
      $("#insbutton").append('<button data-id="'+admin[curid]._id+'"class="modifier btn btn-warning">Modifier</button>')
       recup = curid 
    })
  }

$("body").delegate('.sup', 'click', function(){
  
    $.ajax({
        url:'http://localhost:3000/delete',
        data: {
        method: 'delete',
        _id: $(this).data("id"),
    }
  });
    
});
/*
$("body").delegate('.modif', 'click', function(){
  
  $("#modiftext").html(mesBlogsObj[recup].text);
  
  $("#modiftitre").val(mesBlogsObj[recup].titre);
});

$("body").delegate('.modifier', 'click', function(){

  console.log('yop')

  var newobject = {'titre':$("#modiftitre").val(), 'text':$("#modiftext").val()};
  $.ajax({

    url:'http://localhost:3000',
    data: {
      task: 'update',
      _id: $(this).data("id"),
     value: JSON.stringify(newobject),
    }
  });
});
*/
function affichage(){
    $.ajax({
        url:'http://localhost:3000/test',
        data: {
            method: 'get',
        }
    })
    .done(function(data){

        valeur=JSON.parse(data);
        console.log(valeur);
        //Ajouter(valeur);
        Addadmin(valeur);
        mesBlogsObj = valeur;
    });    

}

affichage();

/*
   $("#supprimer").click(function(){
        
       $.ajax({
           url: 'http://localhost:3000',
           data: {
               method: 'delete',
               
              }
        });
    });

   /*$("#text").keyup(function(){
    
   var converter = new showdown.Converter(),
       text      = $('#text').val(),
       html      = converter.makeHtml(text);
    
       $("#texthtml").html(html);
    });*/
