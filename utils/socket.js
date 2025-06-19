const socket = require("socket.io")
const Chat = require("../src/models/chat.js")

const initializeSocket = (server)=>{
    const io = socket(server , {
        cors : {
            origin : 'http://localhost:5173'
        }
    })

    io.on("connection" , (socket)=>{

        // handling events

        socket.on("joinChat" , ({firstName, userId , targetUserId})=>{
            const roomId = [userId , targetUserId].sort((a, b) => a.localeCompare(b)).join("--")
            
            socket.join(roomId)
        })

        socket.on("sendMessage" ,async ({message , firstName , userId , targetUserId})=>{
            const roomId = [userId , targetUserId].sort((a, b) => a.localeCompare(b)).join("--")
            

            try {
                let chat  = await Chat.findOne({
                    participants : {$all : [userId , targetUserId]}
                })
                if(!chat){
                    chat  = new Chat({
                        participants : [userId , targetUserId],
                        messages : []
                    })
                }
                    chat.messages.push({
                    sender : userId,
                    text : message ,
                    timestamp : new Date()
                })
                await chat.save();

            } catch (error) {
                console.error(error.message)
            }


            io.to(roomId).emit("messageReceived" , {firstName , message ,timestamp : new Date().toISOString()})
        })
    })
}
module.exports = initializeSocket;