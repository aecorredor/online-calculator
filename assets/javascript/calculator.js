// MINOR BUGS:
// #1: if user begins by typing number, then operator, and then
// the equal sign immediately after, the wrong result will be output.

// reset keeps track of when an operator has been clicked, so when the user
// starts typing the next number the screen resets and shows that new
// correct number that the user is typing. (basically clears the first
// operand from the screen)
var result = null;
var reset = false;
var number = "";
var current_number = null;
var cleaned_number = "";
var first_operation = true;
var operand_1 = null;
var operand_2 = null;
var current_operator = null;
var can_operate = null;

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function perform_operation(operator, operand_1, operand_2) {
  var result = null;
  switch (operator) {
    case "/":
      result = divide(operand_1, operand_2);
      break;
    case "*":
      result = multiply(operand_1, operand_2)
      break;
    case "-":
      result = subtract(operand_1, operand_2)
      break;
    case "+":
      result = add(operand_1, operand_2)
      break;
    default:
  }
  return result;
}

// starts showing number on calculator screen
$(".num").click(function() {
  can_operate = true;
  if(reset) {
    $(".result").html("0");
    number = "";
  }
  number = number + $(this).text();
  cleaned_number = number.replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,"");
  $(".result").html(cleaned_number);
  reset = false;
  current_number = parseFloat(cleaned_number);
  // for when user starts by entering a number, and then
  // immediately pressing the equal sign. This lets the user
  // enter another number, then press the equal sign again and
  // get the correct result.
  // fixes minor bug #1
  if(!first_operation && !operand_2) {
    operand_2 = current_number;
  }
});

$(".calculate").click(function() {
  // lets you know which operator is selected by styling borders
  // makes all the other operators normal again
  $(".calculate").css({
    "border-top": "none",
    "border-right": "1px solid black",
    "border-bottom": "1px solid black",
    "border-left": "none",
  });
  $(this).css({
    "border-top": "2px solid black",
    "border-right": "3px solid black",
    "border-bottom": "3px solid black",
    "border-left": "2px solid black",
  });

  var operator = $(this).text().replace(/(\r\n|\n|\r)/gm,"").replace(/ /g,"");
  if(first_operation) {
    operand_1 = current_number
    first_operation = false;
  }
  else {
    operand_2 = current_number;
    if(can_operate) {
      result = perform_operation(current_operator, operand_1, operand_2);
      can_operate = false;
    }
    operand_1 = result;
    $(".result").html(result.toString());
  }
  reset = true;
  current_operator = operator;
});

$(".equals").click(function() {
  if(!first_operation && !operand_2) {
    return;
  }
  else if(!first_operation) {
    operand_2 = current_number;
    if(can_operate) {
      result = perform_operation(current_operator, operand_1, operand_2);
      can_operate = false;
    }
    operand_1 = result;
    $(".result").html(result.toString());
    reset = true;
    current_operator = operator;
  }
});

$(".ac").click(function() {
  $(".calculate").css({
    "border-top": "none",
    "border-right": "1px solid black",
    "border-bottom": "1px solid black",
    "border-left": "none",
  });

  $(".result").html("0");

  result = null;
  reset = false;
  number = "";
  current_number = null;
  cleaned_number = "";
  first_operation = true;
  operand_1 = null;
  operand_2 = null;
  current_operator = null;
  can_operate = null;
});
