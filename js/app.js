let search = {
    props: ['notes'],
    template:`<div><li v-for="task in notes">
                    <div style="width: 100%;display: flex;justify-content: space-between">
                        <span style="overflow: hidden;text-overflow: ellipsis; width: 200px;text-align: left" class="content">{{task.msg}}</span>
                        <div>
                            <span v-if="task.edition">{{ countsWorld }} Mots</span>
                            <span v-if="!task.edition">{{task.worlds}} Mots</span>
                            <button @click="deleteTasks(task.id)" type="button" class="btn btn-danger mr-3">X</button>
                            <button type="button" @click="task.edition = !task.edition " class="btn btn-warning mr-4">edit</button>
                        </div>
                    </div>
                    <textarea v-if="task.edition" class="form-control mt-3" v-model="newsMessage" @keydown="countNews" aria-label="With textarea"></textarea>
                    <button v-if="task.edition" type="button" @click="edit(task)" class="btn btn-success mt-3">update</button>
                </li></div>`,
    data(){
        return{
            newsMessage:null,
            countsWorld:0
        }
    },
    methods: {
        deleteTasks(id){
            this.notes.forEach(task => {
                if (task.id === id)
                this.notes.splice(this.notes.indexOf(task), 1)
                localStorage.setItem("notes", JSON.stringify(this.notes))
            })
        },
        edit(note){
            note.edition = !note.edition
            note.msg = this.newsMessage
            note.worlds = this.countsWorld
            localStorage.setItem("notes", JSON.stringify(this.notes))
        },
        countNews(){
            if (this.newsMessage !==null) {
                let content = this.newsMessage.split(" ")
                return this.countsWorld = content.length
            }
        },
    },
}

const App = new Vue({
    el: '#app',
    data(){
        return{
            notes:[],
            message:null,
            counts:0,
            newArray:[]
        }
    }
    ,
    components:{
        search
    },
    mounted(){
        let data = this.notes = JSON.parse(localStorage.getItem("notes"))
        this.notes = data === null ? [] : data
    },
    methods:{
        countWord(){
            if (this.message !==null) {
                let content = this.message.split(" ")
                return this.counts = content.length
            }
        },
        createTasksList() {
            this.notes.push({
                msg: this.message,
                id: new Date().getTime(),
                edition:false,
                worlds:this.counts
            })
            this.persistData()
        },
        persistData() {
            localStorage.setItem("notes", JSON.stringify(this.notes))
        },

    },
})