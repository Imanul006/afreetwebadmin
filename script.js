var selectedFile;
var type = -1;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
 

  var menRef = firebase.database().ref().child("Products").child("Men");
  menRef.on("child_added", snap => {
    var pid = snap.child("PID").val();
    var desc = snap.child("description").val();
    var mrp = snap.child("MRP").val();
    var afp = snap.child("AFP").val();
    var img = snap.child("postimage").val();
    var key = snap.child("key").val();

    $("#table_men").append('<tr><td class="mdl-data-table__cell--non-numeric">' + pid + '</td><td class="mdl-data-table__cell--non-numeric">' + key + '</td><td class="mdl-data-table__cell--non-numeric">' + desc + '</td><td>' + mrp + '</td><td>' + afp + '</td><td class="mdl-data-table__cell--non-numeric"><img src="'+ img + '" alt="Avatar" class="avatar"></td></tr>');
  });

  var womenRef = firebase.database().ref().child("Products").child("Women");
  womenRef.on("child_added", snap => {
    var pid = snap.child("PID").val();
    var desc = snap.child("description").val();
    var mrp = snap.child("MRP").val();
    var afp = snap.child("AFP").val();
    var img = snap.child("postimage").val();
    var key = snap.child("key").val();

    $("#table_women").append('<tr><td class="mdl-data-table__cell--non-numeric">' + pid + '</td><td class="mdl-data-table__cell--non-numeric">' + key + '</td><td class="mdl-data-table__cell--non-numeric">' + desc + '</td><td>' + mrp + '</td><td>' + afp + '</td><td class="mdl-data-table__cell--non-numeric"><img src="'+ img + '" alt="Avatar" class="avatar"></td></tr>');
  });

  var kidRef = firebase.database().ref().child("Products").child("Kid");
  kidRef.on("child_added", snap => {
    var pid = snap.child("PID").val();
    var desc = snap.child("description").val();
    var mrp = snap.child("MRP").val();
    var afp = snap.child("AFP").val();
    var img = snap.child("postimage").val();
    var key = snap.child("key").val();

    $("#table_kid").append('<tr><td class="mdl-data-table__cell--non-numeric">' + pid + '</td><td class="mdl-data-table__cell--non-numeric">' + key + '</td><td class="mdl-data-table__cell--non-numeric">' + desc + '</td><td>' + mrp + '</td><td>' + afp + '</td><td class="mdl-data-table__cell--non-numeric"><img src="'+ img + '" alt="Avatar" class="avatar"></td></tr>');
  });

function remove(type){

  if (type == 0) {
    key = document.getElementById("mkey_text").value;
    menRef.child(key).remove();
    window.alert("Product Deleted Successfully");
    document.location.reload(true);
  }
  if (type == 1) {
    key = document.getElementById("fkey_text").value;
    womenRef.child(key).remove();
    window.alert("Product Deleted Successfully");
    document.location.reload(true);
  }
  if (type == 2) {
    key = document.getElementById("kkey_text").value;
    kidRef.child(key).remove();
    window.alert("Product Deleted Successfully");
    document.location.reload(true);
  }
}

function showAddDialog(currentType){
  type = currentType;
  if (currentType == 0) {
    document.getElementById("madd_layout").style.display = "block";
  }
  if (currentType == 1) {
    document.getElementById("wadd_layout").style.display = "block";
  }
  if (currentType == 2) {
    document.getElementById("kadd_layout").style.display = "block";
  }

  console.log('type = '+type);

}
function hideAddDialog(){
  if (type == 0) {
    document.getElementById("madd_layout").style.display = "none";
  }
  if (type == 1) {
    document.getElementById("wadd_layout").style.display = "none";
  }
  if (type == 2) {
    document.getElementById("kadd_layout").style.display = "none";
  }

}

$("#mimage").on("change", function(event){
  selectedFile = event.target.files[0];
});
$("#fimage").on("change", function(event){
  selectedFile = event.target.files[0];
});
$("#kimage").on("change", function(event){
  selectedFile = event.target.files[0];
});

function submit(){
  if (type == 0) {
    if ((document.getElementById("mpid").value == "") || (document.getElementById("mdesc").value == "") || (document.getElementById("mmrp").value == "") || (document.getElementById("mafp").value == "")) {
      window.alert("Please Fillup All Fields!!!");
    }
    else {
      updateDatabase();
    }
  }
  if (type == 1) {
    if ((document.getElementById("wpid").value == "") || (document.getElementById("wdesc").value == "") || (document.getElementById("wmrp").value == "") || (document.getElementById("wafp").value == "")) {
      window.alert("Please Fillup All Fields!!!");
    }
    else {
      updateDatabase();
    }
  }
  if (type == 2) {
    if ((document.getElementById("kpid").value == "") || (document.getElementById("kdesc").value == "") || (document.getElementById("kmrp").value == "") || (document.getElementById("kafp").value == "")) {
      window.alert("Please Fillup All Fields!!!");
    }
    else {
      updateDatabase();
    }
  }
}

function updateDatabase(){
  var filename = selectedFile.name;
  var storageRef = firebase.storage().ref('Post Images/'+filename);
  var uploadTask = storageRef.put(selectedFile);
  uploadTask.on('state_changed', function(snapshot){
// Observe state change events such as progress, pause, and resume
// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
switch (snapshot.state) {
  case firebase.storage.TaskState.PAUSED: // or 'paused'
    console.log('Upload is paused');
    break;
  case firebase.storage.TaskState.RUNNING: // or 'running'
    console.log('Upload is running');
    break;
}
}, function(error) {
// Handle unsuccessful uploads
}, function() {
// Handle successful uploads on complete
// For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      if (type == 0) {
        var mRef = firebase.database().ref().child("Products").child("Men");
      }
      if (type == 1) {
        var mRef = firebase.database().ref().child("Products").child("Women");
      }
      if (type == 2) {
        var mRef = firebase.database().ref().child("Products").child("Kid");
      }

      var key = mRef.push().key;
      if (type == 0) {
        var postData = {
          PID: document.getElementById("mpid").value,
          description: document.getElementById("mdesc").value,
          MRP: document.getElementById("mmrp").value,
          AFP: document.getElementById("mafp").value,
          postimage: downloadURL,
          key: key,
        };
      }
      if (type == 1) {
        var postData = {
          PID: document.getElementById("wpid").value,
          description: document.getElementById("wdesc").value,
          MRP: document.getElementById("wmrp").value,
          AFP: document.getElementById("wafp").value,
          postimage: downloadURL,
          key: key,
        };
      }
      if (type == 2) {
        var postData = {
          PID: document.getElementById("kpid").value,
          description: document.getElementById("kdesc").value,
          MRP: document.getElementById("kmrp").value,
          AFP: document.getElementById("kafp").value,
          postimage: downloadURL,
          key: key,
        };
      }

      mRef.child(key).set(postData);
      window.alert("Successfully Uploaded!!!");
    });
  });

}


function login(){
  var email=document.getElementById('email').value;
  var password=document.getElementById('pass').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
    // ...
  });
}

function logout(){
  firebase.auth().signOut().then(function() {
    window.alert("User Logged Out Successfully");
  }).catch(function(error) {
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });
}
