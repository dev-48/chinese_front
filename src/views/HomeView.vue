<template>
	<slot name="header"></slot>
	<main class="main">
		<div class="main__promo">
			<div class="main__promo-left">
				<div class="main__promo-left-content">
					<img src="@/assets/main_page_img/shampoo_1.jpg" class="main__promo-left-content-img">
					<div class="main__promo-left-content-title">Шампуни</div>
				</div>
			</div>

			<div class="main__promo-right">
				<div class="main__promo-right-content">
					<img class="main__promo-right-content-img" src="@/assets/main_page_img/shampoo_3.jpg">
					<span class="main__promo-right-content-title">Крема</span>
				</div>

				<div class="main__promo-right-content">
					<img class="main__promo-right-content-img" src="@/assets/main_page_img/spa-composition.jpg">
					<span class="main__promo-right-content-title">Эликсиры</span>
				</div>
			</div>
		</div>


		<div class="main__tabs">
			<div class="main__tabs-head">
				<div class="main__tabs-container">

					<div :class="['main__tabs-head-item', {activate: newProductActivate}]">
						<div class="special-products__head">
							<div class="tabs__head-label" @click="switchProducts('newProduct')">{{$t('home_page.new_prodcuts')}}</div>
						</div>
					</div>

					<div :class="['main__tabs-head-item', {activate: bestsellersActivate}]">
						<div class="special-products__head">
							<div class="tabs__head-label" @click="switchProducts('bestsellers')">{{$t('home_page.bestsellers')}}</div>
						</div>
					</div>

					<div :class="['main__tabs-head-item', {activate: hotPriceActivate}]">
						<div class="special-products__head">
							<div class="tabs__head-label" @click="switchProducts('hotPrice')">{{$t('home_page.hot_price')}}</div>
						</div>
					</div>
				</div>
			</div>


			<div class="main__tabs-content" v-if='Object.keys(productsDisplayed).length > 0'>
				<div class="special-products">
					<div class="special-products-list" v-for="item in productsDisplayed" :key="item.id">
						<div class="special-products-list-product-preview">
							<img class="product-preview-img" src="@/assets/main_page_img/test.jpg">

							<div class="product-preview-discount">
								<span>-{{item.discount}}%</span>
							</div>

							<a class="product-preview-title">{{item.title}}</a>
							<div class="product-preview-price">
								<span>{{item.new_price}} ₸</span>
								<span class="product-preview-price-discount">{{item.price}} ₸</span>
							</div>
							<button class="special-products-buy-button button">В корзину</button>
						</div>
					</div>
				</div>
			</div>

			<div class="special-products-empty-list" v-else>
				<div class="special-products">
					<div class="special-products-empty-text">
						<span>{{$t('home_page.no_products')}}</span>
					</div>
				</div>
			</div>

			<div class="main__widget">
				<div class="main__widget-content">

					<div class="main__widget-content-up-block">

						<div class="main__widget-content-banner">
							<div class="main__widget-content-up-img-size main__widget-content-img">
								<img class="main__widget-content-up-img-size" src="@/assets/main_page_img/cactus.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Геморрой</span>
							</div>
						</div>

						<div class="main__widget-content-banner">
							<div class="main__widget-content-up-img-size main__widget-content-img">
								<img class="main__widget-content-up-img-size" src="@/assets/main_page_img/leather.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Заболевания кожи</span>
							</div>
						</div>

						<div class="main__widget-content-banner">
							<div class="main__widget-content-up-img-size main__widget-content-img">
								<img class="main__widget-content-up-img-size" src="@/assets/main_page_img/bady.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Бады</span>
							</div>
						</div>

					</div>

					<div class="main__widget-content-bottom-block">

						<div class="main__widget-content-banner">
							<div class="main__widget-content-bottom-img-size main__widget-content-img">
								<img class="main__widget-content-bottom-img-size" src="@/assets/main_page_img/women_health.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Геморрой</span>
							</div>
						</div>


						<div class="main__widget-content-banner">
							<div class="main__widget-content-bottom-img-size main__widget-content-img">
								<img class="main__widget-content-bottom-img-size" src="@/assets/main_page_img/mans_health.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Мужское Здоровье</span>
							</div>
						</div>

												<div class="main__widget-content-banner">
							<div class="main__widget-content-bottom-img-size main__widget-content-img">
								<img class="main__widget-content-bottom-img-size" src="@/assets/main_page_img/ph.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Похудение</span>
							</div>
						</div>


						<div class="main__widget-content-banner">
							<div class="main__widget-content-bottom-img-size main__widget-content-img">
								<img class="main__widget-content-bottom-img-size" src="@/assets/main_page_img/wr.jpg">
							</div>

							<div class="main__widget-content-banner-title">
								<span>Волосы</span>
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>


		<div class="main__layout-content">
			<div class="main__layout-collection-container">
				<div class="main__layout-collection-list">

					<div class="main__layout-content-collection-item">
						<div class="collection-item-img">
							<img class="collection-img" src="@/assets/main_page_img/treatment.jpg">
						</div>
						<div class="subcollection-items">
							<span class="collection-title">Лечение</span>
							<div class="subcollection-items-list">
								<a class="subcollection-link">Свечи</a>
								<a class="subcollection-link">Мази</a>
								<a class="subcollection-link">Пластыри</a>
							</div>
						</div>
					</div>


					<div class="main__layout-content-collection-item">
						<div class="collection-img">
							<img src="@/assets/main_page_img/onc.jpg">
						</div>
						<div class="subcollection-items">
							<span class="collection-title">Онкология</span>
							<div class="subcollection-items-list">
								<a class="subcollection-link">Табллетки</a>
								<a class="subcollection-link">Псориаз</a>
								<a class="subcollection-link">Мази</a>
								<a class="subcollection-link">Мыло</a>
							</div>
						</div>
					</div>

					<div class="main__layout-content-collection-item">
						<div class="collection-img">
							<img src="@/assets/main_page_img/joints.jpg">
						</div>
						<div class="subcollection-items">
							<span class="collection-title">Сосуды</span>
							<div class="subcollection-items-list">

								<a class="subcollection-link">Рыбий жир</a>
								<a class="subcollection-link">D3</a>
								<a class="subcollection-link">Витамин E</a>
								<a class="subcollection-link">Мелатонин</a>
								<a class="subcollection-link">Хитозан</a>
								<a class="subcollection-link">Кальций</a>
								<a class="subcollection-link">Гриб линчжи</a>
							</div>

							<span class="subcollections">Ещё +</span>
							<span class="subcollections hidden">Скрыть</span>
						</div>
					</div>


					<div class="main__layout-content-collection-item">
						<div class="collection-img">
							<img src="@/assets/main_page_img/other.png">
						</div>
						<div class="subcollection-items">
							<span class="collection-title">Другое</span>
							<div class="subcollection-items-list">
								<a class="subcollection-link">Свечи</a>
								<a class="subcollection-link">Мази</a>
								<a class="subcollection-link">Пластыри</a>

							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		<div class="main__brends">
			<div class="main__brends-container">
				<div class="brend__title">
					<h5>{{$t('home_page.brends')}}</h5>
				</div>

				<div class="brends">
					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-1.webp">
					</div>

					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-2.webp">
					</div>

					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-3.webp">
					</div>

					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-4.webp">
					</div>

					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-5.webp">
					</div>

					<div class="brends__brend">
						<img class="brends__brend-img" src="@/assets/main_page_img/brand-6.webp">
					</div>
				</div>

			</div>
		</div>


		<div class="main__benefit-list">
			<div class="benefit-list__container">

				<div class="benefit-list__block">
					<div class="benefit-icon">
						<img src="@/assets/icons/icons8-department-shop-48.png">
					</div>

					<div class="benefit-title">
						<h5>{{$t('home_page.benefit.assortment.title')}}</h5>
					</div>

					<div class="benefit-desc">
						<p>{{$t('home_page.benefit.assortment.text')}}</p>
					</div>
				</div>

				<div class="benefit-list__block">
					<div class="benefit-icon">
						<img src="@/assets/icons/icons8-best-price-64.png">
					</div>

					<div class="benefit-title">
						<h5>{{$t('home_page.benefit.price.title')}}</h5>
					</div>

					<div class="benefit-desc">
						<p>{{$t('home_page.benefit.price.text')}}</p>
					</div>
				</div>

				<div class="benefit-list__block">
					<div class="benefit-icon">
						<img src="@/assets/icons/icons8-ticket-80.png">
					</div>

					<div class="benefit-title">
						<h5>{{$t('home_page.benefit.control.title')}}</h5>
					</div>

					<div class="benefit-desc">
						<p>{{$t('home_page.benefit.control.text')}}</p>
					</div>
				</div>

				<div class="benefit-list__block">
					<div class="benefit-icon">
						<img src="@/assets/icons/icons8-gift-50.png">
					</div>

					<div class="benefit-title">
						<h5>{{$t('home_page.benefit.discounts.title')}}</h5>
					</div>

					<div class="benefit-desc">
						<p>{{$t('home_page.benefit.discounts.text')}}</p>
					</div>
				</div>

			</div>
		</div>

		<div class="main__feedback">
			<div class="feedback__container">
				<div class="feedback__content">
					<div class="feedback__title"><h4>Обратный звонок</h4></div>
					<div class="feedback__contact-date">
						<input class="feedback__contact-date-name input" type="text" :placeholder="$t('placeholder.name')">
						<input class="feedback__contact-date-number input" type="tel" :placeholder="$t('placeholder.number')">
					</div>

					<div class="feedback__hcaptcha">
						<vue-hcaptcha ref="invisibleHcaptcha"
								theme="light"
								language="ru"
								:sitekey="siteKey"
								@verify="onVerify"
								@expired="onExpire">
						</vue-hcaptcha>
					</div>

					<div class="feedback__send">
						<button class="feedback__send-button button">{{$t('send')}}</button>
					</div>
				</div>

			</div>
		</div>
	</main>
	<slot name="footer"></slot>
