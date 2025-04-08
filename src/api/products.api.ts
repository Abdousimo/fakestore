import { ProductType } from "@/entities";
import { apiClient } from "@/lib/api-client";
import { updateProductValidationSchema } from "@/validation";
import { AxiosError } from "axios";

export const getProducts = async () : Promise<ProductType[] | undefined> => {
    try {
        const { data } = await apiClient.get("/products");
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch products"
        );
        }
    }
}

export const getProductById = async (id:number) : Promise<ProductType| undefined> => {
    try {
        const { data } = await apiClient.get(`/products/${id}`);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch the product"
        );
        }
    }
}

export const deleteProductById = async (id:number)  => {
    try {
        await apiClient.delete(`/products/${id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message || "Failed to delete product"
          );
        }
      }
}

export const updateProductById = async (
    data: Zod.infer<typeof updateProductValidationSchema> & { id:number}
) => {
    try {
        const { id, ...rest } = data;
         await apiClient.put(`/products/${id}`, rest);
        
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message || "Failed to update product"
          );
        }
      }
}


