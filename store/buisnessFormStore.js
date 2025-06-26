import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRegistrationStore = create(
  persist(
    (set) => ({
      userData: {
        businessName: "",
        ownerEmail: "",
        password: "",
        ownerFullName: "",
        phone: "",
        website: "",
        serviceCategories: [],
        employeeRange: "",
        mainCategoryIds: [],
        subCategoryIds: [],
      },
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
      resetUserData: () =>
        set({
          userData: {
            businessName: "",
            ownerEmail: "",
            password: "",
            ownerFullName: "",
            phone: "",
            website: "",
            serviceCategories: [],
            employeeRange: "",
            mainCategoryIds: [],
            subCategoryIds: [],
          },
        }),
    }),
    {
      name: "business-reg-data",
    }
  )
);

export default useRegistrationStore;
