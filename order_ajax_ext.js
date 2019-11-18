(function () {
	'use strict'; 
	
	var initParent = BX.Sale.OrderAjaxComponent.init,
		getBlockFooterParent = BX.Sale.OrderAjaxComponent.getBlockFooter,
		editOrderParent = BX.Sale.OrderAjaxComponent.editOrder,
		showParent = BX.Sale.OrderAjaxComponent.show,
		fadeParent = BX.Sale.OrderAjaxComponent.fade,
		parentEditSection = BX.Sale.OrderAjaxComponent.editSection,
		parentE = BX.Sale.OrderAjaxComponent
		;
 
	BX.namespace('BX.Sale.OrderAjaxComponentExt');	
 
	BX.Sale.OrderAjaxComponentExt = BX.Sale.OrderAjaxComponent;
	
	BX.Sale.OrderAjaxComponentExt.init = function (parameters) {
		var _this = BX.Sale.OrderAjaxComponentExt;
		
		initParent.apply(_this, arguments);
		
		BX.Sale.OrderAjaxComponentExt.phoneBlockId = 'bx-soa-phone';
		BX.Sale.OrderAjaxComponentExt.phoneHiddenBlockNode = BX(BX.Sale.OrderAjaxComponentExt.phoneBlockId + '-hidden');
		BX.Sale.OrderAjaxComponentExt.phoneBlockNode = BX(BX.Sale.OrderAjaxComponentExt.phoneBlockId);
		BX.Sale.OrderAjaxComponentExt.initialized.phone = false;
	};
	
	BX.Sale.OrderAjaxComponentExt.editPhoneInfo = function(node)
	{
		console.log('editPhoneInfo()');
		
		node.appendChild(BX('phone-field-success'));
	}
	
	BX.Sale.OrderAjaxComponentExt.fade = function(node, nextSection)
	{
		var _this = BX.Sale.OrderAjaxComponentExt;
		
		if (!node || !node.id || _this.activeSectionId != node.id)
			return;
		
		_this.hasErrorSection[node.id] = true;

		var objHeightOrig = node.offsetHeight,
			objHeight;
		
		if(node.id === _this.phoneBlockId)
		{
			BX.remove(_this.phoneBlockNode.querySelector('.alert.alert-warning.alert-hide'));
			BX.Sale.OrderAjaxComponentExt.editFadePhoneBlock();
		}
		
		return fadeParent.apply(_this, arguments);
	};
	
	BX.Sale.OrderAjaxComponentExt.show = function(node)
	{
		var _this = BX.Sale.OrderAjaxComponentExt;
		
		if (!node || !node.id || _this.activeSectionId == node.id)
			return;
		
		if(node.id === _this.phoneBlockId)
		{
			_this.activeSectionId = node.id;
			BX.removeClass(node, 'bx-step-error bx-step-warning');
			
			BX.Sale.OrderAjaxComponentExt.editActivePhoneBlock(true);
			
			if (node.getAttribute('data-visited') === 'false')
			{
				_this.showBlockErrors(node);
				_this.notifyAboutWarnings(node);
			}

			node.setAttribute('data-visited', 'true');
			BX.addClass(node, 'bx-selected');
			BX.removeClass(node, 'bx-step-completed');
		}
		else
			return showParent.apply(_this, arguments);
	};
	
	BX.Sale.OrderAjaxComponentExt.editSection = function(section)
	{
		if (!section || !section.id)
			return;
		
		var _this = BX.Sale.OrderAjaxComponentExt;
		
		if(section.id === _this.phoneBlockId)
		{
			var active = section.id == _this.activeSectionId,
				titleNode = section.querySelector('.bx-soa-section-title-container'),
				editButton, errorContainer;

			BX.unbindAll(titleNode);
			
			BX.bind(titleNode, 'click', BX.proxy(_this.showByClick, _this));
					editButton = titleNode.querySelector('.bx-soa-editstep');
					editButton && BX.bind(editButton, 'click', BX.proxy(_this.showByClick, _this));
			
			errorContainer = section.querySelector('.alert.alert-danger');
			_this.hasErrorSection[section.id] = errorContainer && errorContainer.style.display != 'none';
			
			_this.editPhoneBlock(active);
		}
		else
		{
			return parentEditSection.apply(_this, arguments);
		}
	}
	
	BX.Sale.OrderAjaxComponentExt.editPhoneBlock = function(active)
	{
		var _this = BX.Sale.OrderAjaxComponentExt;

		if (active)
			_this.editActivePhoneBlock(true);
		else
			_this.editFadePhoneBlock();
	
		_this.initialized.phone = true;
	}
	
	BX.Sale.OrderAjaxComponentExt.editFadePhoneBlock = function()
	{
		var _this = BX.Sale.OrderAjaxComponentExt;
		var Content = _this.phoneBlockNode.querySelector('.bx-soa-section-content'), newContent;
	
		if (_this.initialized.phone)
		{
			_this.phoneHiddenBlockNode.appendChild(Content);
		}
		else
		{
			_this.editActivePhoneBlock(false);
			BX.remove(BX.lastChild(_this.phoneBlockNode));
		}
	
		newContent = _this.getNewContainer(true);
		//newContent = 'NewContent';
		_this.phoneBlockNode.appendChild(newContent);
		
		// restore small block
		//_this.editFadeDeliveryContent(newContent);
	}
	
	BX.Sale.OrderAjaxComponentExt.editActivePhoneBlock = function(activeNodeMode)
	{
		console.log('editActivePhoneBlock()');
		
		var _this = BX.Sale.OrderAjaxComponentExt;
		
		var node = activeNodeMode ? _this.phoneBlockNode : _this.phoneHiddenBlockNode;
		
		if (_this.initialized.phone)
		{
			BX.remove(BX.lastChild(node));
			node.appendChild(BX.firstChild(_this.phoneHiddenBlockNode));
		}
		else
		{
			var Content, phoneNode;

			Content = node.querySelector('.bx-soa-section-content');
			if (!Content)
			{
				Content = _this.getNewContainer();
				node.appendChild(Content);
			}
			else
				BX.cleanNode(Content);
			
			_this.getErrorContainer(Content);
			
			phoneNode = BX.create('DIV', {props: {className: 'bx-soa-pp row'}});
			Content.appendChild(phoneNode);
			_this.editPhoneInfo(phoneNode);
			_this.getBlockFooter(Content);
		}
	}
})();