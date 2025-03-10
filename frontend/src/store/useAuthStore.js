import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      // console.log(res)
      set({ authUser: res.data })
    } catch (error) {
      console.log("error in checking auth", error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true })

    try {
      const res = await axiosInstance.post("/auth/signup", data)
      set({ authUser: res.data })
      toast.success("Account create successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true })

    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data })
      toast.success("Account logging successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout")
      set({ authUser: null })
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatProfile: true })
    try {
      const res = await axiosInstance.put("/auth/update-profile", data)
        console.log(res)
        set({ authUser: res.data })
      toast.success("Profile update successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
        set({isUpdatProfile:false})
    }
  },
}))
