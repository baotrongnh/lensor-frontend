import useSWR from "swr"
import { postApi } from "../apis/postApi"

export const usePosts = () => {
     const { data, error, isLoading } = useSWR('posts', postApi.getAll)
     return { data, error, isLoading }
}

export const usePostDetail = (id: string) => {
     const { data, error, isLoading, mutate } = useSWR(
          `post-${id}`,
          () => postApi.getById(id)
     )
     return { data, error, isLoading, mutate }
}
