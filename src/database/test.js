const database = require("./db")
const create = require("./createProffy")

database.then(async (db) => {
    //inserir dados

    proffyValue = {
        name: "Mike Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "89976543210",
        bio: "Entusiasta das melhores tecnologias de matemática avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
        
    }

    classValue = {
        subject: "Matemática",
        cost: 20
        //O proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //o class_id virá pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    
    //await create(db, {proffyValue, classValue, classScheduleValues})

    const readTable = await db.all(`
        SELECT 
            proffys.*, 
            classes.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id=proffys.id)
        WHERE proffys.id=1
    `)

    console.log(readTable)
})