</template>

<script>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import '@/assets/style/home_style.css';

export default {
	name: 'HomeView',
	components: { VueHcaptcha },
	data(){
		return{
			siteKey: 'abc758dd-917c-4d18-bf11-5018df4f3aa2',
			newProductActivate: true,
			bestsellersActivate: false,
			hotPriceActivate: false,
			productsDisplayed: {
				//1: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
			},
			newProducts: {},
			bestsellers: {
				1: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
				2: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
				3: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
				4: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
				5: {'title': 'Садовый', 'discount': 31, 'price': 21000, 'new_price': 18000, 'img': 'test.jpg'},
			},
			hotPrice: {}
		}
	},
	created(){
		console.log(this.$t('home_page.benefit'))
	},
	methods:{
		switchProducts(product){
			this.newProductActivate = false;
			this.bestsellersActivate = false;
			this.hotPriceActivate = false;

			switch (product){
				case "newProduct":
					this.newProductActivate = true;
					this.productsDisplayed = this.newProducts;
					break

				case "bestsellers":
					this.bestsellersActivate = true;
					this.productsDisplayed = this.bestsellers;
					break;

				case "hotPrice":
					this.hotPriceActivate = true;
					this.productsDisplayed = this.hotPrice;
					break;
			}
		}

	}
}
</script>