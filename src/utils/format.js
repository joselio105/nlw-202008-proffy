const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber){
    return subjects[subjectNumber]
}

function convertHoursInMinutes(time){
    const [hours, minutes] = time.split(":")
    const result = (Number(hours) * 60) + Number(minutes)

    return result
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursInMinutes
}