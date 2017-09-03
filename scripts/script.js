$(document).ready(onReady);
var company =[];
var sum=''; // ongoing cost variable

function onReady() {
    $('.sendInfo').on('click', sendInfo); // submit button event handler
    $('main').on('click', '.fa' , deleteEmp); // employee listing delete button event handler
}

function sendInfo() { // added empty form validation
    if ( ($('#firstName').val() === '') ||  ($('#lastName').val()==='') || ($('#idNum').val()==='') || ($('#jobTitle').val()==='') || ($('#annualSal').val()==='' ) ) {
        if ( $('.alert').text() !== '' ) { // if the form has blank fields, check for existing error message
            return;
        } else {
            $('.alert').text('Please fill out the form');
            return;
        }
    } else { // after any validation errors pass, pass the data into array validation
        var returnArray = $.grep(company, function (n,i) {  // searching for existing employee ID
            return (n.idnumber=== $('#idNum').val()); // create a list of existing IDs if present
        },false); // the new variable contains matches, instead of !matches
        if ( returnArray.length > 0 ) { // if the results of the existing ID are greater than 0,
            $('.alert').text('Employee ID exists!'); // alert user that the Employee was already entered
        } else {
            new createEntry ($('#firstName').val(), $('#lastName').val(), $('#idNum').val(), $('#jobTitle').val(), $('#annualSal').val());
            $('.input').val(''); // clear the inputs
            $('.alert').text(''); // clear any error message
        }
    }
}

function createEntry (firstIn, lastIn, idIn, titleIn, salIN) {
    this.firstname = firstIn;
    this.lastname = lastIn;
    this.idnumber = idIn;
    this.jobtitle = titleIn;
    this.annualsalary = salIN;
    this.monthlyCost = (salIN/12);
    company.push(this); // add employee object into the array

    var $contents = $('<div>', {class: 'entry'});
    $contents.append($('<span>', {class: this.monthlyCost})); // add class in the form of the monthly cost
    $contents.append($('<p>', {text: 'Name: '+this.firstname+" "+ this.lastname}));
    $contents.append($('<p>', {text: 'Title: '+this.jobtitle}));
    $contents.append($('<p>', {text: 'Employee ID: '+this.idnumber, id: 'id-'+this.idnumber}));
    $contents.append($('<p>', {text: 'Annual Payroll Cost: ' + Math.round(this.annualsalary), class: 'payCost' } ) );
    $contents.append('<i class="fa fa-trash"></i>'); // add delete button font-awesome icon

    $('.content').append($contents); // add new Div for new employee
    sum = parseInt($('.sum').text()); // get current value off the DOM
    sum += parseInt(this.monthlyCost); // increase variable based on new employee added
    $('.sum').text(sum);  // post total cost variable to the DOM
}

function deleteEmp () {
    sum -= parseInt($(this).siblings('span').attr('class')); // set costs variable to the DOM minus the monthly cost class of the deleted Employee
    $('.sum').text(sum); // update DOM to subtract amount
    $(this).parent().remove(); // remove the employee listing
}