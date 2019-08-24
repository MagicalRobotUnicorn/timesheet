// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDDeqH4W8Dlgi0og4hMpZmMbG_CDDBDN5o",
    authDomain: "management-proj-cc466.firebaseapp.com",
    databaseURL: "https://management-proj-cc466.firebaseio.com",
    projectId: "management-proj-cc466",
    storageBucket: "",
    messagingSenderId: "709222086776",
    appId: "1:709222086776:web:0e12150855d11103"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function populateForm() {
  var employeeName = $('#employeeName').val();
  var role = $('#role').val();
  var startDate = $('#startDate').val();
  var monthsWorked = $('#monthsWorked').val();
  var monthlyRate = $('#monthlyRate').val();

  var $newRow = $('<tr>');
  $newRow.append('<td>' + employeeName + '</td>');
  $newRow.append('<td>' + role + '</td>');
  $newRow.append('<td>' + startDate + '</td>');
  $newRow.append('<td>' + monthsWorked + '</td>');
  $newRow.append('<td>' + monthlyRate + '</td>');

  var totalBilled = Number(monthsWorked) * Number(monthlyRate);

  $newRow.append('<td>' + totalBilled + '</td>');

  $('#tableBody').append($newRow);
}

  $("#submitButton").on("click", function(event) {
    event.preventDefault();
  
    // var empName = $("#name-input").val().trim();
    // var empRole = $("#role-input").val().trim();
    // var empStart = moment($("#date-input").val().trim(), "DD/MM/YY").format("X");
    // var empRate = $("#rate-input").val().trim();

    var employeeName = $('#employeeName').val();
    var role = $('#role').val();
    var startDate = Date($('#startDate').val());
    // var monthsWorked = $('#monthsWorked').val();
    var monthlyRate = $('#monthlyRate').val();

    console.log(startDate);

    var numMonths = moment(Date()).diff(moment([startDate]), 'months', true);
    // var totalBilled = Number(monthsWorked) * Number(monthlyRate);

    var totalBilled = numMonths * monthlyRate;

    var newEmp = {
      name: employeeName,
      role: role,
      start: startDate,
      rate: monthlyRate,
      numMonths: numMonths,
      totalBilled: totalBilled
    };
  
    console.log(newEmp);

    database.ref().push(newEmp);
  
    $("#name-input").val("");
    $("#role-input").val("");
    $("#date-input").val("");
    $("#rate-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
  
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;
    var numMonths = childSnapshot.val().numMonths;
    var totalBilled = childSnapshot.val().totalBilled;
  
    $('#tableBody').append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    empStart + "</td><td>" + numMonths + "</td><td>" + empRate + "</td><td>" + totalBilled + "</td></tr>");
  });


// $(document).ready(function() {

//   $('#submitButton').on('click', function() {
//     populateForm();
//   });
// });