/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
	"use strict";
	var answer = 0,
		index = 0,
		counter = 0,
		oldAnswer = 0,
		btnToClick,
		pi = 3.14,
		input,
		num1 = 0,
		num2 = 0,
		number = 0,
		resetCalc = $('.clear'),
		operator = '',
		operators = {
			//Mathematical operators
			'+': function (num1, num2) { return num1 + num2; },
			'-': function (num1, num2) { return num1 - num2; },
			'*': function (num1, num2) { return num1 * num2; },
			'/': function (num1, num2) { return (num1 / num2); },
			'√': function (num1) { return Math.sqrt(num1); },
			'n2': function (num1) { return (num1 * num1); },
			'Π': function (num1) { return pi; },
			'xy': function (num1) { return Math.pow(num1, num2); }
		},
		runCalc = function runCalc() {
			answer = operators[operator](num1, num2);
			$('.value').text(answer);
			num1 = answer;
			number = answer;
			num2 = 0;
			operator = '';
			$('.number-list li').addClass('disabled').css('cursor', 'default');
		},
		clearCalc = function clearCalc() {
			answer = 0;
			num1 = 0;
			num2 = 0;
			number = 0;
			operator = '';
			$('.value').text(answer);
			$('.number-list li').removeClass('disabled').css('cursor', 'cursor');
		},
		getNumber = function getNumber() {
			number += input;
			number = parseInt(number, 10);
			$('.value').text(number);
			if (operator !== '') {
				num2 = number;
			} else {
				num1 = number;
			}
		},
		operation = function operation() {
			$('.number-list li').removeClass('disabled');
			$('.value').text(operator);
			number = 0;
		},
		operatorValues = {
			//Functions returning the correct operator based on user input
			'61': function (operator) { operator = "+"; return operator; },
			'45': function (operator) { operator = "-"; return operator; },
			'42': function (operator) { operator = '*'; return operator; },
			'47': function (operator) { operator = '/'; return operator; },
			'92': function (operator) { operator = '/'; return operator; }
		},
		numberValues = {
			//Returns the number inputs as strings to display the values correctly.
			'48': function (input) { input = "0"; return input; },
			'49': function (input) { input = "1"; return input; },
			'50': function (input) { input = "2"; return input; },
			'51': function (input) { input = "3"; return input; },
			'52': function (input) { input = "4"; return input; },
			'53': function (input) { input = "5"; return input; },
			'54': function (input) { input = "6"; return input; },
			'55': function (input) { input = "7"; return input; },
			'56': function (input) { input = "8"; return input; },
			'57': function (input) { input = "9"; return input; }
		},
		keyInput = $(document).keypress(function (key) {
			var hi = key.keyCode;
			//Prevents error from happening when swapping between number values and operators
			if ((typeof numberValues[hi] !== 'function' && (typeof operatorValues[hi] !== 'function')) && (hi !== 13 && hi !== 27)) {
				key.preventDefault();
			} else if (typeof numberValues[hi] === 'function' && (typeof operatorValues[hi] !== 'function')) {
				input = numberValues[hi]();
				index = parseInt(input, 10);
				getNumber();
			} else if (typeof numberValues[hi] !== 'function' && (typeof operatorValues[hi] === 'function')) {
				operator = operatorValues[hi]();
				operation();
			} else if (hi === 13 || key.which === 13) {
				runCalc();
			} else if (hi === 27 || key.which === 27) {
				clearCalc();
			}
		});
	$('.selects ul li')
		.mousedown(function () {
		//Prevents adding numbers to the value following the operation.
			if ($(this).hasClass('disabled')) {
				return;
			} else {
				$(this).css('box-shadow', 'inset 1px 1px 2px 1px rgba(0, 0, 0, 0.3)');
			}
		})
		.mouseup(function () {
		//button clicking method
			$(this).css('box-shadow', '1px 1px 2px 1px rgba(0, 0, 0, 0.3)');
		});
	$('.number-list li').click(function () {
		$('.value').css('font-size', '4.5em');
		if ($('.number-list li').hasClass('disabled')) {
			counter += 1;
			if (counter >= 3) {
				alert('Must select an operator to continue');
			}
		} else {
			input = $(this).text();
			getNumber();
		}
	});
	$('.symbols li').click(function () {
		operator = $(this).text();
		operation();
	});
	$(document).keydown(function (key) {
		var hi = key.keyCode;
		//Button clicking method
		$('.number-list li').css('box-shadow', '1px 1px 2px 1px rgba(0, 0, 0, 0.3)');
		if (typeof numberValues[hi] === 'function' && (typeof operatorValues[hi] !== 'function')) {
			input = numberValues[hi]();
			index = parseInt(input, 10);
			if (index === 0) {
				btnToClick = $('.number-list li:last-child');
			} else {
				btnToClick = $('.number-list li:nth-child(' + index + ')');
			}
			
			btnToClick.css('box-shadow', 'inset 1px 1px 2px 1px rgba(0, 0, 0, 0.3)');
		}
		if (hi === 8) {
			number = Math.floor(number / 1e1);
			$('.value').text(number);
			if (operator !== '') {
				num2 = number;
			} else {
				num1 = number;
			}
		}
	});
	$(document).keyup(function (key) {
		$('.number-list li').css('box-shadow',  '1px 1px 2px 1px rgba(0, 0, 0, 0.3)');
		if (key.keyCode === 27) {
			clearCalc();
		}
	});
	$('.fire').click(runCalc);
	$(resetCalc).click(clearCalc);
});