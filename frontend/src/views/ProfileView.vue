<script setup>
import { useProfileStore } from "@/stores/profile";
import AddressCard from "@/common/components/address/AddressCard.vue";
import { ref } from "vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";

const profileStore = useProfileStore();
const isNewAddressFormOpened = ref(false);

const addAddress = async (address) => {
  await profileStore.addAddress(address);
  isNewAddressFormOpened.value = false;
};

const updateAddress = (address, data) => {
  profileStore.updateAddress({
    ...address,
    ...data,
  });
};
</script>
<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          @/assets/img/users/user5@2x.webp 1x,
          @/assets/img/users/user5@4x.webp 2x
        "
      />
      <img
        src="@/assets/img/users/user5@2x.jpg"
        srcset="@/assets/img/users/user5@4x.jpg"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>Василий Ложкин</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>

  <div class="layout__address">
    <AddressCard
      v-for="(address, index) in profileStore.addresses"
      :key="address.id"
      :address="address"
      :index="index + 1"
      @delete="profileStore.removeAddress(address.id)"
      @save="updateAddress(address, $event)"
    />
  </div>

  <div v-if="!isNewAddressFormOpened" class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="isNewAddressFormOpened = true"
    >
      Добавить новый адрес
    </button>
  </div>

  <div v-else class="layout__address">
    <AddressEditForm
      title="Новый адрес"
      @save="addAddress"
      @delete="isNewAddressFormOpened = false"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
@import "@/assets/scss/ds-system/ds.scss";

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;
}

.layout__button button {
  padding: 12px 23px;
}

.layout__address {
  margin-top: 16px;
}

.layout-form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: #ffffff;
  -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06),
    0 0 1px rgba(0, 0, 0, 0.04);
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;
  border-top: 1px solid rgba(65, 182, 25, 0.1);
}

.button--border {
  background-color: transparent;
  border: 1px solid #41b619;
  color: #000000;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.button--border:hover:not(:active):not(:disabled) {
  color: #41b619;
  border-color: #41b619;
  background-color: transparent;
}

.button--border:active:not(:disabled) {
  color: #38a413;
  border-color: #38a413;
  background-color: transparent;
}

.button--border:disabled {
  opacity: 0.5;
}

.user {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 33px;
}

.user__name {
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 23px;
  margin-left: 30px;
}

.user__name span {
  display: inline-block;
  vertical-align: middle;
}

.user__button {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 19px;
  width: 100%;
  margin-top: 20px;
}

.user__phone span {
  font-weight: 400;
}

.address-form {
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
}

.address-form--opened .address-form__header {
  padding: 16px;
}

.address-form p {
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;
  margin-top: 0;
  margin-bottom: 16px;
  padding: 0 16px;
}

.address-form small {
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  line-height: 13px;
  display: block;
  padding: 0 16px;
}

.address-form__wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;
}

.address-form__input--size--normal {
  width: 60.5%;
}

.address-form__input--size--small {
  width: 18%;
}

.address-form__buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0 16px;
}

.address-form__buttons button {
  margin-left: 16px;
  padding: 16px 27px;
}

.address-form__header {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(65, 182, 25, 0.1);
}

.button {
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  line-height: 21px;
  font-family: inherit;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  outline: none;
  -webkit-box-shadow: 0 16px 24px rgba(0, 0, 0, 0.06),
    0 2px 6px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.04);
  background-color: #41b619;
}

.button:hover:not(:active):not(:disabled) {
  background-color: #48d618;
}

.button:active:not(:disabled) {
  background-color: #38a413;
}

.button:focus:not(:disabled) {
  opacity: 0.5;
}

.button:disabled {
  background-color: #8cb97c;
  color: rgba(255, 255, 255, 0.2);
  cursor: default;
}

.button--border {
  background-color: transparent;
  border: 1px solid #41b619;
  color: #000000;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.button--border:hover:not(:active):not(:disabled) {
  color: #41b619;
  border-color: #41b619;
  background-color: transparent;
}

.button--border:active:not(:disabled) {
  color: #38a413;
  border-color: #38a413;
  background-color: transparent;
}

.button--border:disabled {
  opacity: 0.5;
}

.button--transparent {
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #000000;
}

.button--transparent:hover:not(:active):not(:disabled) {
  color: #e20338;
  background-color: transparent;
}

.button--transparent:active:not(:disabled) {
  color: #c20532;
  background-color: transparent;
}

.button--transparent:disabled {
  opacity: 0.25;
}

.button--arrow::before {
  content: "";
  background-image: url("../img/button-arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
}

.button--white {
  background-color: #ffffff;
  color: #41b619;
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

.layout__address {
  :deep(.address-form) {
    $bl: &;

    position: relative;

    padding-top: 0;
    padding-bottom: 26px;

    p {
      @include r-s16-h19;

      margin-top: 0;
      margin-bottom: 16px;
      padding: 0 16px;
    }

    small {
      @include l-s11-h13;

      display: block;

      padding: 0 16px;
    }
  }

  :deep(.address-form--opened) {
    .address-form__header {
      padding: 16px;
    }
  }

  :deep(.address-form__header) {
    @include b-s14-h16;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 21px;
    padding: 10px 16px;

    border-bottom: 1px solid rgba($green-500, 0.1);
  }
}
</style>
