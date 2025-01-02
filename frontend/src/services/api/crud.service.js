import { ApiService } from "@/services/api/api.service";

export class CrudService extends ApiService {
  constructor(resource) {
    super(); // для инициализации родительского класса.
    this.resource = resource; //(например, "/users")
  }
  // Делает GET-запрос на указанный ресурс (например, GET /users).
  async get() {
    try {
      return await this.$get(this.resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      throw error;
    }
  }
  async put(entity) {
    try {
      return await this.$put(`${this.resource}/${entity.id}`, entity);
    } catch (error) {
      console.error(`Error updating resource ${entity.id}:`, error);
      throw error;
    }
  }
  async post(entity) {
    try {
      return await this.$post(this.resource, entity);
    } catch (error) {
      console.error(`Error creating resource:`, error);
      throw error;
    }
  }
  async delete(id) {
    try {
      return await this.$delete(`${this.resource}/${id}`);
    } catch (error) {
      console.error(`Error updating resource ${id}:`, error);
      throw error;
    }
  }
}
