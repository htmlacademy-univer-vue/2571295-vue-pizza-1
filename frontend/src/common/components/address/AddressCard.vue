<template>
  <div v-if="!editMode" class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="editMode = true">
          <span class="visually-hidden"> Изменить адрес </span>
        </button>
      </div>
    </div>
    <p>{{ address.street }}, {{ address.building }}, {{ address.flat }}</p>
    <small>{{ address.comment }}</small>
  </div>

  <address-edit-form
    v-else
    :address="address"
    :title="`Адрес ${index}`"
    @delete="emit('delete')"
    @save="save"
  />
</template>

<script setup>
import { ref } from "vue";
import AddressEditForm from "@/common/components/address/AddressEditForm.vue";

defineProps({
  address: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["delete", "save"]);

const editMode = ref(false);

const save = (address) => {
  emit("save", address);
  editMode.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.icon {
  cursor: pointer;
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("/api/public/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
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
</style>
