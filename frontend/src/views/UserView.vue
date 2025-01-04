<template>
  <SidebarLayout>
    <template #sidebar>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
        :to="{ name: 'orders' }"
      >
        История заказов
      </router-link>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
        :to="{ name: 'profile' }"
      >
        Мои данные
      </router-link>
    </template>
    <router-view />
  </SidebarLayout>
</template>

<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = computed(() => route.name);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.layout__title {
  margin-bottom: 27px;
}

.layout__link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}
</style>

<!-- <script setup>
import AppLayoutSidebar from '@/layouts/AppLayoutSidebar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeName = computed(() => route.name)
</script>
<template>
    <AppLayoutSidebar>
        <template #sidebar>
            <router-link class="layout__link" :class="{ 'layout__link--active': routeName === 'orders' }" :to="{
                name: 'orders'
            }">
                История заказов
            </router-link>
            <router-link class="layout__link" :class="{ 'layout__link--active': routeName === 'profile' }" :to="{
                name: 'profile'
            }">
                Мои данные
            </router-link>
        </template>
        <router-view />
    </AppLayoutSidebar>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";


.address-form__header {
    @include b-s14-h16;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 21px;
    padding: 10px 16px;
    border-bottom: 1px solid rgba($green-500, 0.1);
}

.user {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 33px;
}

.user__name {
    @include b-s20-h23;

    margin-left: 30px;

    span {
        display: inline-block;

        vertical-align: middle;
    }
}

.user__button {
    display: inline-block;

    cursor: pointer;
    vertical-align: middle;
}

.user__phone {
    @include b-s16-h19;

    width: 100%;
    margin-top: 20px;

    span {
        font-weight: 400;
    }
}
</style> -->
<!-- <template>

    <main class="layout">
        <div class="layout__sidebar sidebar">
            <a href="index.html" class="logo layout__logo">
                <img src="img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
            </a>
            <a class="layout__link" href="#">История заказов</a>
            <a class="layout__link layout__link--active" href="#">Мои данные</a>
        </div>

        <div class="layout__content">
            <div class="layout__title">
                <h1 class="title title--big">Мои данные</h1>
            </div>

            <div class="user">
                <picture>
                    <source type="image/webp" srcset="img/users/user5@2x.webp 1x, img/users/user5@4x.webp 2x">
                    <img src="img/users/user5@2x.jpg" srcset="img/users/user5@4x.jpg" alt="Василий Ложкин" width="72"
                        height="72">
                </picture>
                <div class="user__name">
                    <span>Василий Ложкин</span>
                </div>
                <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
            </div>

            <div class="layout__address">
                <div class="sheet address-form">
                    <div class="address-form__header">
                        <b>Адрес №1. Тест</b>
                        <div class="address-form__edit">
                            <button type="button" class="icon"><span class="visually-hidden">Изменить
                                    адрес</span></button>
                        </div>
                    </div>
                    <p>Невский пр., д. 22, кв. 46</p>
                    <small>Позвоните, пожалуйста, от проходной</small>
                </div>
            </div>

            <div class="layout__address">
                <form action="test.html" method="post" class="address-form address-form--opened sheet">
                    <div class="address-form__header">
                        <b>Адрес №1</b>
                    </div>

                    <div class="address-form__wrapper">
                        <div class="address-form__input">
                            <label class="input">
                                <span>Название адреса*</span>
                                <input type="text" name="addr-name" placeholder="Введите название адреса" required>
                            </label>
                        </div>
                        <div class="address-form__input address-form__input--size--normal">
                            <label class="input">
                                <span>Улица*</span>
                                <input type="text" name="addr-street" placeholder="Введите название улицы" required>
                            </label>
                        </div>
                        <div class="address-form__input address-form__input--size--small">
                            <label class="input">
                                <span>Дом*</span>
                                <input type="text" name="addr-house" placeholder="Введите номер дома" required>
                            </label>
                        </div>
                        <div class="address-form__input address-form__input--size--small">
                            <label class="input">
                                <span>Квартира</span>
                                <input type="text" name="addr-apartment" placeholder="Введите № квартиры">
                            </label>
                        </div>
                        <div class="address-form__input">
                            <label class="input">
                                <span>Комментарий</span>
                                <input type="text" name="addr-comment" placeholder="Введите комментарий">
                            </label>
                        </div>
                    </div>

                    <div class="address-form__buttons">
                        <button type="button" class="button button--transparent">Удалить</button>
                        <button type="submit" class="button">Сохранить</button>
                    </div>
                </form>
            </div>

            <div class="layout__button">
                <button type="button" class="button button--border">Добавить новый адрес</button>
            </div>
        </div>
    </main>
</template>
-->
