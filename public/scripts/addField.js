const scheduleItem = document.querySelector(".schedule-item")
const fieldset = document.querySelector("#schedule-items")
const button = document.querySelector("#add-time")

button.addEventListener("click", () => {
    const newFieldContainer = scheduleItem.cloneNode(true)

    const fields = newFieldContainer.querySelectorAll("input")

    fields.forEach((field) => {
        field.value = ""
    })

    fieldset.appendChild(newFieldContainer)
})