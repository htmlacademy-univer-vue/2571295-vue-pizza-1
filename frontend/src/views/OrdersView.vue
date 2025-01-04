<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

import { computed } from "vue";

const pizzas = computed(() => cartStore.pizzasExtended);
const miscItems = computed(() => cartStore.miscExtended);
const orders = computed(() => cartStore.orders);

const getImage = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};

// const deleteOrder = (orderIndex) => {
//     const order = cartStore.orders[orderIndex];
//     order.pizzas.forEach((_, pizzaIndex) => cartStore.pizzas.splice(pizzaIndex, 1));
//     order.misc.forEach((misc) => cartStore.setMiscQuantity(misc.id, 0));
//     cartStore.orders.splice(orderIndex, 1); // Удаление самого заказа
// };

const deleteMisc = (miscId) => {
  cartStore.setMiscQuantity(miscId, 0);
};

// Удаление заказа
const deleteOrder = (orderIndex) => {
  const order = cartStore.orders[orderIndex];
  if (!order) return;

  // Удаление пицц и дополнительных товаров
  order.pizzas.forEach((_, index) => cartStore.setPizzaQuantity(index, 0));
  order.misc.forEach((misc) => cartStore.setMiscQuantity(misc.id, 0));

  // Удаление самого заказа
  cartStore.orders.splice(orderIndex, 1);
};

const repeatOrder = (order) => {
  if (!order) {
    console.error("Order is undefined or null.");
    return;
  }

  console.log("Repeating order:", JSON.stringify(order, null, 2));

  // Копируем пиццы и дополнительные товары из исходного заказа
  const newOrderPizzas = order.pizzas.map((pizza) => ({ ...pizza }));
  const newOrderMisc = order.misc.map((misc) => ({ ...misc }));

  // Формируем новый заказ
  const newOrder = {
    pizzas: newOrderPizzas,
    misc: newOrderMisc,
    address: { ...order.address },
    phone: order.phone,
    total: order.total,
    date: new Date().toISOString(), // Обновляем дату заказа
  };
  // Добавляем новый заказ в историю
  cartStore.orders = [...cartStore.orders, newOrder];

  console.log("New order added to history:", JSON.stringify(newOrder, null, 2));
};

const totalOrderPrice = computed(() => {
  const pizzaTotal = pizzas.value.reduce(
    (sum, pizza) => sum + pizza.quantity * pizza.price,
    0
  );
  const miscTotal = miscItems.value.reduce(
    (sum, misc) => sum + misc.quantity * misc.price,
    0
  );

  return pizzaTotal + miscTotal;
});
console.log("Pizzas in cart:", cartStore.pizzas);
</script>

<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>
  <section v-for="(order, index) in orders" :key="index" class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ index + 1 }}</b>
      </div>
      <div class="order__sum">
        <span>Сумма заказа: {{ order.total }} ₽</span>
      </div>
      <div class="order__button">
        <button
          type="button"
          @click="deleteOrder(index)"
          class="button button--border"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" @click="repeatOrder(order)" class="button">
          Повторить
        </button>
      </div>
    </div>
    <ul class="order__list">
      <li
        class="order__item"
        v-for="(pizza, pizzaIndex) in order.pizzas"
        :key="pizzaIndex"
      >
        <div class="product">
          <img
            :src="getImage('product.svg')"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ pizza.size?.name }}, {{ pizza.dough?.name }} тесто</li>
              <li>Соус: {{ pizza.sauce?.name }}</li>
              <li>
                Начинка:
                {{
                  pizza.ingredients.map((i) => i.name).join(", ") ||
                  "Нет начинки"
                }}
              </li>
            </ul>
          </div>
        </div>
        <p class="order__price">{{ pizza.quantity }}x{{ pizza.price }} ₽</p>
      </li>
    </ul>

    <!-- Display misc items -->
    <ul v-if="order.misc.length" class="order__additional">
      <li v-for="(misc, miscIndex) in order.misc" :key="miscIndex">
        <img
          :src="`${getImage(misc.image)}` + '.svg'"
          width="20"
          height="30"
          :alt="misc.name"
        />
        <p>
          <span>{{ misc.name }}&nbsp;×&nbsp;{{ misc.quantity }}</span>
          <b>{{ misc.quantity * misc.price }} ₽</b>
        </p>
      </li>
    </ul>
    <p class="order__address">
      {{
        order.address?.street && order.address?.building
          ? `Адрес доставки: ${order.address.street}, ${
              order.address.building
            }${
              order.address.flat
                ? `, кв.
            ${order.address.flat}`
                : ""
            }`
          : "Самовывоз или адрес не указан"
      }}
    </p>
  </section>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.layout__title {
  margin-bottom: 27px;
}

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
