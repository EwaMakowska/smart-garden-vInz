export const showNotification = (message, role) => {
    let notificationWindow = document.getElementById("basic-notification-window")
    let notificationHeader = document.getElementById("basic-notification-header")
    let closeDangerNotificationError = document.getElementById('close-notification');
    let notificationContent = document.getElementById("basic-notification-content")
    notificationContent.innerHTML = message

    if(role === "danger") {
        notificationHeader.classList.remove('hidden-header')
        closeDangerNotificationError.addEventListener(('click'), function() {
            notificationWindow.classList.remove("show")
            notificationWindow.classList.remove(role)
        })
    }

    notificationWindow.classList.add(role)
    notificationWindow.classList.add("show")

    if(role === "success") {
        setTimeout(() => {
            notificationWindow.classList.remove("show")
            notificationWindow.classList.remove(role)
        }, 5000)
    }
    if(role === "danger") {
        notificationHeader.classList.add('hidden-header')
    }

}