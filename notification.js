export const NotificationPlugin = async ({ $ }) => {
  const notify = async (message) => {
    await $`powershell.exe -NoProfile -Command "
      Import-Module BurntToast;
      New-BurntToastNotification -Text 'OpenCode', '${message}'
    "`
  }

  const beep = async () => {
    await $`powershell.exe -Command "[console]::beep(1000,400)"`
  }

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        await notify("Session completed!")
        await beep()
      }

      if (event.type === "session.error") {
        await notify("Session error!")
        await beep()
      }

      if (event.type === "permission.asked") {
        await notify("Waiting for input")
      }
    },
  }
}
