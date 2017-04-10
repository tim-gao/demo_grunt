define(['jquery','handlebars','jquery.validate'],function ($,Handlebars) {
	
	   var my_cruise = {

	   		init: function(){
	            this._getSource();

	   			this._bindEvent();

	   			this._collection();
	   			
	            $(document).ready(function() {
	              $('#inputForm').validate({
	                rules: {
	                  inputBox: 'required',
	                  minlength:2
	                },
	                messages: {
	                  inputBox: 'Please input any resources!',
	                },
	                ignore: ".ignore",
	                errorPlacement: function(error,element){
	                  var form = $('#inputForm');
	                      form.find('.error-panel').html($(error));
	                }
	            });
	           });
	   		},
	   		//this method exposed to request the information
	   		_getSource:function (argument) {
	   			var _self = this,
	   				filterButton = $('.menu-list .button.active'),
	   				flag = filterButton.data('filter');
	   			//dummy data, mock the server response
				 var responses = 
				    { "list": [{
						"isDeny": true,
						"filterType": "physical",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr02.thoughtworks.com",
							"status": "idle",
							"ipaddress": "192.168.1.2",
							"path": "/var/lib/cruise-agent"
						}
					},
					{
						"isDeny": false,
						"filterType": "physical",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr03.thoughtworks.com",
							"status": "building",
							"ipaddress": "192.168.1.3",
							"path": "/var/lib/cruise-agent"
						}
					},
					{
						"isDeny": false,
						"filterType": "physical",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr04.thoughtworks.com",
							"status": "building",
							"ipaddress": "192.168.1.4",
							"path": "/var/lib/cruise-agent"
						}
					},
					{
						"isDeny": true,
						"filterType": "physical",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr05.thoughtworks.com",
							"status": "idle",
							"ipaddress": "192.168.1.5",
							"path": "/var/lib/cruise-agent"
						}
					},
					{
						"isDeny": false,
						"filterType": "virtual",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr06.thoughtworks.com",
							"status": "building",
							"ipaddress": "192.168.1.6",
							"path": "/var/lib/cruise-agent"
						}
					},
					{
						"isDeny": true,
						"filterType": "virtual",
						"img": "",
						"infor": {
							"name": "bjstdmngbgr07.thoughtworks.com",
							"status": "idle",
							"ipaddress": "192.168.1.7",
							"path": "/var/lib/cruise-agent"
						}
					}]
				};
				_self._renderInfos(responses);
				_self._filterList(flag);
	   		},
	   		//this method exposed to show/hide information list base on active button
	   		_filterList:function(flag){
	   			var _self = this;
	   			if(flag === 'all'){
	   				$('.infor-container').find('li').show();
	   				_self._collection();
	   				return;
	   			}

   				$('.infor-container').find('li').each(function(i,v){
   					if($(v).data('filter-value') === flag ){
   						$(v).show();
   					}else {
   						$(v).hide();
   					}
   				});

   				_self._collection();
	   		},
	   		//this method exposed to calculate the summary account
	   		_collection:function(){
	   			var _lists = $('.infor-container').find('li'),
	   				_idles = 0,
	   				_buildings = 0;

	   			_lists.each(function(i,v){
	   				if (($(v).data('status') == 'idle') && ($(v).is(':visible'))){
	   					_idles++;
	   				}else if(($(v).data('status') == 'building') && ($(v).is(':visible'))){
	   					_buildings++;
	   				}
	   			});

	   			$('.summary-item.building .account').text(_buildings);
	   			$('.summary-item.idle .account').text(_idles);
	   		},
	   		//this method exposed to render the information list through handlebars
	   		_renderInfos:function(datas){
	   			var source = $("#item_tpl").html(),
	   				template = Handlebars.compile(source),
	   				inforContainer = $('ul.infor-container'),
	   				_html = '';

	   				if(!$.isEmptyObject(datas)){
	   					_html = template(datas);
	   				}
	   				inforContainer.html(_html);
	   		},
	   		_bindEvent: function(){
	   			var _self = this;

	   			$(document).on('click','#all_btn',function(){
	   				_self._filterList($(this).data('filter'));
	   			});
	   			$(document).on('click','#physical_btn',function(){
	   				_self._filterList($(this).data('filter'));
	   			});
	   			$(document).on('click','#Virtual_btn',function(){
	   				_self._filterList($(this).data('filter'));
	   			});

	   			//custom event when lists change, will trigger to recalculate the summary data
	   			$(document).on('change','.infor-container',function(){
	   				_self._collection();
	   			});
	   			//logout link click event
	   			$(document).on('click','.logout',function(){
	   				//TODO
	   			});

	   			//specify resources link click event
	   			$(document).on('click','.spe-resours',function(){
	   				var $this = $(this),
	   				 	_top = $this.offset().top,
	   				 	_left = $this.offset().left,
	   				 	_targetContainer = $('.common-specify-container'),
	   				 	_targetInput =_targetContainer.find('.input-box'),
	   				 	_height = $this.closest('.infor').height(),
	   				 	_overlayWrapper = $('.overlay'),
	   				 	_id = $(this).closest('li.list-item').prop('id');

	   				 	_targetContainer.css({'top': (_top + _height),'left':_left});
	   					_targetContainer.show();
	   					_targetContainer.data('belongs',_id);
	   					_overlayWrapper.show();
	   					_targetInput.focus();
	   					return false;
	   			});

	   			// remove source icon event
	   			$(document).on('click','.resources-list  .glyphicon-remove',function(e){
	   				var $this = $(this);
	   				$('#waring_modal').data('anchor',$(e.target));
	   				$('#waring_modal').modal('show');
	   				return false;
	   			});
	   			// modal dialog close button event
	   			$(document).on('click','#waring_modal .close-btn',function(){
	   				var $this = $(this);

	   				$('#waring_modal').modal('hide');
	   				return false;
	   			});
	   			// modal dialog yes button event
	   			$(document).on('click','#waring_modal .yes-btn',function(){
	   				var $this = $(this),
	   					modal = $('#waring_modal');
	   					anchorE= modal.data('anchor');

	   				modal.modal('hide');
	   				//after mode hide, will remove resource after 500 ms
	   				setTimeout(function(){_self._removeResource(anchorE);},500);
	   				return false;
	   			});
	   			//input form close button click event
	   			$(document).on('click','.close-btn',function(){
	   				$('.common-specify-container').hide();
	   				$('.common-specify-container').data('belongs','');
	   				$('.overlay').hide();
	               	$('#inputForm')[0].reset();
	               	$('#inputBox-error').remove();
	               	$('.input-box').removeClass('error');
	               	$('.error-panel').empty().hide();
	   				return false;
	   			});
	   			//add resource button click event
	   			$(document).on('click','.add-btn',function(e){
	   				e.stopPropagation();
	   				var $this = $(this),
	   					_input = $this.closest('.common-specify-container').find('.input-box'),
	   					_values = _input.val();

	                  if($('#inputForm').valid()){
	                     _self._addResources(_values);
	                  }
	   				return false;
	   			});

	   			//$(document).on('keyup','.common-specify-container .input-box',function(e){

	   			//	return false;
	   			//});
	   			
	   			$(document).on('click','.menu-list .button',function(){
	   				var $this = $(this);
	   				$this.siblings('.button').removeClass('active');
	   				$this.addClass('active');
	   				return false;
	   			});

	   			$(document).on('click','.nav-tabs li[role="presentation"]',function(){
	   				var $this = $(this),
	   					tabName = $this.find('>a').text(),
	   					menuTitle = $('.menu-list');
	   					//replace the title according selected tab name
	   					menuTitle.find('.menu-title').html(tabName);
	   					//reset the buttons

	   					if($this.find('>a').data('name') == 'agents'){
	   						menuTitle.find('.button').show();
	   					}else{
	   						menuTitle.find('.button').hide();
	   					}

	   				return false;
	   			});
	   		},
	   		//This method exposed to add spefify resources
	   		_addResources : function(vals){
	   			var _self = this,
	   				_separater = ',',
	   				_arr = [],
	   				_template = '',
	   				_inputform = $('.common-specify-container'),
	   				_hometown = _inputform.data('belongs'),
	   				_targetPanel = $('#'+_hometown).find('.resources-list'),
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

	   				//check if have multiple resources be filled in
	   				var checkedObj = _self._checkIfMutilpleSources(_arr);
	   				if(checkedObj.res){
	   					$('.error-panel').html('"'+checkedObj.duplicatedSrc + '" were inputted more than one time, please remove the duplicate one.').addClass('error').show();
	   					return;
	   				}

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
	   				// After adding done, close the input form
	   				_inputform.hide();
	   				$('.error-panel').empty().hide();
	   				$('.overlay').hide();
	   			}else {
	   				$('.error-panel').html('Please input the valid reource name.' ).addClass('error').show();
	   				return;
	   			}

	   		},
	   		//This method exposed to check if there is one reources be inputted more than one time
	   		_checkIfMutilpleSources: function(inputValues/*array*/){
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
	   		},
	   		//This method exposed to remove selected resources
	   		_removeResource: function(target){
	   			var targetItem = target,
	   				sourceEle = targetItem.closest('div.source');

	   				if(sourceEle.length > 0){
	   					sourceEle.remove();
	   				}
	   		}
	   };
	   my_cruise.init();
});