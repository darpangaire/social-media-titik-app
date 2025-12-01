import {useMutation} from '@tanstack/react-query'
import {registerUser,loginUser} from './queriesAndMutation'
import {logoutUser} from './authUtils'

// Hook for user registration
export const useRegisterUser = ()=> {
  return useMutation({
    mutationFn:registerUser,
})
}


export const useLoginUser=()=> {
  return useMutation({
    mutationFn:loginUser,
  })
}

export const useLogOutUser=()=> {
  return useMutation({
    mutationFn: async () => {
      // Implement logout logic here
      return Promise.resolve();
    },
    onSuccess: () => {
      // Invalidate or update queries related to authentication if needed
      logoutUser();
      

    }
  })
}


