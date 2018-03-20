

export const logger = {
  warning: (message: string, about?: string) => {
    const prefix: string = about ? `${about}: ` : ''
    console.warn(prefix + message)
  },
  
  error: (message: string, about?: string) => {
    const prefix: string = about ? `${about}: ` : ''
    console.error(prefix + message)
  },
  
}
