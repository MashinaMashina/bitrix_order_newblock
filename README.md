# bitrix_order_newblock
Добавление нового поля в компонент bitrix:sale.order.ajax

## Установка
В файле template.php блок:
```html
<!-- BUYER PHONE BLOCK	-->
<div id="bx-soa-phone" data-visited="false" class="bx-soa-section bx-active">
	<div class="bx-soa-section-title-container">
		<h2 class="bx-soa-section-title col-sm-9">
			<span class="bx-soa-section-title-count"></span>Номер телефона
		</h2>
		<div class="col-xs-12 col-sm-3 text-right"><a href="" class="bx-soa-editstep">Изменить</a></div>
	</div>
	<div class="bx-soa-section-content container-fluid"></div>
</div>
```
Поставить после блока
```html
<div id="bx-soa-properties" data-visited="false" class="bx-soa-section bx-active">
	<!-- code -->
</div>
```

------------


После строки
```html
<div id="bx-soa-properties-hidden" class="bx-soa-section"></div>
```

Вставить
```html
<div id="bx-soa-phone-hidden" class="bx-soa-section">
	<div class="bx-soa-section-content container-fluid"></div>
</div>
```

После блока
```html
<div style="display: none;">
	<div id='bx-soa-basket-hidden' class="bx-soa-section"></div>
	<div id='bx-soa-region-hidden' class="bx-soa-section"></div>
	<div id='bx-soa-paysystem-hidden' class="bx-soa-section"></div>
	<div id='bx-soa-delivery-hidden' class="bx-soa-section"></div>
	<div id='bx-soa-pickup-hidden' class="bx-soa-section"></div>
	<div id="bx-soa-properties-hidden" class="bx-soa-section"></div>
	<div id="bx-soa-phone-hidden" class="bx-soa-section">
		<div class="bx-soa-section-content container-fluid"></div>
	</div>
	<div id="bx-soa-auth-hidden" class="bx-soa-section">
		<div class="bx-soa-section-content container-fluid"></div>
	</div>
</div>
```

Вставить
```html
<div style="display:none">
	<div id="phone-field-success">
		<div>Шаблон</div>
	</div>
</div>
```

Заменить все вызовы
*BX.Sale.OrderAjaxComponent*
На
*BX.Sale.OrderAjaxComponentExt*

Должно работать. :D

Если доработаете до ума, присылайте коммиты, сделаем битрикс лучше :smiley:
