const database = require("./database/db")
const {
    subjects,
    weekdays,
    getSubject,
    convertHoursInMinutes
} = require("./utils/format")

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query
    
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }

    const timeInMinutes = convertHoursInMinutes(filters.time)

    const query = `
        SELECT 
            proffys.*,
            classes.* 
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedules.*
            FROM class_schedules
            WHERE class_schedules.class_id = classes.id
            AND class_schedules.weekday = ${filters.weekday}
            AND class_schedules.time_from <= ${timeInMinutes}
            AND class_schedules.time_to > ${timeInMinutes}
        )
        AND classes.subject = "${getSubject(filters.subject)}";
    `
    
    try {
        const db = await database

        const proffys = await db.all(query)

        return res.render("study.html", {filters, proffys, subjects, weekdays})
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res){
    const createProffy = require("./database/createProffy")

    const proffyValue = {
        name: req.body.nome,
        avatar: req.body.avatar,
        whatsapp: req.body.watsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: getSubject(req.body.subject),
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursInMinutes(req.body.time_from[index]),
            time_to: convertHoursInMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})

        let queryString = "?subject="+req.body.subject
        queryString += "&weekday="+req.body.weekday[0]
        queryString += "&time="+req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses, 
    saveClasses
}