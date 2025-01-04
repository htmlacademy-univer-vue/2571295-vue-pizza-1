import { defineStore } from "pinia";
import resources from "@/services/resources";
import jwtService from "@/services/jwt/jwt.service";
import { useProfileStore } from "@/stores/profile";
import JwtService from "@/services/jwt/jwt.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    //  logout() {
    //   this.user = null; // Сбрасывает данные пользователя
    // },
    async login(credentials) {
      const res = await resources.auth.login(credentials);
      if (res.__state === "success") {
        jwtService.saveToken(res.data.token);
        return "success";
      } else {
        return res.data.message;
      }
    },

    async logout() {
      try {
        await resources.auth.logout();
      } catch (e) {
        console.error("Ошибка при logout:", e);
      }
      // jwtService.destroyToken();
      // resources.auth.setAuthHeader("");
      this.user = null;
    },

    async whoami() {
      resources.auth.setAuthHeader(JwtService.getToken());
      const profileStore = useProfileStore();

      const res1 = await resources.auth.whoami();
      if (res1.__state !== "success") {
        await this.logout();
        return;
      } else {
        this.setUser(res1.data);
      }

      const res2 = await resources.address.getAddresses();
      if (res2.__state !== "success") {
        await this.logout();
        return;
      } else {
        profileStore.setAddresses(res2.data);
      }

      const res3 = await resources.order.getOrders();
      if (res3.__state !== "success") {
        await this.logout();
      } else {
        profileStore.setOrders(res3.data);
      }
    },
  },
});
