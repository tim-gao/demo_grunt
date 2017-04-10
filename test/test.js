


function checkSourceName (name){
	var patter = /^([0-9a-zA-Z\-\_\.]+\,)*[0-9a-zA-Z\_\-\.]+$/;

	return patter.test(name);
}

function _checkIfMutilpleSources (inputValues){
	var inputArr = inputValues,
		hash = {},
		duplicatedStr = '',
		flag = false;

		$.each(inputArr,function(index,item){
			if(item.trim() !== ''){
				if(hash[item]){
					flag = (true || flag);
					duplicatedStr +=item+', ';
				}
				hash[item] = item;
			}
			
		});
		return {'res':flag,'duplicatedSrc':duplicatedStr};
}

function _removeResource(target){
	var targetItem = target,
		sourceEle = targetItem.closest('div.source');

		if(sourceEle.length > 0){
			sourceEle.remove();
		}
}

function addResource(vals){

	var _self = this,
		_separater = ',',
		_arr = [],
		_template = '',
		_targetPanel = $('.resources-list'),
		_existSoures = _targetPanel.find('.source >span'),
		_arrExist = [],
		_strExist = '',
		regPatter = /^([0-9a-zA-Z\-\_\.]+,)*[0-9a-zA-Z\-\_\.]+$/;

	//collect the exist resourses
	_existSoures.each(function(i,v1){
	_arrExist.push($(v1).text());
	});

	if(regPatter.test(vals)){
		//split inputting by ','(default)
		_arr = vals.split(_separater);

		$.each(_arr,function(i,v2){
			if(v2.trim() !== ''){
				//check if same resources be added already
				if((_arrExist.length > 0) && ($.inArray(v2,_arrExist) !== -1)){
					_strExist += v2+' ';
				}

				_template += '<div class="source"><span>'+v2+'</span><i class="glyphicon glyphicon-remove"></i></div>';
			}
			
		});
		
		if(_strExist !==''){
			$('.error-panel').html(_strExist + ' already added!').addClass('error').show();
			return;
		}
		//append reources
		_targetPanel.append(_template);
	}else {
		$('.error-panel').html('Please input the valid reource name.' ).addClass('error').show();
		return;
	}


}

QUnit.test('hello test',function () {
	ok('hello test' == 'hello test','Test hello world');
});
QUnit.test('test regexp patter',function(){
	equal(checkSourceName(''),false,'empty string is invalid');
	equal(checkSourceName(' '),false,'blank string is invalid');
	equal(checkSourceName(','),false,'single comma is invalid');
	equal(checkSourceName(',a'),false,'name start with comma is invalid');
	equal(checkSourceName('a,'),false,'name end with comma is invalid');
	equal(checkSourceName('a,,'),false,'empty sting and last comma is invalid');
	equal(checkSourceName(',,'),false,'empty sting and last comma is invalid');
	equal(checkSourceName(',a,'),false,'name start/end with comma is invalid');
	equal(checkSourceName('abc'),true,'name only contains alphebet is valid');
	equal(checkSourceName('123'),true,'name only contains number is valid');
	equal(checkSourceName('1s'),true,'name contains alphebet and number is valid');
	equal(checkSourceName('abc123'),true,'name contains alphebet and number is valid');
	equal(checkSourceName('a2b3-ab23'),true,'name contains hyphen is valid');
	equal(checkSourceName('a2b3_ab23'),true,'name contains underline is valid');
	equal(checkSourceName('a2b3.ab23'),true,'name contains dot is valid');
	equal(checkSourceName('.a2b'),true,'name start with dot is valid');
	equal(checkSourceName('_underscore'),true,'name start with underline is valid');
	equal(checkSourceName('-a'),true,'name start with hyphen is valid');
});

QUnit.test('check if have multiple source name',function(){
	deepEqual(
		_checkIfMutilpleSources(['a1','a1']),
		{'res':true,'duplicatedSrc':'a1, '}, 
		'same source name more than one is not acceptable.');
	deepEqual(
		_checkIfMutilpleSources(['112','a1','112']),
		{'res':true,'duplicatedSrc':'112, '},
		 'different source name is acceptable.');
	
});

QUnit.module('DOM testing');

QUnit.test('test resource remove method',function(assert){
	var fixture = $('#qunit-fixture');
	fixture.append('<div class="source"><span>ubuntu</span><i class="glyphicon glyphicon-remove"></i></div>');
	_removeResource($('.glyphicon-remove',fixture));
	assert.equal($('.glyphicon-remove',fixture).length,0,'DOM testing:check if the target source be removed');
});

QUnit.test('test add resource method2',function(assert){
	var fixture = $('#qunit-fixture');
	fixture.append('<div class="resources-list"></div>');
	fixture.append('<p class="error-panel"></p>');
	addResource('jquery,angular,requirejs,nodejs');

	assert.equal(
		$('.resources-list .source').length,
		4,
		'DOM testing:check if input sources be added');

	assert.equal(
		$('.error-panel',fixture).text(),
		"",
		"DOM testing:check if expected error be shown");
});

QUnit.test('test add resource method2',function(assert){
	var fixture = $('#qunit-fixture');
	fixture.append('<div class="resources-list"></div>');
	fixture.append('<p class="error-panel"></p>');
	addResource('  ');

	assert.equal(
		$('.resources-list .source').length,
		0,
		'DOM testing:check if input sources be added');

	assert.equal(
		$('.error-panel',fixture).text(),
		"Please input the valid reource name.",
		"DOM testing:check if expected error be shown");
});
